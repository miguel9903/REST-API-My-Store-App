const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const controller = {

    login: async (req = request, res = response) => {

        try {

            const { email, password } = req.body;

            // Check if the email exists
            const user = await User.findOne({ email });
            if(!user) {
                return res.status(400).json({
                    message: 'Incorrect email or password'
                });
            }

            // Check if user is inactive
            if(!user.status) {
                return res.status(400).json({
                    message: 'Incorrect email or password'
                });
            }

            // Check if the password is correct
            const validPasword = bcryptjs.compareSync(password, user.password);
            if(!validPasword) {
                return res.status(400).json({
                    message: 'Incorrect email or password'
                });
            }

            // Generate JWT
            const token = await generateJWT(user._id);

            res.json({
                user,
                token
            });

        } catch(error) {
            res.status(500).json({
                message: 'Authentication Error',
                error
            });
        }

    },

    googleSignIn: async (req = request, res = response) => {
        
        const { id_token } = req.body;

        try {

            const { name, email, image } = await googleVerify(id_token);
            const existUser = await User.findOne({ email });
            let user;

            if(!existUser) {
                const userData = {
                    name, 
                    email,
                    password: 'aaaaaaaaaaa',
                    image,
                    google: true
                };
                user = new User(userData);
                await user.save();
            }

            // Check if user is inactive
            if(!user.status) {
                return res.status(401).json({
                    message: 'Unauthorized user. User is inactive'
                });
            }

            // Generate JWT
            const token = await generateJWT(user._id);

            res.json({
                user,
                token
            });

        } catch(error) {
            res.status(400).json({
                message: 'Invalid Google Token',
                error
            });
        }

    }

};

module.exports = controller;

const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

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

    }

};

module.exports = controller;

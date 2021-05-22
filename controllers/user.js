const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const controller = {

    getUsers: async (req = request, res = response) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };

            const [total, users] = await Promise.all([
                User.countDocuments(query),
                User.find(query)
                    .skip(Number(start))
                    .limit(Number(limit))
            ]);

            if(users.length === 0) {
                return res.status(400).json({
                    message: 'Not users found'
                });
            }

            res.json({
                total, 
                users
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get users',
                error
            });
        }

    },

    getUser: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const user = await User.findById(id);
            res.json(user);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get user',
                error
            });
        }

    },

    createUser: async (req = request, res = response) => {
       
        try {
            
            const { name, email, password, role } = req.body;
            const userData = { name, email, password, role };
            const user = new User(userData);
            
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password, salt);

            await user.save();

            res.json({
                message: 'User saved',
                user
            });

        } catch(error) {
            res.status(500).json({
                message: 'User could not be created',
                error
            });
        }

    },

    updateUser: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const { name, email, password, role } = req.body;
            const userData = { name, email, role };
    
            if(password) {
                const salt = bcryptjs.genSaltSync();
                userData.password = bcryptjs.hashSync(password, salt);           
            }

            const user = await User.findByIdAndUpdate(id, userData, { new: true });
    
            res.json({
                message: 'User updated',
                user
            })

        } catch(error) {
            res.status(500).json({
                message: 'User could not be updated',
                error
            });
        }

    },

    deleteUser: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
            res.json({
                message: 'User deleted',
                user
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not delete user',
                error
            });
        }

    }

};

module.exports = controller;
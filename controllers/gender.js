const { request, response } = require('express');
const Gender = require('../models/gender');

const controller = {

    getGenders: async (req = request, res = response) => {

        try {

            const query = { status: true };

            const [total, genders] = await Promise.all([
                Gender.countDocuments(query),
                Gender.find(query)
            ]);

            if(genders.length === 0) {
                return res.status(400).json({
                    message: 'Not genders found'
                });
            }

            res.json({
                total,
                genders
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get genders',
                error
            });
        }

    },

    getGender: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const gender = await Gender.findById(id);

            res.json(gender);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get gender',
                error
            });
        }

    },

    createGender: async (req = request, res = response) => {

        try {

            const { name } = req.body;
        
            const gender = new Gender({ name });
            await gender.save();

            res.json({
                message: 'Gender saved',
                gender
            });

        } catch(error) {
            res.status(500).json({
                message: 'Gender could not be created',
                error
            });
        }
    },

    updateGender: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            let { name } = req.body;

            const genderParams = await Gender.findById(id);
            
            if(genderParams.name !== name) {
                name = name[0].toUpperCase() + name.substring(1);
                const existGender = await Gender.findOne({ name });
                if(existGender) {
                    return res.status(400).json({
                        message: `The gender ${ name } is already registered`
                    });
                }
            } 

            const gender = await Gender.findByIdAndUpdate(id, { name }, { new: true });

            res.json({
                message: 'Gender updated',
                gender
            });

        } catch(error) {
            res.status(500).json({
                message: 'Gender could not be updated',
                error
            });
        }

    },

    deleteGender: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const gender = await Gender.findByIdAndUpdate(id, { status: false }, { new: true });

            res.json({
                message: 'Gender deleted',
                gender
            });

        } catch(error) {
            res.status(500).json({
                message: 'Gender could not be deleted',
                error
            });
        }

    }

};

module.exports = controller;
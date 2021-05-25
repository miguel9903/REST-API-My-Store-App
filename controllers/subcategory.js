const { request, response } = require('express');
const Subcategory = require('../models/subcategory');

const controller = {

    getSubcategories: async (req = request, res = response) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };

            const [total, subcategories] = await Promise.all([
                Subcategory.countDocuments(query),
                Subcategory.find(query)
                           .skip(Number(start))
                           .limit(Number(limit))
                           .populate('user', 'name')
            ]);

            if(subcategories.length === 0) {
                return res.status(400).json({
                    message: 'Not subcategories found'
                });
            }

            res.json({
                total,
                subcategories
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get subcategories',
                error
            });
        }

    },

    getSubcategory: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const subcategory = await Subcategory.findById(id)
                                                 .populate('user', 'name');

            res.json(subcategory);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get subcategory',
                error
            });
        }

    },

    createSubcategory: async (req = request, res = response) => {

        try {

            const { name } = req.body;
            const user = req.authUser;
            const subcategory = new Subcategory({ name, user: user._id });

            await subcategory.save();

            res.json({
                message: 'Subcategory saved',
                subcategory
            });

        } catch(error) {
            res.status(500).json({
                message: 'Subategory could not be created',
                error
            });
        }

    },

    updateSubcategory: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            let { name } = req.body;

            const subcategoryParams = await Subcategory.findById(id);

            if(subcategoryParams.name !== name) {
                name = name[0].toUpperCase() + name.substring(1);
                const existSubcategory = await Subcategory.findOne({ name });
                if(existSubcategory) {
                    return res.status(400).json({
                        message: `The subcategory ${ name } is already registered`
                    });
                }
            }

            const subcategory = await Subcategory.findByIdAndUpdate(id, { name }, { new: true });
            
            res.json({
                message: 'Subcategory updated',
                subcategory
            });

        } catch(error) {
            res.status(500).json({
                message: 'Subategory could not be updated',
                error
            });
        }

    },

    deleteSubcategory: async (req = request, res = response) => {

        try {
            
            const { id } = req.params;
            const subcategory = await Subcategory.findByIdAndUpdate(id, { status: false }, { new: true });

            res.json({
                message: 'Subcategory deleted',
                subcategory 
            });

        } catch(error) {
            res.status(500).json({
                message: 'Subategory could not be deleted',
                error
            });
        }

    }

};

module.exports = controller;
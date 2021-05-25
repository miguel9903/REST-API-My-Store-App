const { request, response } = require('express');
const Category = require('../models/category');

const controller = {

    getCategories: async (req = request, res = response) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };

            const [total, categories] = await Promise.all([
                Category.countDocuments(query),
                Category.find(query)
                        .skip(Number(start))
                        .limit(Number(limit))
                        .populate('user', 'name')
                        .populate('subcategories', 'name')
            ]);

            if(categories.length === 0) {
                return res.status(400).json({
                    message: 'Not categories found'
                });
            }

            res.json({
                total,
                categories
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get categories',
                error
            });
        }

    },

    getCategory: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const category = await Category.findById(id)
                                           .populate('user', 'name')
                                           .populate('subcategories', 'name');

            res.json(category);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get category',
                error
            });
        }

    },

    createCategory: async (req = request, res = response) => {

        try {

            const { name, subcategories } = req.body;
            const user = req.authUser;
            
            const categoryData = {
                name, 
                subcategories,
                user: user._id 
            };

            const category = new Category(categoryData);
            await category.save();

            res.json({
                message: 'Category saved',
                category
            });

        } catch(error) {
            res.status(500).json({
                message: 'Category could not be created',
                error
            });
        }
    },

    updateCategory: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            let { name } = req.body;

            const categoryParams = await Category.findById(id);
            
            if(categoryParams.name !== name) {
                name = name[0].toUpperCase() + name.substring(1);
                const existCategory = await Category.findOne({ name });
                if(existCategory) {
                    return res.status(400).json({
                        message: `The category ${ name } is already registered`
                    });
                }
            } 

            const category = await Category.findByIdAndUpdate(id, { name }, { new: true });

            res.json({
                message: 'Category updated',
                category
            });

        } catch(error) {
            res.status(500).json({
                message: 'Category could not be updated',
                error
            });
        }

    },

    deleteCategory: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

            res.json({
                message: 'Category deleted',
                category 
            });

        } catch(error) {
            res.status(500).json({
                message: 'Category could not be deleted',
                error
            });
        }

    }

};

module.exports = controller;
const { request, response } = require('express');
const Product = require('../models/product');

const controller = {

    getProducts: async (req = request, res = response) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };
            const { filter, value } = req.query;
            let total = 0;
            let products = [];

            if(filter) {

                let filterName = {};

                if(filter === 'subcategory') {                   
                    filterName = { subcategory: value };
                } else if (filter === 'gender') {
                    filterName = { gender: value };
                } else if (filter === 'brand') {
                    filterName = { brand: value };
                } else if (filter === 'color') {
                    filterName = { color: value };
                }

                const results = await Promise.all([
                    Product.countDocuments({
                        $and: [query, filterName]
                    }),
                    Product.find({
                        $and: [query, filterName]
                    }).skip(Number(start))
                      .limit(Number(limit))
                      .populate('color', 'name')
                      .populate('brand', 'name')
                      .populate('gender', 'name')
                      .populate('color', 'name')
                      .populate('user', 'name')
                      .populate('subcategory', 'name')
                ]);
                total = results[0];
                products = results[1];

            } else{ 
                const results = await Promise.all([
                    Product.countDocuments(query),
                    Product.find(query)
                            .skip(Number(start))
                            .limit(Number(limit))
                            .populate('color', 'name')
                            .populate('brand', 'name')
                            .populate('gender', 'name')
                            .populate('color', 'name')
                            .populate('user', 'name')
                            .populate('subcategory', 'name')
                ]);
                total = results[0];
                products = results[1];
            }

            if(products.length === 0) {
                return res.status(400).json({
                    message: 'Not products found'
                });
            }

            res.json({
                total,
                products,
                filter,
                value
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get products',
                error
            });
        }

    }, 

    getProduct: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const product = await Product.findById(id)
                                         .populate('color', 'name')
                                         .populate('brand', 'name')
                                         .populate('gender', 'name')
                                         .populate('color', 'name')
                                         .populate('user', 'name')
                                         .populate('subcategory', 'name');

            res.json(product);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get product',
                error
            });
        }

    },

    createProduct: async (req = request, res = response) => {

        try {

            const { name, description, price, brand, gender, color, image, subcategory } = req.body;
            const user = req.authUser;
            
            const productData = {
                name,
                description,
                price,
                brand,
                gender,
                color,
                user: user._id,
                subcategory
            };

            if(image) {
                productData.image = image;
            }

            const product = new Product(productData);
            await product.save();
            
            res.json({
                message: 'Product saved',
                product
            });

        } catch(error) {
            res.status(500).json({
                message: 'Product could not be created',
                error
            });
        }

    },

    updateProduct: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const { name, description, price, brand, gender, color, image, subcategory } = req.body;
            const user = req.authUser;
            
            const productData = {
                name,
                description,
                price,
                brand,
                gender,
                color,
                user: user._id,
                subcategory
            };

            if(image) {
                productData.image = image;
            }

            const product = await Product.findByIdAndUpdate(id, productData, { new: true });

            res.json({
                message: 'Product updated',
                product
            });

        } catch(error) {
            res.status(500).json({
                message: 'Product could not be updated',
                error
            });
        }

    },

    deleteProduct: async (req = request, res = response) => {

        try {
            
            const { id } = req.params;
            const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

            res.json({
                message: 'Product deleted',
                product 
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get deleted',
                error
            });
        }

    }

};

module.exports = controller;
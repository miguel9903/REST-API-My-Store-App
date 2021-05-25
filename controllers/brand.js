const { request, response } = require('express');
const Brand = require('../models/brand');

const controller = {

    getBrands: async (req = request, res = response) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };

            const [total, brands] = await Promise.all([
                Brand.countDocuments(query),
                Brand.find(query)
                        .skip(Number(start))
                        .limit(Number(limit))
            ]);

            if(brands.length === 0) {
                return res.status(400).json({
                    message: 'Not brands found'
                });
            }

            res.json({
                total,
                brands
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get brands',
                error
            });
        }

    },

    getBrand: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const brand = await Brand.findById(id);

            res.json(brand);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get brand',
                error
            });
        }

    },

    createBrand: async (req = request, res = response) => {

        try {

            const { name } = req.body;
        
            const brand = new Brand({ name });
            await brand.save();

            res.json({
                message: 'Brand saved',
                brand
            });

        } catch(error) {
            res.status(500).json({
                message: 'Brand could not be created',
                error
            });
        }
    },

    updateBrand: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            let { name } = req.body;

            const brandParams = await Brand.findById(id);
            
            if(brandParams.name !== name) {
                name = name[0].toUpperCase() + name.substring(1);
                const existBrand = await Brand.findOne({ name });
                if(existBrand) {
                    return res.status(400).json({
                        message: `The brand ${ name } is already registered`
                    });
                }
            } 

            const brand = await Brand.findByIdAndUpdate(id, { name }, { new: true });

            res.json({
                message: 'Brand updated',
                brand
            });

        } catch(error) {
            res.status(500).json({
                message: 'Brand could not be updated',
                error
            });
        }

    },

    deleteBrand: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const brand = await Brand.findByIdAndUpdate(id, { status: false }, { new: true });

            res.json({
                message: 'Brand deleted',
                brand
            });

        } catch(error) {
            res.status(500).json({
                message: 'Brand could not be deleted',
                error
            });
        }

    }

};

module.exports = controller;
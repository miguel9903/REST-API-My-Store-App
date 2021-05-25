const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, 
        Product, 
        Subcategory, 
        Color, 
        Brand } = require('../models');
 
const allowedCollections = [
    'users',
    'products',
    'subcategories',
    'colors',
    'brands'
];

const searchUsers = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: user ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [total, users] = await Promise.all([
        User.countDocuments({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }]
        }),
        User.find({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }]
        })
    ]);

    res.json({
        total,
        results: users
    });

}

const searchProducts = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const product = await Product.findById(term);
        return res.json({
            results: product ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [total, products] = await Promise.all([
        Product.countDocuments({
            $or: [{ name: regex }, { description: regex }],
            $and: [{ status: true }]
        }),
        Product.find({
            $or: [{ name: regex }, { description: regex }],
            $and: [{ status: true }]
        })
    ]);

    res.json({
        total,
        results: products
    });

}

const searchSubcategories = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const subcategory = await Subcategory.findById(term);
        return res.json({
            results: subcategory ? [subcategory] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [total, subcategories] = await Promise.all([
        Subcategory.countDocuments({ name: regex, status: true }),
        Subcategory.find({ name: regex, status: true })
    ]);

    res.json({
        total,
        results: subcategories
    });

}

const searchColors = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const color = await Color.findById(term);
        return res.json({
            results: color ? [color] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [total, colors] = await Promise.all([
        Color.countDocuments({ name: regex, status: true }),
        Color.find({ name: regex, status: true })
    ]);

    res.json({
        total,
        results: colors
    });

}

const searchBrands = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const brand = await Brand.findById(term);
        return res.json({
            results: brand ? [brand] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [total, brands] = await Promise.all([
        Brand.countDocuments({ name: regex, status: true }),
        Brand.find({ name: regex, status: true })
    ]);

    res.json({
        total,
        results: brands
    });

}

const controller = {

    search: (req = request, res = response) => {

        const { collection, term } = req.params;

        if(!allowedCollections.includes(collection)) {
            return res.status(400).json({
                message: `Collection not allowed. The allowed collections are: ${ allowedCollections.join(', ') }`
            });
        }

        switch(collection) {
            case 'users':
                searchUsers(term, res);
                break;
            case 'products':
                searchProducts(term, res);
                break;
            case 'subcategories':
                searchSubcategories(term, res);
                break;
            case 'colors':
                searchColors(term, res);
                break;
            case 'brands':
                searchBrands(term, res);
                break;
            default:
                res.status(400).json({
                    message: 'Invalid collection'
                });

        }

    }

};

module.exports = controller;
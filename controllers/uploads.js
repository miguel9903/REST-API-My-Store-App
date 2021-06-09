const { request, response } = require('express');
const { User, Product } = require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require('../helpers');

const controller = {

    getImage: async (req = request, res = response) => {

        
        const { id, collection } = req.params;

        let model;

        if(collection === 'users') {
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    message: 'User does not exist'
                });
            }
        } else if (collection === 'products') {
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    message: 'Product does not exist'
                });
            }
        }

        if(model.image) {
            const imagePath = path.join(__dirname, '../uploads', collection, model.image);
            if(fs.existsSync(imagePath)) {
                return res.sendFile(imagePath);          
            }
        }

        const imagePath = path.join(__dirname, '../assets/images/no-image.jpg');
        res.sendFile(imagePath);

    },


    uploadFiles: async (req = request, res = response) => {
            
        try {

            const fileName = await uploadFile(req.files, undefined, 'images');
            res.json({ fileName });

        } catch(error) {
            res.status(400).json({ error });
        }

    },

    updateImage: async (req = request, res = response) => {

        const { id, collection } = req.params;

        let model;

        if(collection === 'users') {
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    message: 'User does not exist'
                });
            }
        } else if (collection === 'products') {
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    message: 'Product does not exist'
                });
            }
        }

        // Delete image if the model already has one
        if(model.image) {
            const imagePath = path.join(__dirname, '../uploads', collection, model.image);
            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        const fileName = await uploadFile(req.files, undefined, collection);
        model.image = fileName;
        await model.save();

        res.json({ model });

    },

    updateImageCloudinary: async (req = request, res = response) => {

        const { id, collection } = req.params;

        let model, folder = '';

        if(collection === 'users') {
            folder = 'MyStore-App/Users/';
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    message: 'User does not exist'
                });
            }
        } else if (collection === 'products') {
            folder = 'MyStore-App/Products/';
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    message: 'Product does not exist'
                });
            }
        }

        // Delete image if the model already has one
        if(model.image) {
            const modelImageArray = model.image.split('/');
            const public_id = modelImageArray[modelImageArray.length - 1].split('.')[0];
            cloudinary.uploader.destroy(folder + public_id);
        }

        console.log(req.files);
        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder });

        model.image = secure_url;
        await model.save();
        res.json({ model }); 

    }

};

module.exports = controller;

const { request, response } = require('express');
const Color = require('../models/color');

const controller = {

    getColors: async (req = request, res = response) => {

        try {

            const { start = 0, limit = 10 } = req.query;
            const query = { status: true };

            const [total, colors] = await Promise.all([
                Color.countDocuments(query),
                Color.find(query)
                        .skip(Number(start))
                        .limit(Number(limit))
            ]);

            if(colors.length === 0) {
                return res.status(400).json({
                    message: 'Not colors found'
                });
            }

            res.json({
                total,
                colors
            });

        } catch(error) {
            res.status(500).json({
                message: 'Could not get colors',
                error
            });
        }

    },

    getColor: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const color = await Color.findById(id);

            res.json(color);

        } catch(error) {
            res.status(500).json({
                message: 'Could not get color',
                error
            });
        }

    },

    createColor: async (req = request, res = response) => {

        try {

            const { name } = req.body;
        
            const color = new Color({ name });
            await color.save();

            res.json({
                message: 'Color saved',
                color
            });

        } catch(error) {
            res.status(500).json({
                message: 'Color could not be created',
                error
            });
        }
    },

    updateColor: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            let { name } = req.body;

            const colorParams = await Color.findById(id);
            
            if(colorParams.name !== name) {
                name = name[0].toUpperCase() + name.substring(1);
                const existColor = await Color.findOne({ name });
                if(existColor) {
                    return res.status(400).json({
                        message: `The color ${ name } is already registered`
                    });
                }
            } 

            const color = await Color.findByIdAndUpdate(id, { name }, { new: true });

            res.json({
                message: 'Color updated',
                color
            });

        } catch(error) {
            res.status(500).json({
                message: 'Color could not be updated',
                error
            });
        }

    },

    deleteColor: async (req = request, res = response) => {

        try {

            const { id } = req.params;
            const color = await Color.findByIdAndUpdate(id, { status: false }, { new: true });

            res.json({
                message: 'Color deleted',
                color
            });

        } catch(error) {
            res.status(500).json({
                message: 'Color could not be deleted',
                error
            });
        }

    }

};

module.exports = controller;
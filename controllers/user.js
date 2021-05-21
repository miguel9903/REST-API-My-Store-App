const { request, response } = require('express');

const controller = {

    getUsers: (req = request, res = response) => {
        const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;
        res.json({
            message: 'Get All Users',
            q,
            nombre,
            apikey,
            page,
            limit
        })
    },

    getUser: (req = request, res = response) => {
        const { id } = req.params;
        res.json({
            message: 'Get User With ID ' + id,
            id
        })
    },

    createUser: (req = request, res = response) => {
        const { nombre, edad } = req.body;
        res.json({
            message: 'Create User',
            nombre,
            edad
        })
    },

    updateUser: (req = request, res = response) => {
        const { id } = req.params;
        res.json({
            message: 'Update User With ID ' + id,
            id
        })
    },

    deleteUser: (req = request, res = response) => {
        const { id } = req.params;
        res.json({
            message: 'Delete User With ID ' + id,
            id
        })
    }

};

module.exports = controller;
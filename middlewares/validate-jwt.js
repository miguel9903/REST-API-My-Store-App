const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized user. No token provided'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Get authenticated user information
        const authUser = await User.findById(uid);

        // Check if user authenticated exist
        if(!authUser) {
            return res.status(404).json({
                message: 'Unauthorized user. User does not exist'
            });
        }

        // Check if user authenticated is active
        if(!authUser.status) {
            return res.status(401).json({
                message: 'Unauthorized user. User is inactive'
            });
        }

        req.authUser = authUser;
        next();

    } catch(err) {
        console.log(err);
        res.status(401).json({
            message: 'Unauthorized user. Invalid token'
        });
    }

}

module.exports = {
    validateJWT
}
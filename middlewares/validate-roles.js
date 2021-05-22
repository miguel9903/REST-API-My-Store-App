const { request, response } = require('express');

const hasAdminRole = (req = request, res = response, next) => {

    if(!req.authUser) {
        return res.status(500).json({
            message: 'Trying to validate the role without validating the token first'
        });
    }

    if(req.authUser.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: 'Unauthorized user. Only admin users can perform this action'
        });
    }

    next();
}

const hasValidRole = (...roles) => {

    return (req = request, res = response, next) => {

        if(!req.authUser) {
            return res.status(500).json({
                message: 'Trying to validate the role without validating the token first'
            });
        }

        if(!roles.includes(req.authUser.role)) {
            return res.status(401).json({
                message: 'Unauthorized user. You need to have one of the following roles to perform this action: ' + roles
            });
        }

        console.log(roles);
        next();

    }

}

module.exports = {
    hasAdminRole,
    hasValidRole
};
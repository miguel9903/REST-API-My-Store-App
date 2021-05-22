const Role = require('../models/role');
const User = require('../models/user');

// User validators

const existUserId = async (id = '') => {
    const existId = await User.findById(id);
    if(!existId) {
        throw new Error('The user does not exist');
    }
}

const existUserEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if(existEmail) {
        throw new Error(`The email ${ email } is already registered`);
    }
}

const existUserRole = async (role = '') => {
    const existRole = await Role.findOne( { name: role } );
    if(!existRole) {
        throw new Error(`The ${ role } role is not allowed`);
    }
}


module.exports = {
    existUserRole,
    existUserEmail,
    existUserId
};
const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Product = require('../models/product');
const Gender = require('../models/gender');
const Color = require('../models/color');
const Brand = require('../models/brand');

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


// Role validators

const existUserRole = async (role = '') => {
    const existRole = await Role.findOne( { name: role } );
    if(!existRole) {
        throw new Error(`The ${ role } role is not allowed`);
    }
}


// Category validators

const existCategoryId = async (id = '') => {
    const existCategory = await Category.findById(id);
    if(!existCategory) {
        throw new Error('The category does not exist');
    }
}

const existCategoryName = async (name = '') => {
    name = name[0].toUpperCase() + name.substring(1);
    const existCategory = await Category.findOne({ name });
    if(existCategory) {
        throw new Error(`The category ${ name } is already registered`);
    }
}


// Subategory validators

const existSubcategoryId = async (id = '') => {
    const existSubcategory = await Subcategory.findById(id);
    if(!existSubcategory) {
        throw new Error('The subcategory does not exist');
    }
}

const existSubcategoryName = async (name = '') => {
    name = name[0].toUpperCase() + name.substring(1);
    const existSubcategory = await Subcategory.findOne({ name });
    if(existSubcategory) {
        throw new Error(`The subcategory ${ name } is already registered`);
    }
}


// Product validators

const existProductId = async (id = '') => {
    const existProduct = await Product.findById(id);
    if(!existProduct) {
        throw new Error('The product does not exist');
    }
}


// Gender validators

const existGenderId = async (id = '') => {
    const existGender = await Gender.findById(id);
    if(!existGender) {
        throw new Error('The gender does not exist');
    }
}

const existGenderName = async (name = '') => {
    name = name[0].toUpperCase() + name.substring(1);
    const existGender = await Gender.findOne({ name });
    if(existGender) {
        throw new Error(`The gender ${ name } is already registered`);
    }
}


// Color validators

const existColorId = async (id = '') => {
    const existColor = await Color.findById(id);
    if(!existColor) {
        throw new Error('The color does not exist');
    }
}

const existColorName = async (name = '') => {
    name = name[0].toUpperCase() + name.substring(1);
    const existColor = await Color.findOne({ name });
    if(existColor) {
        throw new Error(`The color ${ name } is already registered`);
    }
}


// Brand validators

const existBrandId = async (id = '') => {
    const existBrand = await Brand.findById(id);
    if(!existBrand) {
        throw new Error('The brand does not exist');
    }
}

const existBrandName = async (name = '') => {
    name = name[0].toUpperCase() + name.substring(1);
    const existBrand = await Brand.findOne({ name });
    if(existBrand) {
        throw new Error(`The brand ${ name } is already registered`);
    }
}


// Validate collections

const validateAllowedCollections = (collection = '', allowedCollections = []) => {
    if(!allowedCollections.includes(collection)) {
        throw new Error(`Invalid collection. The allowed collections are ${ allowedCollections.join(', ') }`);
    }
    return true;
}

module.exports = {
    existUserRole,
    existUserEmail,
    existUserId,
    existCategoryId,
    existCategoryName,
    existSubcategoryId,
    existSubcategoryName,
    existProductId,
    existGenderId,
    existGenderName,
    existColorId,
    existColorName,
    existBrandId,
    existBrandName,
    validateAllowedCollections
};
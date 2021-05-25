const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },

    price: {
        type: Number,
        required: [true, 'Price is required']
    },

    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    
    gender: {
        type: Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },

    color: {
        type: [Schema.Types.ObjectId],
        ref: 'Color',
        required: true
    },

    image: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },

    available: {
        type: Boolean,
        default: true
    },

    status: {
        type: Boolean,
        default: true
    }

});

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);
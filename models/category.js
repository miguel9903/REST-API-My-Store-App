const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'Category is required'],
        unique: true
    },

    subcategories: {
        type: [Schema.Types.ObjectId],
        ref: 'Subcategory',
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: Boolean,
        default: true
    }

});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...category } = this.toObject();
    return category;
}

module.exports = model('Category', CategorySchema);
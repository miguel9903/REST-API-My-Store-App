const { Schema, model } = require('mongoose');

const SubcategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
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

SubcategorySchema.methods.toJSON = function() {
    const { __v, status, ...subcategory } = this.toObject();
    return subcategory;
}

module.exports = model('Subcategory', SubcategorySchema);
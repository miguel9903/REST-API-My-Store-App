const { Schema, model } = require('mongoose');

const ColorSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },

    status: {
        type: Boolean,
        default: true
    }

});

ColorSchema.methods.toJSON = function() {
    const { __v, status, ...brand } = this.toObject();
    return brand;
}

module.exports = model('Color', ColorSchema);
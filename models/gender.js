const { Schema, model } = require('mongoose');

const GenderSchema = new Schema({

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

GenderSchema.methods.toJSON = function() {
    const { __v, status, ...gender } = this.toObject();
    return gender;
}

module.exports = model('Gender', GenderSchema);
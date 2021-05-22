const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    image: {
        type: String
    },

    role: {
        type: String,
        required: true
    },

    google: {
        type: Boolean,
        default: false
    },

    status: {
        type: Boolean,
        default: true
    }
    
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);
const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Role name is required']
    }

});

module.exports = model('Role', RoleSchema);
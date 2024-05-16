const mongoose = require("mongoose");

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

},
    { timestamps: true }
);

const users = new mongoose.model("users", schema);

module.exports = users;
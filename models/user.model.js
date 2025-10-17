const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String, unique: true, sparse: true
    }
}, {
    timestamps: true,
}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;


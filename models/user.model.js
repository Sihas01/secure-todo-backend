const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },

    password: {
        type: String,
        required: [true, "Please enter your passsword"]
    }
}, {
    timestamps: true,
}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;


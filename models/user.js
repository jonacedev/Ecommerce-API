
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model("User", UserSchema, "users");
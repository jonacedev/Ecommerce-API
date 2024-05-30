
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


UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {   // Transform document to return only necessary info
        delete ret._id;
        delete ret.apiKey;
    }
});

module.exports = model("User", UserSchema, "users");
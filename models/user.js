const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    farmArea: {
        type: Number,
    },
    age: {
        type: Number
    },
    skills: {
        type: String,
    },
    description: {
        type: String,
    },
    gender: {
        type: String
    },
    description: {
        type: String
    }

    

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose')
const validator = require('validator');
const { default: isURL } = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://c8.alamy.com/comp/2G7FT75/default-avatar-photo-placeholder-grey-profile-picture-icon-man-in-t-shirt-2G7FT75.jpg',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid")
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

//create a mongoose model

module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose')
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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


//Schema methods 
userSchema.methods.getJWT = async function () {
    const user = this;    //this keyword do not work with arrow function
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "7d" }) // takes 1. arrgument data to hide and 2. argument secret key
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid;
}


//create a mongoose model
module.exports = mongoose.model("User", userSchema);
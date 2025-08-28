const jwt = require('jsonwebtoken')
const User = require("../models/user")

// const adminAuth = (req, res, next) => {
//     const token = "xyz";
//     const isAdminAuth = token === 'xyz'
//     if (!isAdminAuth) {
//         res.status(401).send("Not Authorized")
//     } else {
//         next()
//     }
// };

const userAuth = async (req, res, next) => {

    try {
        //Read the token from the request cookies . 

        const { token } = req.cookies
        if (!token) {
            throw new Error("Token is not valid!!")
        }

        // Validate the token and  
        const decodeObj = await jwt.verify(token, "DEV@Tinder$790")  // returns id = > { _id: '68adf097b0329c0abe8baeff', iat: 1756297496 }
        const { _id } = decodeObj
        console.log(_id)
        // find the user 
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found")
        }
        req.user = user
        next()

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }

};


module.exports = {
    userAuth
};
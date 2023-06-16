/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//require packeg
const jwt =require("jsonwebtoken");
const customer = require("../models/customer");
//Token verify middlewares
exports.isSignin = async (req,res,next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_KEY
        );
        // console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}
//Role verify
exports.isAdmin = async (req,res,next) => {
    try {
        const user = await customer.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json("Unauthorized");
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}
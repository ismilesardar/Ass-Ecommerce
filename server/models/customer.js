/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//thir-pairty module require
const mongoose = require('mongoose');
const {Schema} = mongoose;
//user schema
const userSchema  = new Schema({
    name:{
        type: String,
        trim:true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: [true, "Please add emali"],
        unique: true,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "please enter a valide emile"],
    },
    password:{
        type: String,
        required: [true, "password is Required!"],
        trim: true,
        minLength: [6, "password must be up 6 creacters"],
    },
    address:{
        type: String,
        trim: true,
        default: "Address",
    },
    role:{
        type: Number,
        trim: true,
        default: 0,
    }
},
{
    timestamps:true,
    versionKey:false
});

//creat customer model
const customer = mongoose.model('customers', userSchema);
//customer Schema exports
module.exports = customer;
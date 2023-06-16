/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */
const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is Require"],
            trim: true,
            maxLength: 32,
            unique: true,
        },
        slug:{
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        }
    },
    {timestamps:true,versionKey:false},
);

const category = mongoose.model('category', catagorySchema);
module.exports = category;
/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//mongoose lib require
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
//product schema create
const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 160,
        },
        slug:{
            type: String,
            lowercase: true,
        },
        description:{
            type: {},
            required: true,
            maxlength: 2000,
        },
        price:{
            type: Number,
            trim: true,
            required: true,
        },
        category:{
            type: ObjectId,
            ref: "category",
            required: true,
        },
        quantity:{
            type: Number,
        },
        sold:{
            type: Number,
            default: 0,
        },
        photo:{
            data: Buffer,
            contentType: String,
        },
        shipping:{
            required: false,
            type: Boolean,
        },
    },
    {timestamps: true,versionKey:false}
);
//create collections refer Schema
const product = mongoose.model('products', productSchema);
//exports collections
module.exports = product;
/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//thir-pairty module require
const express = require('express');
const catCont = require('../controllers/category');
const { isSignin, isAdmin } = require('../middlewares/auth');
const router = express.Router();

//Catagory Router
router.post('/category',isSignin,isAdmin,catCont.creat);
router.post('/update/:categoryId',isSignin,isAdmin,catCont.update);
router.delete('/remove/:categoryId',isSignin,isAdmin,catCont.remove);
router.get('/category/:slug',catCont.read);
router.get('/categoryAll',catCont.list); 
router.get('/products-by-category/:slug',catCont.productsByCategory); 

//module exprots
module.exports = router;
/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//third-parity module require
const express = require('express');
const authCont = require('../controllers/auth');
const { isSignin, isAdmin } = require('../middlewares/auth');
const router = express.Router();

//test router
router.get('/',(req,res)=>{
    console.log('This is testing Route');
    res.status(200).send('This is testing Route');
});

//register Router
router.post('/register',authCont.register);
router.post('/login',authCont.login);
router.get('/auth-check',isSignin,(req,res)=>{
    res.status(200).json({ok: true});
});
router.get('/admin-check',isSignin,isAdmin,(req,res)=>{
    res.status(200).json({ok: true});
});
router.post('/profile/update',isSignin,authCont.update);

//orders
router.get('/orders',isSignin,authCont.getOrders);
router.get('/all-order',isSignin,isAdmin,authCont.getAllOrders);


//module exports
module.exports = router;
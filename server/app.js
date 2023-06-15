/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//core module require
const path = require('path');
const {readdirSync} = require('fs');
//thir-pairty module require
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimite = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

//All Thir-pairty modules use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(morgan('dev'));
app.use('/uplodes', express.static(path.join(__dirname, 'uplodes')));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
//route limiter
const limiter = rateLimite({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);
//rout middlewares
readdirSync('./routes').map(fill => app.use('/api/v1', require(`./routes/${fill}`)));
//undefind router
app.use('*',(req,res) => {
    res.status(404).send('This is Rong Router');
});
//Database conected
mongoose.connect(process.env.DATA_BASE)
        .then((value) =>{
            console.log('Database Connected');
        })
        .catch((err) => {
            console.log(err);
        });

//module exporte
module.exports = app;  

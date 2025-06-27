const express=require('express');
const {signup, login, logout} = require('../controller/auth.controller');
const verifyToken = require('../utils/verifyUser');

const router=express.Router();

// signup route
router.post('/signup',signup)

// login route
router.post('/login',login)

// signout
router.post('/logout',verifyToken,logout);

module.exports=router
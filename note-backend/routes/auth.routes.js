const express=require('express');
const {signup, login} = require('../controller/auth.controller');

const router=express.Router();

// signup route
router.post('/signup',signup)

// login route
router.post('/login',login)

module.exports=router
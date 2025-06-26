require('dotenv').config()
const UserModel = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const isValidUser = await UserModel.findOne({ email });
    if (isValidUser) {
        return next(errorHandler(400, 'User already exist'))
    };
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ username, email, password: hashedPassword });
        res.status(201).json({
            success: true,
            message: 'User created successfully'
        })
    } catch (error) {
        next(error)
    }

}

const login=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await UserModel.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'))
        };
        const validPassword=await bcrypt.compare(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,'Wrong credentials.'))
        }
        const token=jwt.sign({id:validUser._id,email:validUser.email},process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc
        res.cookie('access_token',token).status(200).json({
            success:true,
            message:'Login Successfull!',
            user:rest
        })
    }catch(error){
        next(error)
    }
}

module.exports = {signup,login}
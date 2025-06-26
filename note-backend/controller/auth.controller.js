const UserModel = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcrypt = require('bcrypt')

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

module.exports = signup
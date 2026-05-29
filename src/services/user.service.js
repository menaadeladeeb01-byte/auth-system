const userRepo = require('../repositories/user.repository');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { createAccessToken } = require('../utils/jwt');
const secretKey = process.env.SECRET_KEY || 'your_secret_key';


exports.register = async ({email , password })=>{
    const existUser = await userRepo.findByEmail(email);
    if(existUser){
        throw new appError('Email already exists' , 400);
    }
    const hashPassword = await bcrypt.hash(password , 10 );
    userRepo.saveUser({email , password : hashPassword});
    
};

exports.login = async ({email , password }) =>{
    const user = await userRepo.findByEmail(email);
    if(!user){
        throw new appError('Invalid email or password' , 401);
    }
    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    if(!isPasswordCorrect){
        throw new appError('Invalid email or password' , 401);
    }

    const accessToken = createAccessToken (user);
    const refreshToken = createRefreshToken (user);

    userRepo.saveRefreshToken(refreshToken);
    return {accessToken , refreshToken};

};

exports.refreshToken = async (token )=>{
    if(!userRepo.findRefreshToken){
        throw new appError('Invalid refreshToken',401)
    }
    const decoded = jwt.verify(token , secretKey);
    return createAccessToken({email:decoded.email})
};

exports.logout = async (token)=> {
    userRepo.removeRefreshToken(token);
};


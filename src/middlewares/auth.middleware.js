const express = require('express');
const jwt = require('jsonwebtoken');
const appError = requrie ('../utils/appError.js');

const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const authMiddleware = (req , res , next ) =>{
  const autHeader = req.headers.authorization;

if(!autHeader || !autHeader.startsWith('Bearer')){
    return next(new appError ('Unauthorization - no token',401))
}

const token = autHeader.split(' ')[1];
try{

const decoded = jwt.verify(token , secretKey);
req.user = decoded;
next();

}catch(err){
next(new appError ('Unauthorization - Invalid token',401))
}
}
module.exports = authMiddleware;




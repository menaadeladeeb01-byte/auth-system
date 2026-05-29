const express = require ('express');
const morgan = require('morgan');

const authServices = require('../services /user.service');
const appError = require('../utils/appError');


exports.register = async (req , res , next ) =>{
try{
    await authServices.register(req.body);

    res.status(201).json({
        success : true ,
        message : 'User registered successfully'
    })
}catch(err){
    next(err);
}
};

exports.login = async (req , res , next) => {
    try{
        const tokens = await authServices.login(req.body);

        res.status(200).josn({
            success : true ,
            data : tokens
        })
    }catch(err){
        next(err);
    }
};

exports.getProfile = async (req , res ) =>{
  res.status(200).json({
    success: true , 
    user : req.body
  })
};

exports.accessToken = async (req , res , next) =>{
    try{
        const accessToken = await authServices.refreshToken(req.body.refreshToken)
res.status(200).json({
    success : true , 
    accessToken
})
    }catch(err){
next (err)
    }
};

exports.logout = async (req , res , next) =>{
try{
    authServices.logout(req.body.refreshToken);

    res.status(200).json({
        success : true , 
        message : ' Logged out successfully'
    })
}catch(err){
    next(err)
}
};
const appError = require('../utils/appError');

function errorHandler(err , req , res , next){
    console.log(err);

    err.statusCode = err.statusCode || 500 ; 
    err.message = err.message || "internal Server Error ";

    res.status(statusCode).json({
        success : false  , 
        message 
    });

}
module.exports = errorHandler  ; 


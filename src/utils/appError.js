class appError extends Error {
constructor(message , statusCode){
    super(message);
    this.statusCode = statusCode ; 
    this.isoperational = true;
    Error.captureStackTrace(this , this.constructor);
}
}
module.exports = appError ;

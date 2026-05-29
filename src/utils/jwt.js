const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

exports.createAccessToken = (user) =>{
return jwt.sign({email : user.email } , secretKey , {expiresIn : '15m'});

};
exports.createRefreshToken = (user) =>{
    return jwt.sign({email :user.email } , secretKey ,{ expiresIn : '1d'});
};

   

const users = [] ;
const refreshTokens = [] ;

exports.findByEmail = (email) => {
    return users.find (u => u.email === email );
}
exports.saveUser = (user) =>{
    users.push(user);
}

exports.saveRefreshToken = (token ) =>{
    refreshTokens.push(token);
}

exports.findRefreshToken = (token ) => {
return refreshTokens.includes(token);

}
exports.removeRefreshToken = (token) =>{
    const index = refreshTokens.indexOf(token);
    if(index !== -1 ){
        refreshTokens.splice( index , 1 );
    }
}

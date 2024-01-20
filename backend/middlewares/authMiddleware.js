const jsonwebToken = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');


const isAuthorization = catchAsyncError(async (req,res,next) => {

    const {token} =  req.cookies;
    // console.log(token)
    if(!token){
        return next(new ErrorHandler("Please login first",401));
    }
    const {user} = jsonwebToken.verify(token,process.env.JWT_KEY);
    // console.log(user);
    if(!user){
        return next(new ErrorHandler("Invalid Token",401));
    }

    // console.log(req.user);
    req.user = user;
    next();
});

const authorizationRole = (...roles) => catchAsyncError(async (req,res,next) => {

    // console.log(roles);
    // console.log(roles.includes(req.user.role));

    // console.log(res.isHod);
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resources.`,403));
    }



    next();

});


module.exports = {isAuthorization,authorizationRole};
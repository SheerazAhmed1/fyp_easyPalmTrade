const ErrorHandler = require('../utils/errorhandler');



module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong MongoDB Id error
    if(err.name == "CastError"){
        const message = `Recourse not found. Invalid:${err.path}`;
         err=new ErrorHandler(message,400);
    }


    //MOngoDB duplicate key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }


      //WRONG JWT error
      if(err.name == "JsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try again`;
         err=new ErrorHandler(message,400);
    }


      // JWT Expire error
      if(err.name == "TokenExpiredError"){
        const message = `Json Web Token is Expired, Try again`;
         err=new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};




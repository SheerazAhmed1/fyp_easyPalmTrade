const ErrorHandler=require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsynErrors");
const User=require("../models/userModel");
const sendToken=require("../utils/JWTToken");
const { response } = require("express");
const sendEmail=require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary=require("cloudinary");
const Token=require("../models/token");

//Register a User

exports.registerUser= catchAsyncErrors(async(req,res,next)=>{

    const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    });
    const {name,email,password, role}=req.body;




    let user=await User.create({
        name,
        email,
        password,
        role,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });

    const token=await new Token({
        userId:user._id,
        token:crypto.randomBytes(32).toString("hex"),
    }).save();

    const url=`${process.env.FRONTEND_URL}/users/${user._id}/verify/${token.token}`;


    let mail= await sendEmail(user.email,"Verify Email",url);
    console.log(" mail",mail);





    sendToken(user,201,res);



});


//Login USER

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{

    const {email,password}=req.body;

    //CHecking if user has given password and email

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invaild email or password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){

        return next(new ErrorHandler("Invaild email or password",401));

    }



    if(!user.verified){
        console.log("userId ",user._id);
        let token= await Token.findOne({userId:user._id}).exec();
        if(token ) {
            console.log("token is available",token);
        }
        if(!token){
            token=await new Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex"),
            }).save();
            console.log("Token saved",token);
            const url=`${process.env.FRONTEND_URL}/users/${user._id}/verify/${token.token}`;

            const message = `Your verification link is :- \n\n ${url} \n\nIf you have not requested this email then, please ignore it.`;

            await sendEmail({email:user.email,subject:"Verify Email",message});

        }
        else{
            const url=`${process.env.FRONTEND_URL}/users/${user._id}/verify/${token.token}`;

            const message = `Your verification link is :- \n\n ${url} \n\nIf you have not requested this email then, please ignore it.`;

            await sendEmail({email:user.email,subject:"Verify Email",message});
            return next(new ErrorHandler("A verification mail is sent to your email account Please Verify",401));}
    }
    else{
        sendToken(user,200,res);
    }


});

//Logout USER

exports.logout=catchAsyncErrors(async(rew,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })

});

//Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `EasyPalmTrade Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorHandler(
            "User does not exist",
            2001
        ));
    }

    res.status(200).json({
        success: true,
        user,
    });
});


// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});


// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // Cloudinary API
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});


// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});


// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };



    user= await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(200).json({
        success: true,
    });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }


    //remove cloudinary
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});


//verify user

exports.verifyUser = catchAsyncErrors(async (req ,res,next) => {
    try{
        const user= await User.findOne({_id:req.params.id});
        if(!user) return res.status(400).send({message:"Invalid link"});

        const token = await Token.findOne({
            userId:user._id,
            token:req.params.token
        }).exec();
        if(!token) return res.status(400).send({message:"invalid link"})

        await User.updateOne({_id:user._id},{$set:{verified:true}});
        // await token.remove();

        res.status(200).send({message:"Email verified successfully"})

    }catch(error){
        console.error("Error verifying email:", error);
        res.status(500).send({ message: "An error occurred while verifying email" });
    }


});


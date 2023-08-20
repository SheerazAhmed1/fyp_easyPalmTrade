const express = require('express');
const app = express(); 
const errorMiddleware = require('./middleware/error');
const cookieparser=require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");

const path = require("path");
//config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config ({path:"backend/config/config.env"});
}
app.use(express.json({limit:'50mb'}));    
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route Imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");
const biddingDetail=require("./routes/biddingRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
app.use("/api/v1",biddingDetail);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

// Middleware for Error Handling
app.use(errorMiddleware);

module.exports=app;
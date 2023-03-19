const app=require("./app");

 
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handling Uncaught exceptions

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to Uncaught exceptions");
    process.exit(1);
});

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config ({path:"backend/config/config.env"});
}

//Connecting Database

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const server =app.listen(process.env.PORT,()=>{

console.log(`listening on port  + ${process.env.PORT}`);

});





//unhandled promise rejection

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to unhandled promise rejection");

   server.close();
   process.exit(1);
})
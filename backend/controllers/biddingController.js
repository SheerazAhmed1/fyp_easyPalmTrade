
const biddingDetails=require("../models/biddingModel");
const ErrorHandler=require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsynErrors");
const ApiFeatures=require("../utils/apifeatures");



//Get ALL BIDDING DETAILS

exports.getAllBiddingDetails = catchAsyncErrors(async(req,res,next)=>{

    

    const allBiddingDetails =await biddingDetails.find();

    

    res.status(200).json({
        success: true,
        allBiddingDetails,
    });

});

//Create a new bidding details

exports.createBiddingDetail=catchAsyncErrors(async(req,res,next)=>{
   
    //req.body.user=req.user.id;

    const biddingDetail=await biddingDetails.create(req.body);

   

    res.status(200).json({
        success: true,
        biddingDetail,
    });
});


//UPDATING BIDDING DETAIL

exports.updateBiddingDetail=catchAsyncErrors(async(req,res,next)=>{
    let biddingDetail=await biddingDetails.findById(req.params.id);


    if(!biddingDetail){

        return next(new ErrorHandler("Bidding Detail Not Found",404));
    }

    biddingDetail=await biddingDetails.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:'true',
        biddingDetail,
    });

});


// Create a new bidder
exports.createNewBidder=catchAsyncErrors(async(req,res,next)=>{
   
    //req.body.user=req.user.id;

    // const biddingDetail=await biddingDetails.create(req.body);

    const product_id=req.body.product_id

    let bidding = await biddingDetails.findOne({ product_id });

    if(!bidding){
        bidding = await biddingDetails.create(req.body);
    }
    

    const newBidUser = {
        bidder_id : req.body.bidder_id,
        bidAmount: req.body.bidAmount,
        product_id : product_id,
        bidAtTime: new Date(),
      };

      bidding.bidUsers.push(newBidUser);
      await bidding.save();
    
    res.status(200).json({
        success: true,
        newBidUser,
    });
});
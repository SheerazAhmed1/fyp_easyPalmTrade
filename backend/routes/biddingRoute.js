const express = require('express');
const {getAllBiddingDetails,createBiddingDetail,updateBiddingDetail, createNewBidder}=require('../controllers/biddingController');
const{isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");


const router=express.Router();

router.route("/allbiddingDetails").get(getAllBiddingDetails);

router.route("/biddingDetail/new")
.post(createBiddingDetail);

router.route("/biddingDetail/:id")
.put(updateBiddingDetail);

router.route("/biddingDetail/newbidder")
.post(createNewBidder);

module.exports=router;
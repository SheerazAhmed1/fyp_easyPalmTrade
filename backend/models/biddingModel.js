const mongoose = require('mongoose');

const biddingSchema = new mongoose.Schema({
  product_id: {
    type: String,
  },
  seller_id: {
    type: String,
  },
 
  bidUsers: [
    {
      bidder_id: {
        type: String,
      },
      bidAtTime: {
        type: Date,
        default:new Date(),
      },
      bidAmount: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("biddingDetails", biddingSchema);
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "@blaumaus/react-alert";
import "../Admin/productList.css";
import { useSelector, useDispatch } from "react-redux";


import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import "./bidding.css";
import "./productBiddingCard.css";
import { clearErrors, getAdminProduct } from "../../actions/productAction";

import BiddingProductCard from "./productBiddingCard";

import {  timeCheck } from "../../helpers";
import { getAllOrders, myOrders } from "../../actions/orderAction";
import { getBiddingDetails } from "../../actions/biddingAction";

const Bidding = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const [myBiddings, setMyBiddings] = useState(false);
  const alert = useAlert();
  const user = useSelector((state) => state.user);
  
  const biddingDetails=useSelector((state)=>state.biddingProduct.biddingDetails);
  const [errorDisplayed, setErrorDisplayed] = useState(false);

  useEffect(() => {
    if (error && !errorDisplayed) {
      alert.error(error);
      dispatch(clearErrors());
      setErrorDisplayed(true);
    }

    dispatch(getAdminProduct());
    dispatch(getBiddingDetails())
    
  }, [dispatch, error, alert,errorDisplayed]);

 

  //Have to Change Here
  const chekCartItems=()=>{
    const cartObj= localStorage.getItem("cartItems")
    const cartItems= JSON.parse(cartObj);
    // console.log(cartItems);
    const newFilteredProduct=filteredProducts?.filter((item) => item.bidUser === user?.user?._id);
    

    const finalfilteredProductsIds=cartItems?.map((item)=>item.product);
    //let result = finalfilteredProducts.map(a => a._id);

   
    

      
   return finalfilteredProductsIds;
  }

  const filteredProducts = products?.filter((product) => product.isForBidding && !product.isSold);
  console.log(filteredProducts);
  

  let buyerProducts = []
  if(user?.user?.role == 'buyer'){
    const productIds = biddingDetails?.filter(product => product.bidUsers.map(user => user.bidder_id).includes(user?.user?._id))
    .map((bd => bd.product_id))
    buyerProducts = filteredProducts?.filter((product) => productIds.includes(product._id))
  }

  const userProducts =
    user.user?.role == "seller"
      ? filteredProducts?.filter((product) => product.user == user?.user?._id)
      : user.user?.role == "buyer"
      ? buyerProducts
      : filteredProducts;



  const renderProducts = myBiddings ? userProducts : filteredProducts.filter(product => timeCheck(product.biddingExpiry) !== 0 );


//   console.log("Filtered Products",filteredProducts);
//  console.log("chekCaritems:",chekCartItems());
 const result = chekCartItems();
//  console.log(result)
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0.45rem",
          boxShadow: "0 0 5px rgba(15, 15, 15, 0.26)",
          border: "1px solid #ccc;",
          borderRadius: "5px",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => {
                setMyBiddings(e.target.checked);
              }}
            />
          }
          label={myBiddings ? "My Bidding Products" : "All Bidding Products"}
        />
      </div>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}
      >
        {renderProducts?.map((product, index) => {
          return (
              <BiddingProductCard key={index +'_'+ product._id} product={product} />
          );
        })}
      </Box>
      {/*           
      {myBiddings ? (
        <Box
          sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}
        >
      
          {renderProducts?.map((product, index) => {
              
              return (
                (product.biddingExpiry != null) && ((!result?.includes(product._id)))&&
                (
                  <BiddingProductCard key={index} product={product} />
                )
              );
            })}
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}
        >
          {renderProducts?.map((product, index) => {
            // console.log("timeCheck", timeCheck(product.biddingExpiry));
            return (
              product.biddingExpiry != null &&
              timeCheck(product.biddingExpiry) !== 0 && (
                <BiddingProductCard key={index} product={product} />
              )
            );
          })}
        </Box>
      )} */}
    </div>
  );
};

export default Bidding;

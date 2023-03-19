import React, { useEffect, useRef, useState } from "react";
import {useAlert} from "@blaumaus/react-alert";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { updateProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { calcDays, remainingTime, timeCheck } from "../../helpers";
import { useHistory } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";





const BiddingProductCard = ({ product}) => {
  const user = useSelector((state)=>state.user)
  const [bidPrice, setbidPrice] = useState(product.price);
  const [bidFieldValue, setBidFieldValue] = useState(0);
  const alert = useAlert();
  const [time,setTime]=useState(remainingTime(product.biddingExpiry));
  
  const history=useHistory();

  const dispatch=useDispatch();
  const handleClick = () => {
    if (bidFieldValue >= product.price && timeCheck(product.biddingExpiry)>0) {
      setbidPrice(bidFieldValue);
      const myForm = new FormData();
      myForm.set("price",bidFieldValue);
      console.log(user.user)
      myForm.set("bidUser",user?.user?._id)
      dispatch(updateProduct(product._id, myForm));
    } else {
      alert.error("Bid should be greater then Current Bid" );
    }
  };


  const handleSubmit=()=>{
/*
  // Define an object to store in local storage
    const productObj = JSON.stringify(product);

  // Store the string in local storage
    localStorage.setItem("Product", productObj);

  // Define an object to store in local storage
    const userObj = JSON.stringify(user);

      // Store the string in local storage
        localStorage.setItem("User", userObj);


  // Retrieve the string from local storage
  //const myObjStr = localStorage.getItem("myObj");
  // Convert the string back to an object
  //const myObj = JSON.parse(myObjStr);


  history.push("/login?redirect=shipping");*/

  dispatch(addItemsToCart(product._id,product.Stock));
    alert.success("Item Added To Cart ");
  
  }
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(timeCheck(product.biddingExpiry)>0?remainingTime(product.biddingExpiry):"Bid is closed");
    }, 1000);

    return () => {
      clearInterval(intervalId);

    };
  }, []);


  return (
   
    <div className="productCard">
      {console.log(product)}
      <img src={product?.images?.[0]?.url} alt={product?.name} />
      <p>{product.name}</p>

      <p>{calcDays(product.biddingExpiry)>0 ? "Time Left :"+calcDays(product.biddingExpiry)+ " Days":(timeCheck(product.biddingExpiry)!==0?"Time Left :"+time:"Bidding is Closed")} </p>
      <span>Current Bid : {`Rs.${bidPrice}`}</span>
      <div>
        <TextField
          value={bidFieldValue}
          label="Input Amount To Bid"
          id="outlined-start-adornment"
          size="small"
          type="Number"
          sx={{ m: 1, width: "20ch" }}
          onChange={(e) => setBidFieldValue(e.target.value)}
          InputProps={{
              startAdornment: (
                  <InputAdornment position="start">Rs:</InputAdornment>
                  ),
                }}
        />
        <Button onClick={handleClick}>Bid</Button>
      </div>
      {(timeCheck(product.biddingExpiry)===0 &&product?.bidUser===user?.user?._id)&&
        <Button onClick={handleSubmit}>Add to Cart</Button>
      }
    </div>
  );
};

export default BiddingProductCard;

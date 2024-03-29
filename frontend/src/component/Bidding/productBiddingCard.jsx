import React, { useEffect, useRef, useState } from "react";
import {useAlert} from "@blaumaus/react-alert";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { updateProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { calcDays, remainingTime, timeCheck } from "../../helpers";
import { useHistory } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import {Link} from "react-router-dom";
import { createNewBidder } from '../../actions/biddingAction';



const BiddingProductCard = ({ product}) => {
  const user = useSelector((state)=>state.user)
  
  const [bidPrice, setbidPrice] = useState(product.price);
 
  const [bidFieldValue, setBidFieldValue] = useState(null);
  const alert = useAlert();
  const [time,setTime]=useState(remainingTime(product.biddingExpiry));
  
  const history=useHistory();

  const dispatch=useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    if (bidFieldValue >= product.price && timeCheck(product.biddingExpiry)>0 && user?.user?.role!=="seller") {
      setbidPrice(bidFieldValue);
      const myForm = new FormData();
      myForm.set("price",bidFieldValue);
      myForm.set("bidUser",user?.user?._id)
      dispatch(updateProduct(product?._id, myForm));
      dispatch(createNewBidder({   
        "product_id": product?._id,
        "bidder_id" : user?.user?._id,
        "bidAmount": bidFieldValue,
    })) 
    } else {
      alert.info("Bid should be greater then Current Bid");
    }
  };


  const handleSubmit=(e)=>{
    e.preventDefault();
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
  }, [dispatch,alert]);


  return (

    <Link className='biddingCard' to={`/bidding/${product._id}`}>
    <div className="productBiddingCard">
      <img src={product?.images?.[0]?.url} alt={product?.name} />
      <div className="pName">
        <p className="productName">{product.name}</p>
         
      <p>{calcDays(product.biddingExpiry)>0 ? "Time Left :"+calcDays(product.biddingExpiry)+ " Days":(timeCheck(product.biddingExpiry)!==0?"Time Left :"+time:"Bidding is Closed")} </p>
      </div>
      <span>Current Bid : {`Rs.${bidPrice}`}</span>
      <div className="textField">
        <TextField

          value={bidFieldValue}
          label="Input Amount To Bid"
          id="outlined-start-adornment"
          size="small"
          type="Number"
          onClick={(e)=>{e.preventDefault();}}
          onChange={(e) => setBidFieldValue(e.target.value)}
          InputProps={{
              startAdornment: (
                  <InputAdornment position="start">Rs:</InputAdornment>
                  ),
                }}
        />
        <Button onClick={(e)=>handleClick(e)}>Bid</Button>
      </div>
      {(timeCheck(product.biddingExpiry)===0 &&product?.bidUser===user?.user?._id)&&
        <Button className="buttonaddtoCart" onClick={handleSubmit}>Add to Cart</Button>
      }
    </div>
    </Link>
  );
};

export default BiddingProductCard;

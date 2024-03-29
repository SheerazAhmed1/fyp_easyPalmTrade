// import React, { Fragment, useEffect, useRef } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
// import { Typography } from "@mui/material";
// import { useAlert } from "@blaumaus/react-alert";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import axios from "axios";
// import "./payment.css";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import EventIcon from "@mui/icons-material/Event";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import { createOrder, clearErrors } from "../../actions/orderAction";
// import { updateProduct } from "../../actions/productAction";

// const Payment = ({ history }) => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const stripe = useStripe();
//   const elements = useElements();
//   const payBtn = useRef(null);
 
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);

//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };

//   const order = {
//     shippingInfo,
//     orderItems: cartItems,
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax,
//     shippingPrice: orderInfo.shippingCharges,
//     totalPrice: orderInfo.totalPrice,
    
//   };


  



//   const submitHandler = async (e) => {
//     e.preventDefault();

//     payBtn.current.disabled = true;

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "/api/v1/payment/process",
//         paymentData,
        
//         config
//       );

//       const client_secret = data.client_secret;
      
//       if (!stripe || !elements) return;

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
          
//           billing_details: {
//             name: user.name,
//             email: user.email,
//             address: {
//               line1: shippingInfo.address,
//               city: shippingInfo.city,
//               state: shippingInfo.state,
//               postal_code: shippingInfo.pinCode,
//               country: shippingInfo.country,
//             },
//           },
//         },
//       });
      
//       if (result.error) {
//         payBtn.current.disabled = false;

//         alert.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           order.paymentInfo = {
//             id: result.paymentIntent.id,
//             status: result.paymentIntent.status,
//           };

//           dispatch(createOrder(order));
//           order.orderItems.forEach(element => {
//             dispatch(updateProduct(element.product,{isSold: true}));
//           });
          
//           localStorage.removeItem("cartItems");
//           history.push("/success");
//         } else {
//           alert.error("There's some issue while processing payment ");
//         }
//       }
//     } catch (error) {
//       payBtn.current.disabled = false;
//       alert.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error, alert]);

//   return (
//     <Fragment>
//       <MetaData title="Payment" />
//       <CheckoutSteps activeStep={2} />
//       <div className="paymentContainer">
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <Typography>Card Info</Typography>
//           <div>
//             <CreditCardIcon />
//             <CardNumberElement className="paymentInput" />
//           </div>
//           <div>
//             <EventIcon />
//             <CardExpiryElement className="paymentInput" />
//           </div>
//           <div>
//             <VpnKeyIcon />
//             <CardCvcElement className="paymentInput" />
//           </div>

//           <input
//             type="submit"
//             value={`Pay - Rs.${orderInfo && orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="paymentFormBtn"
//           />
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;


import React, { Fragment, useState, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Chip, Typography } from "@mui/material";
import { useAlert } from "@blaumaus/react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { updateProduct } from "../../actions/productAction";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [paymentMethod, setPaymentMethod] = useState("online");
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (paymentMethod === "online") {
        const { data } = await axios.post(
          "/api/v1/payment/process",
          paymentData,
          config
        );

        const client_secret = data.client_secret;

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),

            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        });

        if (result.error) {
          payBtn.current.disabled = false;
          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };

            dispatch(createOrder(order));
            order.orderItems.forEach((element) => {
              dispatch(updateProduct(element.product, { isSold: true }));
            });

            localStorage.removeItem("cartItems");
            history.push("/success");
          } else {
            alert.error("There's some issue while processing payment ");
          }
        }
      } else if (paymentMethod === "cash") {
        dispatch(createOrder(order));
        order.orderItems.forEach((element) => {
          dispatch(updateProduct(element.product, { isSold: true }));
        });

        localStorage.removeItem("cartItems");
        history.push("/success");
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

 const handlecodsubmit = (e)=>{
  dispatch(createOrder(order));
  order.orderItems.forEach((element) => {
    dispatch(updateProduct(element.product, { isSold: true }));
  });

  localStorage.removeItem("cartItems");
  history.push("/success");
 }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <div className="paymentMethodSelection">
            <label>
              <input

                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />&nbsp;
              Online Payment
            </label>
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              /> &nbsp;
              Cash on Delivery
            </label>
          </div>
          {paymentMethod === "online" && (
            <div className="onlinepaymentdiv">
            <Typography>Card Info</Typography>
          <div>
             <CreditCardIcon />
             <CardNumberElement className="paymentInput" />
           </div>
           <div>
             <EventIcon />
             <CardExpiryElement className="paymentInput" />
           </div>
           <div>
             <VpnKeyIcon />
             <CardCvcElement className="paymentInput" />
           </div>
           <input
            type="submit"
            value={`Pay - Rs.${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
           
            </div>
          )}
          {paymentMethod==="cash" && (
          
          <input
            id="codbtn"
            type="submit"
            value={`Confirm - Rs.${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
            onSubmit={(e)=>handlecodsubmit(e)}
          />)}
          
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;

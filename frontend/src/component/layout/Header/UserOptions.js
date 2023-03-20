import React, { Fragment, useState } from 'react'
import"./Header.css";
import { SpeedDial,SpeedDialAction ,Backdrop} from '@mui/material';
import { MdDashboard,MdPerson,MdExitToApp,MdList,MdViewList,MdShoppingCart,MdStore} from 'react-icons/md';
import {useHistory} from "react-router-dom"
import{useAlert} from "@blaumaus/react-alert"
import {logout} from "../../../actions/userActions"
import { useDispatch,useSelector} from"react-redux";
 
const UserOptions = ({user}) => {

    const {cartItems} = useSelector((state)=>state.cart)

    const [open,setOpen]= useState(false);
    const history=useHistory();
    const alert=useAlert();
    const dispatch=useDispatch();


    const options=[
        {icon:<MdViewList/>,name:"Orders",func:orders},
        {icon:<MdPerson/>,name:"Profile",func:account},
        {icon:<MdStore/>,name:"Bidding",func:bidding},
        {icon:<MdShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} />,name:`Cart(${cartItems.length})`,func:cart},
        {icon:<MdExitToApp/>,name:"Logout",func:logoutUser}
    ]

    if(user.role==="admin" || user.role==="seller"){
        options.unshift( {icon:<MdDashboard/>,name:"Dashboard",func:dashboard})
    }

    function dashboard(){
        history.push("/admin/dashboard");
    }

    function orders(){
        history.push("/orders");
    }


    function account(){
        history.push("/account");
    }

    function cart(){
        history.push("/cart");
    }

    function bidding(){
        history.push("/bidding");
    }

    function logoutUser(){
       dispatch(logout());
        alert.success("Logout Successfully");
        console.log("history:",history);

        if(history.location.pathname=="/bidding"){
        history.push("/login");

        }
    }




  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}} />
            <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>{setOpen(false)}}
            onOpen={()=>{setOpen(true)}}
            style={{
                zIndex:"11",
            }}
            open={open}
            
            direction="down"
            className='speedDial'
            icon={
                <img
                className='speedDialIcon'
                src={user.avatar.url?user.avatar.url:"/Profile.png"}
                alt="Profile"
                />
            }
            >
            
            {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />))}

           
            </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
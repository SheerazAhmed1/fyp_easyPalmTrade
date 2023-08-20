import { Autocomplete,  TextField } from '@mui/material'
import React, { useEffect, useRef, useState ,Fragment} from 'react'
import './shipper.css'
import { useAlert } from "@blaumaus/react-alert";
import { Button } from "@mui/material";
import {
  getAllOrders,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";



import { DataGrid } from "@mui/x-data-grid";

import { useDispatch,useSelector } from 'react-redux';






const Shipper = () => {
    const cities = [
      "Islamabad",
      "Karachi",
  "Badin",
  "Bhirkan",
  "Rajo Khanani",
  "Therhi",
  "Chak",
  "Dadu",
  "Digri",
  "Diplo",
  "Dokri",
  "Ghotki",
  "Haala",
  "Hyderabad",
  "Islamkot",
  "Jacobabad",
  "Jamshoro",
  "Jungshahi",
  "Kandhkot",
  "Kandiaro",
  "Kashmore",
  "Keti Bandar",
  "Khairpur",
  "Kotri",
  "Larkana",
  "Matiari",
  "Mehar",
  "Mirpur Khas",
  "Mithani",
  "Mithi",
  "Mehrabpur",
  "Moro",
  "Nagarparkar",
  "Naudero",
  "Naushahro Feroze",
  "Naushara",
  "Nawabshah",
  "Nazimabad",
  "Qambar",
  "Qasimabad",
  "Ranipur",
  "Ratodero",
  "Rohri",
  "Sakrand",
  "Sanghar",
  "Shahbandar",
  "Shahdadkot",
  "Shahdadpur",
  "Shahpur Chakar",
  "Shikarpaur",
  "Sukkur",
  "Tangwani",
  "Tando Adam Khan",
  "Tando Allahyar",
  "Tando Muhammad Khan",
  "Thatta",
  "Umerkot",
  "Warah",
  "Ahmed Nager Chatha",
  "Ahmadpur East",
  "Ali Khan Abad",
  "Alipur",
  "Arifwala",
  "Attock",
  "Bhera",
  "Bhalwal",
  "Bahawalnagar",
  "Bahawalpur",
  "Bhakkar",
  "Burewala",
  "Chillianwala",
  "Chakwal",
  "Chichawatni",
  "Chiniot",
  "Chishtian",
  "Daska",
  "Dera Ghazi Khan",
  "Dhaular",
  "Dina",
  "Dinga",
  "Dipalpur",
  "Faisalabad",
  "Ferozewala",
  "Fateh Jhang",
  "Ghakhar Mandi",
  "Gojra",
  "Gujranwala",
  "Gujrat",
  "Gujar Khan",
  "Hafizabad",
  "Haroonabad",
  "Hasilpur",
  "Haveli Lakha",
  "Jatoi",
  "Jalalpur",
  "Jattan",
  "Jampur",
  "Jaranwala",
  "Jhang",
  "Jhelum",
  "Kalabagh",
  "Karor Lal Esan",
  "Kasur",
  "Kamalia",
  "Kamoke",
  "Khanewal",
  "Khanpur",
  "Kharian",
  "Khushab",
  "Kot Addu",
  "Jauharabad",
  "Lahore",
  "Lalamusa",
  "Layyah",
  "Liaquat Pur",
  "Lodhran",
  "Malakwal",
  "Mamoori",
  "Mailsi",
  "Mandi Bahauddin",
  "Mian Channu",
  "Mianwali",
  "Multan",
  "Murree",
  "Muridke",
  "Mianwali Bangla",
  "Muzaffargarh",
  "Narowal",
  "Nankana Sahib",
  "Okara",
  "Renala Khurd",
  "Pakpattan",
  "Pattoki",
  "Pir Mahal",
  "Qaimpur",
  "Qila Didar Singh",
  "Rabwah",
  "Raiwind",
  "Rajanpur",
  "Rahim Yar Khan",
  "Rawalpindi",
  "Sadiqabad",
  "Safdarabad",
  "Sahiwal",
  "Sangla Hill",
  "Sarai Alamgir",
  "Sargodha",
  "Shakargarh",
  "Sheikhupura",
  "Sialkot",
  "Sohawa",
  "Soianwala",
  "Siranwali",
  "Talagang",
  "Taxila",
  "Toba Tek Singh",
  "Vehari",
  "Wah Cantonment",
  "Wazirabad",

  "Abbottabad",
  "Adezai",
  "Alpuri",
  "Akora Khattak",
  "Ayubia",
  "Banda Daud Shah",
  "Bannu",
  "Batkhela",
  "Battagram",
  "Birote",
  "Chakdara",
  "Charsadda",
  "Chitral",
  "Daggar",
  "Dargai",
  "Darya Khan",
  "Dera Ismail Khan",
  "Doaba",
  "Dir",
  "Drosh",
  "Hangu",
  "Haripur",
  "Karak",
  "Kohat",
  "Kulachi",
  "Lakki Marwat",
  "Latamber",
  "Madyan",
  "Mansehra",
  "Mardan",
  "Mastuj",
  "Mingora",
  "Nowshera",
  "Paharpur",
  "Pabbi",
  "Peshawar",
  "Saidu Sharif",
  "Shorkot",
  "Shewa Adda",
  "Swabi",
  "Swat",
  "Tangi",
  "Tank",
  "Thall",
  "Timergara",
  "Tordher",
  "Awaran",
  "Barkhan",
  "Chagai",
  "Dera Bugti",
  "Gwadar",
  "Harnai",
  "Jafarabad",
  "Jhal Magsi",
  "Kacchi",
  "Kalat",
  "Kech",
  "Kharan",
  "Khuzdar",
  "Killa Abdullah",
  "Killa Saifullah",
  "Kohlu",
  "Lasbela",
  "Lehri",
  "Loralai",
  "Mastung",
  "Musakhel",
  "Nasirabad",
  "Nushki",
  "Panjgur",
  "Pishin Valley",
  "Quetta",
  "Sherani",
  "Sibi",
  "Sohbatpur",
  "Washuk",
  "Zhob",
  "Ziarat",

]
const dispatch=useDispatch();
const alert=useAlert();
const [accepted, setAccepted] = useState(false);
const refer=useRef()
const [select, setSelect] = useState([]);
const [filteredOrders, setFilteredOrders] = useState([]);
const{user:currentUser}=useSelector((state) => state.user);
const {orders } = useSelector((state) => state.allOrders);


useEffect(() => {
  
  dispatch(getAllOrders())
  
  
}, [])

console.log(orders,"orders");
 const accpetedOrders=orders?.filter(order => order.shipperid !==null && order.shipperid == currentUser._id);
 console.log("accpetedOrders",accpetedOrders);
const notAcceptedOrders=orders?.filter(order => order.shipperid===null);
console.log("notAcceptedOrders",notAcceptedOrders);



//DATAGRID CODE

const notAcceptedColumns = [
  { field: "address", headerName: "Address", minWidth: 300, flex: 1 },

  {
    field: "city",
    headerName: "City",
    minWidth: 150,
    flex: 0.5,
  },
  {
    field: "itemsQty",
    headerName: "Items Qty",
    type: "number",
    minWidth: 150,
    flex: 0.4,
  },

  {
    field: "shippingPrice",
    headerName: "Shipping Price",
    type: "number",
    minWidth: 150,
    flex: 0.5,
  },
  {field: "TotalPrice",
  headerName:"Total Price",
  type: "number",
  minWidth: 150,
  flex: 0.5,
  },
  {
    field: "actions",
    flex: 0.3,
    headerName: "Actions",
    minWidth: 150,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      
      return (
        <Fragment>
          
            {params.row.shipperid== null &&
             <Button
              variant='contained'
              

            onClick={() =>{
              const myForm = new FormData();

              
              const data = {
                "status": "Shipped",
                "shipperid": currentUser?._id,
              }
          
              dispatch(updateOrder(params.id, data));
  
              dispatch(getAllOrders())
             
            }}
          >
          Accept
          </Button>
    }
        </Fragment>
      );
    },
  }
];


const acceptedColumns = [
  { field: "address", headerName: "Address", minWidth: 300, flex: 1 },

  {
    field: "city",
    headerName: "City",
    minWidth: 150,
    flex: 0.5,
  },
  {
    field: "itemsQty",
    headerName: "Items Qty",
    type: "number",
    minWidth: 150,
    flex: 0.4,
  },

  {
    field: "shippingPrice",
    headerName: "Shipping Price",
    type: "number",
    minWidth: 150,
    flex: 0.5,
  },
  {field: "TotalPrice",
  headerName:"Total Price",
  type: "number",
  minWidth: 150,
  flex: 0.5,
  },
  {
    field: "actions",
    flex: 0.3,
    headerName: "Actions",
    minWidth: 150,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      
      return (
        <Fragment>
          
            { 
             <Button
              variant='contained'
              disabled={params.row.orderStatus === "Delivered"}

            onClick={() =>{
              const myForm = new FormData();

              
              const data = {
                "status": "Delivered",
                "shipperid": currentUser?._id,
              }
          
              dispatch(updateOrder(params.id, data));
  
              dispatch(getAllOrders())
             
            }}
          >
           {params.row.orderStatus === "Delivered"? "delivered" : "deliver"}
          </Button>
    }
        </Fragment>
      );
    },
  }
];






let newfilteredOrders=[];

const handleClick = ()=>{



  const filteredOrders = orders.filter((order) => select.toString().toLowerCase().includes(order.shippingInfo.city.toLowerCase()));


    setFilteredOrders(filteredOrders);

 console.log("filtered orders using state :",filteredOrders);
  



}

let accpetedrows=[];

accpetedOrders && accpetedOrders.forEach((item) => {
   accpetedrows.push({
     id:item._id,
  address: item.shippingInfo.address,
  city:item.shippingInfo.city,
  itemsQty: item.orderItems.length,
  shippingPrice: item.shippingPrice,
  TotalPrice: item.totalPrice,
  orderStatus:item.orderStatus,})});





let notAcceptedRows =[];

if(filteredOrders.length!=0 ){
  filteredOrders.foreach((item) => {
    notAcceptedRows.push({
      id:item._id,
      address: item.shippingInfo.address,
      city:item.shippingInfo.city,
      itemsQty: item.orderItems.length,
      shippingPrice: item.shippingPrice,
      TotalPrice: item.totalPrice,
      orderStatus:item.orderStatus,
    });
  });
}
else{

notAcceptedOrders &&
notAcceptedOrders.forEach((item) => {
  notAcceptedRows.push({
    id:item._id,
    address: item.shippingInfo.address,
    city:item.shippingInfo.city,
    itemsQty: item.orderItems.length,
    shippingPrice: item.shippingPrice,
    TotalPrice: item.totalPrice,
    orderStatus:item.orderStatus,
  });
});

}






    

const onSelectChange = (event, values)=>{

  setSelect(values);
  

}





  return (
    <>

      <div className="page">
        <Autocomplete
        multiple
        id="cities"
        options={cities}
        ref={refer}
        onChange={onSelectChange}
        // getOptionLabel={(option) => option.title}
        
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Cities"
            placeholder="City"
            style={{ width:300 }}
          />
        )}
      />
      <input
                  type="submit"
                  value="Search"
                  className="submitCities"
                  onClick={handleClick}
                />


</div>

<div className="ordertableContainer"> All Orders
<DataGrid
            rows={notAcceptedRows}
            columns={notAcceptedColumns}
            pageSize={5}
            disableSelectionOnClick
            className="ordersListTable"
            autoHeight
            
          />
</div>
<div className='ordertableContainer'>My Accepted Orders</div> 

    <DataGrid 
    rows={accpetedrows}
    columns={acceptedColumns}
    pageSize={5}
    disableSelectionOnClick
    className="ordersListTable"
    autoHeight
    
    />

       </>
  )
}

export default Shipper
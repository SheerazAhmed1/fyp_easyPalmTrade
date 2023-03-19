import { Autocomplete, Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
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

const {orders } = useSelector((state) => state.allOrders);

useEffect(() => {
  
  dispatch(getAllOrders())
  
  
}, [])

//DATAGRID CODE

const columns = [
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
    minWidth: 270,
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
      console.log(params, "PARAMS CONSOLE");
      return (
        <Fragment>
          {params.row.orderStatus == 'Shipped'
            ? <div>Accepted</div>
            : <Button
            onClick={() =>{
              const myForm = new FormData();

              myForm.set("status", "Shipped");
          
              dispatch(updateOrder(params.id, myForm));
  
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

let newfilteredOrders=[];

const handleClick = ()=>{

  
  newfilteredOrders=orders.filter(order=>select.includes(order.shippingInfo.city));

 console.log("city:",orders[0].shippingInfo.city);
  



}




const rows =[];

orders &&
orders.forEach((item) => {
  rows.push({
    id:item._id,
    address: item.shippingInfo.address,
    city:item.shippingInfo.city,
    itemsQty: item.orderItems.length,
    shippingPrice: item.shippingPrice,
    orderStatus:item.orderStatus,
  });
});

console.log("Rows",rows)

const refer=useRef()
const [select, setSelect] = useState([]);
    

const onSelectChange = (event, values)=>{

  setSelect(values)

}

console.log("newFilteredProducts :" ,newfilteredOrders);



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
          />
        )}
      />
      <input
                  type="submit"
                  value="submit"
                  className="submitCities"
                  onClick={handleClick}
                />


</div>

<div class="ordertableContainer">
<DataGrid
            rows={rows}
            columns={columns}
            
            disableSelectionOnClick
            className="ordersListTable"
            autoHeight
          />
</div>
       </>
  )
}

export default Shipper
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "@blaumaus/react-alert";
import "./bidding.css";
import { updateProduct } from "../../actions/productAction";
import { getBiddingDetails } from "../../actions/biddingAction";
import { getProductDetails } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userActions";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card } from "@mui/material";
import AuctionCard from "./AuctionCard";

const BiddingItemLoader = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const {
    biddingDetails,
    loading: bLoading,
    error,
  } = useSelector((state) => state.biddingProduct);

  const { product, loading: pLoading } = useSelector(
    (state) => state.productDetails
  );

  const { user: currentUser } = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getBiddingDetails());
    dispatch(getProductDetails(params.id));
    if (allUsers.users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch,]);


  const isLoading = pLoading || bLoading;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <BiddingItem biddingDetails={biddingDetails} product={product} currentUser={currentUser} allUsers={allUsers}/>;
};

export default BiddingItemLoader;

const BiddingItem = ({biddingDetails, product, currentUser, allUsers}) => {

  const params = useParams();
  const dispatch = useDispatch();

  const alert = useAlert();
  const bidAccepted =
    product.bidAccepted_id == "no" ? null : product.bidAccepted_id;

  const [accepted, setAccepted] = useState(bidAccepted);

  const productBidders =
    biddingDetails.find((product) => product["product_id"] == params.id)
      ?.bidUsers ?? [];
  
  let biddersInfo = [];
  productBidders.forEach((bidder) => {
    const productBidder = allUsers.users.find(
      (user) => user["_id"] == bidder["bidder_id"]
    );
    biddersInfo.push({ ...productBidder, ...bidder });
  });

 
  //Accept Bid Functionality

  async function handleclick(params) {
    console.log("accepted in click", typeof accepted);

    if (accepted) {
      // setAccepted(false);
      // Add your custom logic for canceling the bid here

      if (accepted != params.row.id) {
        alert.info("Bid Already Accepted");
      } else {
        const myForm = new FormData();
        myForm.set("price", params.row.amount);
        myForm.set("bidUser", null);
        myForm.set("bidAccepted_id", "no");
        dispatch(updateProduct(product?._id, myForm));
        setAccepted(false);
        alert.info("Bid Cancelled");
      }
    } else {
      // Accept Bid logic
      setAccepted(params.row.id);

      const myForm = new FormData();
      myForm.set("price", params.row.amount);
      myForm.set("bidUser", params.row.bidder_id);
      myForm.set("bidAccepted_id", params.row.id);
      dispatch(updateProduct(product?._id, myForm));
      alert.success("Bid Accepted");

    }
  }

  let columns = [];

  if (currentUser?.role === "seller" && product?.user === currentUser._id) {
    columns = [
      { field: "bidder_id", headerName: "Bidder Id", minWidth: 300, flex: 1 },

      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
        //   cellClassName: (params) => {
        //     return params.getValue(params.id, "status") === "Delivered"
        //       ? "greenColor"
        //       : "redColor";
        //   },
      },
      {
        field: "bidAtTime",
        headerName: "Biddig Time",
        minWidth: 150,
        flex: 0.4,
      },

      {
        field: "amount",
        headerName: "Amount",
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
          return (
            <>
              <Button
                variant="contained"
                color={accepted == params.row.id ? "secondary" : "primary"}
                onClick={() => handleclick(params)}
              >
                {accepted == params.row.id ? "Cancel Bid" : "Accept Bid"}
              </Button>
            </>
          );
        },
      },
    ];
  } else {
    columns = [
      { field: "bidder_id", headerName: "Bidder Id", minWidth: 300, flex: 1 },

      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
        //   cellClassName: (params) => {
        //     return params.getValue(params.id, "status") === "Delivered"
        //       ? "greenColor"
        //       : "redColor";
        //   },
      },
      {
        field: "bidAtTime",
        headerName: "Biddig Time",
        minWidth: 150,
        flex: 0.4,
      },

      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
    ];
  }

  const rows = [];

  biddersInfo.forEach((item) => {
    rows.push({
      id: item._id,
      bidder_id: item.bidder_id,
      name: item.name,
      amount: item.bidAmount,
      bidAtTime: new Date(item.bidAtTime).toLocaleString(),
    });
  });

  return (
    <div className="pageContent">
      <AuctionCard
        productId={product?.["_id"]}
        name={product?.name}
        description={product?.description}
        bidAmount={product?.price}
        bidExpiryTime={product?.biddingExpiry}
        image={product?.images?.[0]?.url}
        user={currentUser}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="biddersTable"
        autoHeight
      />
    </div>
  );
};

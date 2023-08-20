import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../actions/productAction';
import { timeCheck } from '../../helpers';
import { useAlert } from "@blaumaus/react-alert";
import { createNewBidder } from '../../actions/biddingAction';






const styles = {
  card: {
    display: 'flex',
    maxWidth: 600,
    margin: '0 auto',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 'auto',
    objectFit: 'cover',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  bidSection: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
  },
  bidInput: {
    marginRight: 8,
    flex: 1,
  },
  bidButton: {
    flexShrink: 0,
  },
};
const AuctionCard = ({ productId, name, description, bidAmount, bidExpiryTime, image, user }) => {

  const dispatch = useDispatch();     

  const bidRef = useRef(null);  
  const alert=useAlert();

  const handleClick = () => {

    const currentBidVal = bidRef.current.value;

    // will be in if condition
    if (currentBidVal > bidAmount && user.role!=="seller"  ) {;
      const myForm = new FormData();
      myForm.set("price", currentBidVal);
      myForm.set("bidUser", user?._id);
      dispatch(updateProduct(productId, myForm));
      dispatch(createNewBidder({   
        "product_id": productId,
        "bidder_id" : user?._id,
        "bidAmount": currentBidVal,
    })) 
      alert.success("Bid Successfully");
    } else {
      alert.info("Bid should be greater then Current Bid");
    }
  };

  return (
    <Card style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={image} alt={name} style={styles.image} />
      </div>
      <CardContent style={styles.content}>
        <div>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6" component="div">
            Bid Amount: {bidAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bid Expiry Time:  {new Date(bidExpiryTime).toLocaleDateString() + " " + new Date(bidExpiryTime).toLocaleTimeString()}
          </Typography>
        </div>
        <div style={styles.bidSection}>
          <TextField
            label="Bid Amount"
            variant="outlined"
            size="small"
            type='number'
            style={styles.bidInput}
            inputRef={bidRef}
          />
          <Button disabled={timeCheck(bidExpiryTime) <= 0} onClick={handleClick} variant="contained" color="primary" style={styles.bidButton}>
            Place Bid
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuctionCard;

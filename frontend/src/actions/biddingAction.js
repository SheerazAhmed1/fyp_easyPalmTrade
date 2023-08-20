import axios from 'axios';

import {
    ALL_BIDDING_REQUEST,
    ALL_BIDDING_SUCCESS,
    ALL_BIDDING_FAIL,
    NEW_BIDDING_REQUEST,
    NEW_BIDDING_SUCCESS,
    NEW_BIDDING_FAIL,
    UPDATE_BIDDING_REQUEST,
    UPDATE_BIDDING_SUCCESS,
    UPDATE_BIDDING_FAIL,
} from '../constants/biddingConstants';


// Create Bidding Detail

export const createBiddingDetail = (biddingData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_BIDDING_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/biddingDetail/new`,
       biddingData,
        config
      );
  
      dispatch({
        type: NEW_BIDDING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_BIDDING_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Update Bidding Detail
export const updateBiddingDetail = (id, biddingData) => async (dispatch) => {
    try {
      
  
      dispatch({ type: UPDATE_BIDDING_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/biddingDetail/${id}`,
        biddingData,
        config
      );
  
      dispatch({
        type: UPDATE_BIDDING_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BIDDING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Get All Bidding Details
export const getBiddingDetails = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_BIDDING_REQUEST });
  
      const { data } = await axios.get("/api/v1/allbiddingDetails");

      dispatch({
        type: ALL_BIDDING_SUCCESS,
        payload: data['allBiddingDetails'],
      });
    } catch (error) {
      dispatch({
        type: ALL_BIDDING_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  //CREATE A NEW BIDDER

  export const createNewBidder = (biddingData) => async (dispatch) => {
    try {
      dispatch({ type: 'NEW_BIDDER_REQUEST' });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/biddingDetail/newbidder`,
       biddingData,
        config
      );
  
      dispatch({
        type: 'NEW_BIDDER_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'NEW_BIDDER_FAIL',
        payload: error.response.data.message,
      });
    }
  };

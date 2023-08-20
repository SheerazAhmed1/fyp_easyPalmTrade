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
import { CLEAR_ERRORS } from '../constants/productConstants';


//All bidding details 

export const biddingDetailsReducer=(state={biddingDetails:[]},action)=>{
    console.log('action in bidding', action);
    switch(action.type){
        case ALL_BIDDING_REQUEST:
            return {
                loading : true,
                biddingDetails:[],
            };
        case ALL_BIDDING_SUCCESS:
            return {
                loading : false,
                biddingDetails :action.payload, 
            };
        case ALL_BIDDING_FAIL:
            return{
                loading : false,
                error:action.payload,
            }
            case 'NEW_BIDDER_REQUEST':
                return {
                    ...state,
                    loading : true,
                };
            case 'NEW_BIDDER_SUCCESS':

                const product = state.biddingDetails.find( prod =>  action.payload.newBidUser.product_id === prod.product_id )
                product.bidUsers.push(action.payload.newBidUser)

                console.log('payloda', action.payload.newBidUser);
                return{
                    
                    loading : false,
                    success: action.payload.success,
                    ...state,

                };
            case 'NEW_BIDDER_FAIL':
                return{
                ...state,
                loading : false,
                error:action.payload,    
                };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        
        

        default:
            return state;
    }
};

//new bid detail

export const newBiddingDetailsReducer=(state={biddingDetails:{}},action)=>{
    switch(action.type) {
        case NEW_BIDDING_REQUEST:
            return {
                ...state,
                loading : true,
            };
        case NEW_BIDDING_SUCCESS:
            return{
                loading : false,
                success: action.payload.success,
                biddingDetail: action.payload.biddingDetail,
            };
        case NEW_BIDDING_FAIL:
            return{
            ...state,
            loading : false,
            error:action.payload,    
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;    
    }

};


// export const addNewBidUser=(state={biddingDetails:{}}, action)=>{
//     console.log('Action in add new', action);
//     console.log('state in add new', state);
//     switch(action.type) {
//         case 'NEW_BIDDER_REQUEST':
//             return {
//                 ...state,
//                 loading : true,
//             };
//         case 'NEW_BIDDER_SUCCESS':
//             return{
//                 loading : false,
//                 success: action.payload.success,
//                 biddingDetail: action.payload.biddingDetail,
//             };
//         case 'NEW_BIDDER_FAIL':
//             return{
//             ...state,
//             loading : false,
//             error:action.payload,    
//             };
//         case CLEAR_ERRORS:
//             return{
//                 ...state,
//                 error:null,
//             };
//         default:
//             return state;    
//     }

// };

export const updateBiddingDetailsReducer=(state={},action)=>{
    console.log(
        "action in update bidding Details", action
    );
    switch(action.type) {

        case UPDATE_BIDDING_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case UPDATE_BIDDING_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated : action.payload,
            };
        case UPDATE_BIDDING_FAIL:
            return{
                ...state,
                loading: false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
}
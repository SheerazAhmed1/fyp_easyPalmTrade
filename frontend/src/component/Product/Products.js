import React, { Fragment ,useEffect,useState} from 'react'
import "./Product.css";
import MetaData from "../layout/MetaData";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from "../Home/ProductCard";
import  Pagination from "react-js-pagination";
import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import {useAlert} from "@blaumaus/react-alert";


const categories=[
  "Aseel",
  "Khurma",
  "Shakri",
  "Shamran",
  "Kupra",
  "Haleeni"
];


const Products = ({match}) => {
    const dispatch=useDispatch();
    const alert = useAlert();

    const[currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,25000]);
    const [category,setCategory]=useState("");
    const [ratings,setRatings]=useState(0);

    const{products,loading,error,productsCount
    ,resultPerPage}=useSelector(state=>state.products);
    
    const keyword=match.params.keyword;

    const setCurrentPageNo=(e)=>{
      setCurrentPage(e)
    }

    const priceHandler=(event,newPrice)=>{
      setPrice(newPrice);
    }

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors);
        
      }


      dispatch(getProduct(keyword,currentPage,price,category,ratings));
      
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])
    

    const filteredProducts = products?.filter((product) => product.isForBidding);
    console.log("products for Bidding",filteredProducts);

    const finalfilteredProductsIds=filteredProducts?.map((item)=>item._id);
    console.log("products ids",finalfilteredProductsIds);
  return (
   <Fragment>
    {loading?<Loader />:
    (
    <Fragment>
      <MetaData title="PRODUCTS"/>
    <h1 className='productsHeading'>Products</h1>

    <div className='products'>
    {products  && products.map((product)=>(
      
      (!finalfilteredProductsIds?.includes(product._id)) &&  <ProductCard key={product._id} product={product} />
    ))}
    </div>

      <div className='filterBox'>
      <Typography>Price</Typography>
      <Slider
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
         
         min={0}
         max={25000}
      />
      <Typography>Categories</Typography>

      <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

      <fieldset>
        <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
                setRatings(newRating);
             }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
              />
            </fieldset>
      </div>



    {resultPerPage<productsCount &&(
      <div className='paginationBox'>
      <Pagination
       activePage={currentPage}
       itemsCountPerPage={resultPerPage}
        totalItemsCount={productsCount}
        onChange={setCurrentPageNo}
        nextPageText="Next"
        prevPageText="Prev"
        firstPageText="1st"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      />
  </div>
    )}
    </Fragment>
    )}
   </Fragment>
  )
}

export default Products
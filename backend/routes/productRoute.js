const express = require('express');
const{getAllproducts,createProduct,updateProduct,deleteProduct, getProductDetails,getAdminProducts, createProductReview, getProductReviews, deleteReview}=require("../controllers/productController");
const{isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

const router=express.Router();


router.route("/products").get(getAllproducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin","seller","buyer",), getAdminProducts);

router.route("/admin/product/new")
.post(isAuthenticatedUser, authorizeRoles("admin","seller"),createProduct);

router.route("/admin/product/:id")
.put(isAuthenticatedUser ,authorizeRoles("admin","shipper","seller","buyer"),updateProduct)
.delete(isAuthenticatedUser ,authorizeRoles("admin"),deleteProduct)


router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);



module.exports=router;
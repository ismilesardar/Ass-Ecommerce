/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//thir-pairty module require
const express = require("express");
const formidable = require("express-formidable");
const proCon = require("../controllers/product");
const { isSignin, isAdmin } = require("../middlewares/auth");
const router = express.Router();

//products create router
router.post("/product", isSignin, isAdmin, formidable(), proCon.creat);
router.get("/allProduct", proCon.list);
router.get("/product/:slug", proCon.read);
router.get("/product/photo/:productId", proCon.photo);
router.delete("/product/remove/:productId", isSignin, isAdmin, proCon.remove);
router.post(
  "/product/update/:productId",
  isSignin,
  isAdmin,
  formidable(),
  proCon.update
);
router.post("/product/filtered-products", proCon.filteredProducts);
router.get("/product-count", proCon.productCount);
router.get("/list-products/:page", proCon.pageProducts);
router.get("/products/search/:keyword", proCon.productsSearch);
router.get("/related-products/:productId/:categoryId", proCon.relatedProduct);

//braintree payment method
router.get("/braintree/token", proCon.getToken);
router.post("/braintree/payment", isSignin, proCon.processPayment);
router.post("/order-status/:orderId", isSignin, isAdmin, proCon.orderStatus);

//module exports
module.exports = router;

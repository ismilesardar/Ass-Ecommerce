import { Badge } from "antd";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaCheck, FaDollarSign,
  FaProjectDiagram,
  FaRegClock, FaRocket, FaTimes,
  FaWarehouse
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";

const ProductView = () => {
  //something is here
  // const [cart, setCart] = useCart();
  //state
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  //react-router-dom
  const params = useParams();
  //useEffect
  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params?.slug}`);
      //   console.log(data)
      setProduct(data.Single);
      lodeRelated(data.Single._id, data.Single.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const lodeRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card md-3">
            <Badge.Ribbon text={product?.sold} color="purple">
              <Badge.Ribbon
                text={
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} in stock`
                    : "Out of stock!"
                }
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API_KEY}/product/photo/${product?._id}`}
                  alt={product?.name}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>
              <p className="card-text">{product?.description}</p>
            </div>

            <div className="d-flex p-5 lead bg-light fw-bold justify-content-between">
              <div>
                <p>
                  <FaDollarSign /> Price:{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p>
                  <FaProjectDiagram /> Category: {product?.category?.name}
                </p>
                <p>
                  <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                </p>
                <p>
                  {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}
                  {product?.quantity > 0 ? "In stock" : "Out of stock"}
                </p>
                <p>
                  <FaWarehouse /> Available: {product?.quantity - product?.sold}
                </p>
                <p>
                  <FaRocket /> Sold: {product.sold}
                </p>
              </div>
            </div>
            <button
              className="btn btn-outline-primary col card-button"
              style={{
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
              onClick={() => {
                // setCart([...cart, product]);
                // localStorage.setItem("cart",JSON.stringify([...cart, product]));
                toast.success("Add to Cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <h2>Related Product</h2>
          <hr />
          {related?.length < 1 && <p>Nothing found</p>}
          {related?.map((p) => (
            <ProductCard p={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;

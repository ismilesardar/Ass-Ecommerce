import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/card/Jumbotron";
import ProductCard from "../components/card/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    lodeMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/product-count");
      setTotal(data.Total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const lodeMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //sorting
  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  const newSorted = [];
  for (let i = 0; i < Math.round(sortedBySold.length/2); i++) {
    newSorted.push(sortedBySold[i]);
  }
  return (
    <div>
      <Jumbotron title="Home page" />

      <div className="row">
        <div className="col-md-9">
          <h4 className="pt-3 mt-2 md-2 h4 text-center bg-light">
            New Arrivals
          </h4>
          <div className="row">
            {products?.map((ele) => (
              <div className="col-md-6" key={ele._id}>
                <ProductCard p={ele} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3">
          <h4 className="pt-3 mt-2 md-2 h4 text-center bg-light">
            Best Sellers
          </h4>
          <div className="row">
            {newSorted?.map((ele) => (
              <div className="col-md-12" key={ele._id}>
                <ProductCard p={ele} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container text-center p-5">
        {products && products.length < total && (
          <button
            className="btn btn-warning btn-lg col-md-6"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
              // alert('Hello')
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;

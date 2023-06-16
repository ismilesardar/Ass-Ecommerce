import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/card/Jumbotron";
import ProductCard from "../components/card/ProductCard";
import { prices } from "../prices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //useEffect
  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/product/filtered-products", {
        checked,
        radio,
      });

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/allProduct");
      setProducts(data.All);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lodeCategories();
  }, []);

  const lodeCategories = async () => {
    try {
      const { data } = await axios.get("/categoryAll");
      // console.log(data.All)
      setCategories(data.All);
    } catch (error) {
      console.log(error);
    }
  };

  //handelChange
  const handelClick = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <>
      <Jumbotron title="Search Products" subTitle="Welcome to E-commerce" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-3 md-3 h4 bg-light text-center">
              Filter by Categories
            </h2>
            <div className="row p-2">
              {categories?.map((ele) => (
                <Checkbox
                  key={ele._id}
                  onChange={(e) => handelClick(e.target.checked, ele._id)}
                >
                  {ele.name}
                </Checkbox>
              ))}
            </div>

            <h2 className="p-2 mt-3 md-3 h4 bg-light text-center">
              Filter by Price
            </h2>
            <div className="row p-2">
              <Radio.Group onChange={(c) => setRadio(c.target.value)}>
                {prices?.map((r) => (
                  <div key={r._id} className="">
                    <Radio value={r.array}>{r.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-0">
              <button
                className="btn btn-outline-secondary col-12"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h2 className="p-2 mt-3 md-3 h4 bg-light text-center">
              {products.length} Products
            </h2>
            <div className="row">
            {products?.map((ele)=>(
                <div className="col-md-4" key={ele._id}>
                    <ProductCard p={ele} />
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

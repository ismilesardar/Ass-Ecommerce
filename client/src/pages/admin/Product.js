import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../../components/card/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminProduct = () => {
  //context
  const [auth, setAuth] = useAuth();

  //add state
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  //hook
  const navigate = useNavigate();

  useEffect(() => {
    lodeCategories();
  }, []);

  const lodeCategories = async () => {
    try {
      const { data } = await axios.get("/categoryAll");
      setCategories(data.All);
    } catch (error) {
      console.log(error);
    }
  };
  // name,description,price,category,quantity,shipping,photo

  //form handel
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      //api calling
      const { data } = await axios.post("/product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.product.name} is created"`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("product create failed. Try again..");
    }
  };
  return (
    <>
      <Jumbotron title={auth?.user?.name} subTitle="Admin Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2 m-3 md-3">
              <label className="btn btn-outline-secondary col-12 md-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 m-3 md-3"
              value={name}
              placeholder="write product name"
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 m-3 md-3"
              value={description}
              placeholder="Product description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control p-2 m-3 md-3"
              value={price}
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              bordered={false}
              size="large"
              className="form-select m-3 md-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((ele) => (
                <Option key={ele._id} value={ele._id}>
                  {ele.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select m-3 md-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              min="1"
              className="form-control p-2 m-3 md-3"
              value={quantity}
              placeholder="Enter quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button
              type="submit"
              onClick={handelSubmit}
              className="btn btn-primary md-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;

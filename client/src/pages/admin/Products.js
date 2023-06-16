import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../components/card/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminProducts = () => {
  //context
  const [auth, setAuth] = useAuth();
  //hook
  const [products, setProducts] = useState([]);
  //useEffect
  useEffect(() => {
    lodeProducts();
  }, []);
  //lode functions
  const lodeProducts = async () => {
    try {
      const { data } = await axios.get("/allProduct");
      setProducts(data.All);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(products);
  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Product</div>

            {products?.map((ele) => (
              <Link
                key={ele._id}
                to={`/dashboard/admin/product/update/${ele.slug}`}
              >
                <div className="card m-3 md-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API_KEY}/product/photo/${ele._id}`}
                        alt={ele.name}
                        className="img img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title">{ele.name}</h4>
                        <p className="card-text">{ele.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(ele.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;

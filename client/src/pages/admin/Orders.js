import { Select } from "antd";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/card/Jumbotron";
import ProductCardHorizontal from "../../components/card/ProductCardHorizontal";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/all-order");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.post(`/order-status/${orderId}`, {
        status: value,
      });
      console.log(data);
    //   debugger;
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 md-3 h4 bg-light">Orders</div>

            {orders?.map((o, i) => {
              return (
                <div
                  key={o._id}
                  className="border shadow bg-light rounded-4 mb-5"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length} products</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container">
                    <div className="row m-2">
                      {o?.products?.map((p, i) => (
                        <ProductCardHorizontal
                          key={i.toString()}
                          p={p}
                          remove={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;

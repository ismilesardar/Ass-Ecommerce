import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

const UserCartSidebar = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // console.log(auth)
  //hook
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const cartTotal = () => {
    let total = 0;
    cart?.map((item) => (total += item["price"]));

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handelBay = async () => {
    try {
      setLoading(true);
      const {nonce} = await instance.requestPaymentMethod();
      // console.log("nonce=>", nonce);
      const {data} = await axios.post('/braintree/payment',{nonce,cart});
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="col-md-4 md-5">
      <h5>Your cart summary</h5>
      <h6>Total / Address / Payments</h6>
      <hr />
      <h6>Total : {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="md-3">
            <h4>Delivery address :</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update Address
          </button>
        </>
      ) : (
        <>
          <div className="md-3">
            {auth?.token ? (
              <button
                className="btn btn-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Add delivery address
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Login to checkout
              </button>
            )}
          </div>
        </>
      )}
      <div className="mt-3">
        {!clientToken || !cart.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: { flow: "vault" },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handelBay}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCartSidebar;

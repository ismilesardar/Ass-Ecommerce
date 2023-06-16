import React from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../components/card/Jumbotron";
import ProductCardHorizontal from "../components/card/ProductCardHorizontal";
import UserCartSidebar from "../components/card/UserCartSidebar";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const Cart = () => {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  //hook
  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={auth?.token && auth?.user?.name}
        subTitle={
          cart?.length
            ? `You have ${cart?.length} item it the cart. ${
                auth?.token ? "" : "Please login to checkout"
              }`
            : "Your Cart is Empty"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-2 mt-2 md-2 h4 bg-light text-center">
              {cart?.length ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cart?.map((p,index)=>(
                <ProductCardHorizontal key={index} p={p} />
              ))}
            </div>
          </div>
          <UserCartSidebar/>
        </div>
      </div>
    </>
  );
};

export default Cart;

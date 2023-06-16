import moment from "moment";
import React from "react";
import { useCart } from "../../context/cart";

const ProductCardHorizontal = ({ p, remove = true }) => {
  const [cart, setCart] = useCart();

  const removeFormCart=(productId)=>{
    let myCart = [...cart];
    let index = myCart.findIndex((item)=> item._id === productId);
    myCart.splice(index,1);
    setCart(myCart);
    localStorage.setItem("cart",JSON.stringify(myCart));
  }

  return (
    <div className="card md-3 m-2">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API_KEY}/product/photo/${p._id}`}
            alt={p.name}
            style={{
              height: "200px",
              objectFit: "cover",
              marginLeft: "-12px",
              borderRopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {p.name}
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
            <p className="card-text">
              {`${p?.description?.substring(0, 100)}...`}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <p className="card-text">
            <small>Listed {moment(p.createdAt).fromNow()}</small>
          </p>
          {remove && (
            <p
              className="text-danger md-2 m-2 pointer"
              onClick={() => removeFormCart(p._id)}
            >
              Remove
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;

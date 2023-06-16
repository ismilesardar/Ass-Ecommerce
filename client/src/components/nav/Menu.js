import { Badge } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import Search from "../forms/SearchFrom";

const Menu = () => {
  //custom hook
  const categories = useCategory();
  //context api
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // const navigate = useNavigate();

  const handelLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    // navigate("/login");
  };

  return (
    <>
      <ul
        style={{ height: "50px" }}
        className="nav d-flex justify-content-between shadow-sm mb-2 "
      >
        <li className="nav-item">
          <NavLink to="/" aria-current="page" className="nav-link">
            HOME
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/shop" aria-current="page" className="nav-link">
            SHOP
          </NavLink>
        </li>

        <li className="nav-item m-1 mt-2">
          <Badge
            count={cart?.length >= 1 ? cart?.length : 0}
            offset={[-9, 3]}
            showZero={true}
          >
            <NavLink to="/cart" className="nav-link" aria-current="page">
              CART
            </NavLink>
          </Badge>
        </li>

        <Search />

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <NavLink
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <NavLink
                    onClick={handelLogout}
                    className="nav-link text-black"
                    to='/login'
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;

import React from "react";
import { NavLink } from "react-router-dom";
 
const UserMenu = () => {
  return (
    <>
      <div className="p-3 mt-2 md-3 h4 bg-light">User Links</div>
      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/user">
            User
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/user/profile">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/user/orders">
            Orders
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;

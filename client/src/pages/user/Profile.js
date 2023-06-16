import axios from "axios";
import React, { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import Jumbotron from "../../components/card/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth";

const UsersProfile = () => {
  //context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, address } = auth.user;
      setName(name);
      // setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/profile/update", {
        name,
        password,
        address,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        // localStorage update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Update!");
      }
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
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 md-3 h4 bg-light">Profile</div>
            <form onSubmit={handelSubmit}>
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />

              {/* <input
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}

              <input
                type="password"
                className="form-control m-2 p-2"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <textarea
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button className="btn btn-primary m-2 p-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersProfile;

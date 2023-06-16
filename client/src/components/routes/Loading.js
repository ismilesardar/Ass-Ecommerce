import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((preCount) => --preCount);
    }, 1000);

    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button className="btn border-0 fs-4" type="button" disabled>
        <span
          className="spinner-border spinner-border-md"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
  );
};

export default Loading;

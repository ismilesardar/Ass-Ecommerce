import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.get(`/products/search/${values?.keyword}`);
        setValues({...values, results:data});
        navigate('/search');
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <form className="d-flex" onSubmit={handelSubmit} >
      <input
        type="search"
        className="form-control"
        style={{ borderRadius: "0px" }}
        placeholder="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button
        type="submit"
        className="btn btn-outline-primary"
        style={{ borderRadius: "0px" }}
      >
        search
      </button>
    </form>
  );
};

export default Search;

import React from "react";

const CategoryForm = (props) => {
  const {
    value,
    setValue,
    handelSubmit,
    handelDelete,
    buttonText = "Submit",
  } = props;
  
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          className="form-control p-3"
          value={value}
          placeholder="Write category name"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary mt-3">
            {buttonText}
          </button>
          {handelDelete && (
            <button onClick={handelDelete} className="btn btn-danger mt-3">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

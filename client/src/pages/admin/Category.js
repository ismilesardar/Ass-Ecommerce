import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Jumbotron from "../../components/card/Jumbotron";
import CategoryForm from "../../components/forms/CategoryForm";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminCategory = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
// console.log(selected)
  useEffect(() => {
    lodeCategories();
  }, []);

  const lodeCategories = async () => {
    try {
      const { data } = await axios.get("/categoryAll");
      // console.log(data.All)
      setCategories(data.All);
    } catch (error) {
      console.log(error);
    }
  };

  //handel submit
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      // console.log(data)
      if (data?.error) {
        toast.error(data.error);
      } else {
        lodeCategories();
        setName("");
        toast.success(`"${data.Category.name}" is created`);
      }
    } catch (error) {
      toast.error("Create category failed. Try again.");
    }
  };
  // console.log(categories)

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`/update/${selected._id}`,{
        name: updateName
      });
      // console.log(data.Update)

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.Update.name}" is updated`);
        setSelected(null);
        setUpdateName('');
        setVisible(false);
        lodeCategories();
      }
    } catch (error) {
      toast.error('Category may already exist. Try again.')
    }
  }

  const handelDelete = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.delete(`/remove/${selected._id}`);
      console.log(data.error)

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.Delete.name}" is Delete`);
        setSelected(null);
        setVisible(false);
        lodeCategories();
      }
    } catch (error) {
      toast.error('Category may already exist. Try again.')
    }
  }

  return (
    <>
      <Jumbotron title={auth?.user?.name} subTitle="Admin Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>

            <CategoryForm
              value={name}
              setValue={setName}
              handelSubmit={handelSubmit}
            />

            <hr />

            <div className="col">
              {categories?.map((ele) => (
                <button
                  key={ele._id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(ele);
                    setUpdateName(ele.name);
                  }}
                >
                  {ele.name}
                </button>
              ))}
            </div>

            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handelSubmit={handelUpdate}
                handelDelete={handelDelete}
                buttonText="Update"
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;

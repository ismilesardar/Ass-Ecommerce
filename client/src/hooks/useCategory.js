import axios from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    lodeCategories();
  }, []);

  const lodeCategories = async () => {
    try {
      const { data } = await axios.get("/categoryAll");
      setCategories(data.All);
    } catch (error) {
      console.log(error);
    }
  };

  return categories;
};

export default useCategory;

/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//packeg required
const slugify = require("slugify");
const category = require("../models/category");
const product = require("../models/product");

//catagory scffolder
const catCont = {};
//creat catagory
catCont.creat = async (req, res) => {
  try {
    //name is catch request body
    const { name } = req.body;
    //name veledat
    if (!name.trim()) {
      return res.status(404).json({ Error: "Name is Require!" });
    }
    //cheack this name is use or not
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      return res.status(404).json({ Error: "catagory name is alrady Taken!" });
    }
    //creat catagory
    const newCategory = await new category({
      name,
      slug: slugify(name),
    }).save();
    //respons user
    res.status(201).json({ Category: newCategory });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: error });
  }
};
//update catagory
catCont.update = async (req, res) => {
  try {
    //name is catch request body
    const { name } = req.body;
    const { categoryId } = req.params;
    //creat catagory
    const newCategory = await category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    //respons user
    res.status(201).json({ Update: newCategory });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: error });
  }
};
//update catagory
catCont.remove = async (req, res) => {
  try {
    // category datete
    const revome = await category.findByIdAndDelete(req.params.categoryId);
    res.status(201).json({ Delete: revome });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: error });
  }
};
//red catagory
catCont.read = async (req, res) => {
  try {
    // category datete
    const readCat = await category.findOne({ slug: req.params.slug });
    res.status(200).json({ category: readCat });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: error });
  }
};
//get all category
catCont.list = async (req, res) => {
  try {
    // category datete
    const list = await category.find({});
    // console.log(list);
    res.status(200).json({ All: list });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: error });
  }
};
//products By Category
catCont.productsByCategory = async (req, res) => {
  try {
    // category datete
    const Catagory = await category.findOne({ slug: req.params.slug });
    // console.log(Catagory)
    const Product = await product
      .find({ category: Catagory })
      .populate("category");
    //user respons
    res.status(200).json({ Product: Product });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: error });
  }
};

//module export
module.exports = catCont;

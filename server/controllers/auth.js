/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */

//packeg Required
const customer = require("../models/customer.js");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const Order = require("../models/order.js");
//module scoffolder
const authCont = {};
//register Controller
authCont.register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, email, password, address } = req.body;
    // 2. all fields require validation
    if (!name.trim()) {
      return res.status(404).json({ error: "Name is Required!" });
    }
    if (!email.trim()) {
      return res.status(404).json({ error: "E-mail is Required!" });
    }
    if (!password.trim() || password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }
    // 3. check if email is taken
    const existingUser = await customer.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: "E-mail is allrady taken!" });
    }
    // 4. hash password
    const passwordHash = await hashPassword(password);
    // 5. register customer
    const newCustomer = await new customer({
      name,
      email,
      password: passwordHash,
      address,
    }).save();
    // 6. create signed jwt
    const token = jwt.sign({ _id: newCustomer._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    // 7. send response
    res.status(201).json({
      customer: {
        name: newCustomer.name,
        email: newCustomer.email,
        address: newCustomer.address,
        role: newCustomer.role,
      },
      Token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
//login controller
authCont.login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email.trim()) {
      return res.status(404).json({ error: "E-mail is Required!" });
    }
    if (!password.trim() || password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }
    // 3. check if email is taken
    const existingUser = await customer.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "Customer not found!" });
    }
    // 4. compare password
    const match = await comparePassword(password, existingUser.password);
    if (!match) {
      return res.status(404).json({ error: "Rong password!" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    // 7. send response
    res.status(201).json({
      Customer: {
        name: existingUser.name,
        email: existingUser.email,
        address: existingUser.address,
        role: existingUser.role,
      },
      Token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

//update profile
authCont.update = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    let { name, password, address } = req.body;
    // 2. password require validation
    if (password && password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }
    // 3. user find
    const user = await customer.findById(req.user._id);
    //password hasid
    let passwordHash = password ? hashPassword(password) : user.password;
    //update profile
    const update = await customer.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: passwordHash,
        address: address || user.address,
      },
      { new: true }
      // {password:0,role:0}
    );
    //response user
    update.password = undefined;
    res.status(201).json(update);
  } catch (error) {
    console.log(error);
  }
};

//get Product
authCont.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
}
 
authCont.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({createdAt:"-1"});
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

//module exports
module.exports = authCont;

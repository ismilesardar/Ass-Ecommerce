/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [{ type: ObjectId, ref: "products" }],
    payment: {},
    buyer: { type: ObjectId, ref: "customers" },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

let Order = mongoose.model("order", orderSchema);
module.exports = Order;
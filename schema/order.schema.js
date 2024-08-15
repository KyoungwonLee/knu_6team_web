const mongoose = require("../db_init");
const { String } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerEmail: {
      type: String,
      required: true,
    },
    buyerPhoneNum: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientAddress: {
      type: String,
      required: true,
    },
    recipientPhoneNum: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
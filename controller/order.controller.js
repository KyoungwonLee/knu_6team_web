const { createOrder } = require("../service/order.service");
const orderController = require("express").Router();

orderController.post("/", async (req, res) => {
  const {
    buyerName,
    buyerEmail,
    buyerPhoneNum,
    recipientName,
    recipientAddress,
    recipientPhoneNum,
    products,
  } = req.body;
  console.log("안녕", req.body);

  const order = {
    buyerName,
    buyerEmail,
    buyerPhoneNum,
    recipientName,
    recipientAddress,
    recipientPhoneNum,
    products,
  };
  try {
    await createOrder(order);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

module.exports = orderController;

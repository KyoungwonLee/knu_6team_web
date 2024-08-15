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
  } = req.body;
  console.log(req.body);

  const order = {
    buyerName,
    buyerEmail,
    buyerPhoneNum,
    recipientName,
    recipientAddress,
    recipientPhoneNum,
  };
  try {
    await createOrder(order);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

module.exports = orderController;

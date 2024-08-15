const Order = require("../schema/order.schema");
const User = require("../schema/user.schema");
const { getUserByEmail } = require("./user.service");

const createOrder = async (order) => {
  try {
    // user의 _id를 가져와야함
    const user = await getUserByEmail(order.buyerEmail);
    const userId = user._id;
    /**
     * order = {
     *   ...data,
     *   buyerId: userId,
     * }
     */
    const submitOrder = { ...order, buyerId: userId };
    const createdOrder = await Order.create(submitOrder);
    console.log(createdOrder);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createOrder,
};

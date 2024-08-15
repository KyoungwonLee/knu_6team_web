const Product = require("../schema/product.schema");

const getProductList = async () => {
  try {
    const productList = await Product.find();
    console.log(productList);
    return productList;
  } catch (err) {}
};

const getProduct = async (productId) => {
  try {
    const product = await Product.findOne({ productId });
    return product;
  } catch (error) {}
};
const getProductByUid = async (productId) => {
  try {
    const product = await Product.findById(productId);
    console.log(product);
    return product;
  } catch (error) {}
};

module.exports = {
  getProductList,
  getProduct,
  getProductByUid,
};

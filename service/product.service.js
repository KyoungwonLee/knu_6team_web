const Product = require("../schema/product.schema");

// 상품 리스트 받기
const getProductList = async () => {
  try {
    const productList = await Product.find();
    console.log(productList);
    return productList;
  } catch (err) {}
};

// 상품 1개 받기
// 인자로 Id를 받아서 찾아냄
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

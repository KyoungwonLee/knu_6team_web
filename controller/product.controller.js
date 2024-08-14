const { getProductList, getProduct } = require("../service/product.service");

const productController = require("express").Router();

// const dummyData = Array.from({ length: 30 }, (_, index) => {
//   const product = {

//     title: `product-title-${index + 1}`,
//     description: `product-description-${index + 1}`,
//     imgUrl: `https://picsum.photos/id/${index + 1}/200/300`,
//     price: Math.floor(Math.random() * 90000 + 10000),
//     stock: Math.ceil(Math.random() * 100),
//   };
//   return product;
// });

productController.get("/",async (req, res) => {
  //상품 전체 조회, 가져온 데이터를 res.json에 싫어 클라이어트로 보낸다.
  try{
    const productList  = await getProductList();

  return res.json({ result: true, data: productList });

  }catch(err){

  }
  
});
productController.get("/detail/:id",async (req,res)=>{
  try{
    const productId = req.params.id;
    console.log({productId})
    const product = await getProduct(productId);

  return res.json({ result: true, data: product });
  }catch(err){

  }
  
})


module.exports = productController;

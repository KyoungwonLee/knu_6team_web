const buyerName = document.getElementById("buyer_name");
const buyerEmail = document.getElementById("buyer_email");
const buyerPhoneNum = document.getElementById("buyer_phoneNum");
const recipientName = document.getElementById("recipient_name");
const recipientAddress = document.getElementById("recipient_address");
const recipientPhoneNum = document.getElementById("recipient_phoneNum");
const btn = document.createElement("button");
const orderButton = document.getElementById("order_button");
const totPrice = document.createElement("div");
// cart에 담긴 상품 id 추출
const product = JSON.parse(localStorage.getItem("products")) || [];

console.log(product);
const productIdList = product.map((prod) => prod._id);

const fetchProductById = async (productIdList) => {
  const productDataList = [];
  for (const productId of productIdList) {
    try {
      const response = await fetch(`/api/product/detail-by-uid/${productId}`);

      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log("ddddd", result.data); ///여기까지 작동됨
        productDataList.push(result.data);

        // return productDataList; // productDataList.push(product);
      } else {
        console.error("상품 정보를 불러올 수 없습니다.");
        return null;
      }
    } catch (error) {
      console.error("에러 발생:", error);
      return null;
    }
  }
  console.log("productDataList", productDataList);
  return productDataList;
};

const productWrapper = document.getElementById("product-wrapper");
renderProduct = async () => {
  // productIdList
  const v = JSON.parse(localStorage.getItem("products")) || [];
  let totalPrice = 0;
  btn.setAttribute("id", "id");
  btn.innerHTML = "결제하기";

  if (!v) {
    alert("(!)상품 정보를 불러올 수 없습니다.");
    return null;
  } else {
    v.forEach((e) => {
      const itemElem = document.createElement("div");
      totalPrice += e.price * e.orderCount;
      itemElem.innerHTML = `
            <div>${e.title}</div>
            <div>[가격]: ${e.price.toLocaleString()}</div>
            <div>[수량]: ${e.orderCount}</div>
            <div>[상세설명]: ${e.description}</div>
            <div>[총 가격]: ${(e.price * e.orderCount).toLocaleString()}</div>
            `;

      productWrapper.append(itemElem);
    });
  }
  const buydiv = document.createElement("div");
  buydiv.setAttribute("id", "fixed-footer");
  totPrice.setAttribute("id", "price");
  totPrice.innerHTML = `총 금액  ${totalPrice.toLocaleString()}`;
  btn.setAttribute("id", "buy_btn");
  btn.innerHTML = "결제하기";
  buydiv.append(totPrice);
  buydiv.append(btn);

  productWrapper.append(buydiv);
};
renderProduct();
//여기

btn.addEventListener("click", async () => {
  const localProductInfoList = JSON.parse(localStorage.getItem("products"));

  console.log("localProductInfoList", localProductInfoList);

  const productInfoList = localProductInfoList.map((value) => ({
    id: value.productId,
    quantity: value.orderCount,
    total_price: value.price * value.orderCount,
  }));

  const order = {
    buyerName: buyerName.value,
    buyerEmail: buyerEmail.value,
    buyerPhoneNum: buyerPhoneNum.value,
    recipientName: recipientName.value,
    recipientAddress: recipientAddress.value,
    recipientPhoneNum: recipientPhoneNum.value,
    products: productInfoList,
  };

  try {
    const orderResult = await fetch("/api/order/", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // http status code === 2XX
    if (orderResult.ok) {
      alert("결제 성공");

      window.location.href = "/";
    } else {
      alert("(!)결제 실패");
    }
  } catch (err) {
    console.error(err);
  }
});

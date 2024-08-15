const buyerName = document.getElementById("buyer_name");
const buyerEmail = document.getElementById("buyer_email");
const buyerPhoneNum = document.getElementById("buyer_phoneNum");
const recipientName = document.getElementById("recipient_name");
const recipientAddress = document.getElementById("recipient_address");
const recipientPhoneNum = document.getElementById("recipient_phoneNum");

const orderButton = document.getElementById("order_button");
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
  const v = await fetchProductById(productIdList);

  const btn = document.createElement("button");
  btn.setAttribute("id", "id");
  btn.innerHTML = "결제하기";
  btn.addEventListener("click", async () => {
    const order = {
      buyerName: buyerName.value,
      buyerEmail: buyerEmail.value,
      buyerPhoneNum: buyerPhoneNum.value,
      recipientName: recipientName.value,
      recipientAddress: recipientAddress.value,
      recipientPhoneNum: recipientPhoneNum.value,
    };
    console.log(order);
    try {
      const orderResult = await fetch("/api/order/", {
        method: "post",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (orderResult.ok) {
        alert("결제 성공");
      } else {
        alert("(!)결제 실패");
      }
    } catch (err) {
      console.error(err);
    }
  });
  if (!v) {
    alert("(!)상품 정보를 불러올 수 없습니다.");
    return null;
  } else {
    v.forEach((e) => {
      const itemElem = document.createElement("div");
      itemElem.innerHTML = `
            <div>${e.title}</div>
            <img src="${e.imgUrl}"/>
            <div>[가격]: ${e.price}</div>
            <div>[상세설명]: ${e.description}</div>
            `;

      productWrapper.append(itemElem);
    });
  }
  productWrapper.append(btn);
};
renderProduct();
//여기

orderButton.addEventListener("click", async () => {
  const order = {
    buyerName: buyerName.value,
    buyerEmail: buyerEmail.value,
    buyerPhoneNum: buyerPhoneNum.value,
    recipientName: recipientName.value,
    recipientAddress: recipientAddress.value,
    recipientPhoneNum: recipientPhoneNum.value,
  };
  console.log(order);
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
    } else {
      alert("(!)결제 실패");
    }
  } catch (err) {
    console.error(err);
  }
});

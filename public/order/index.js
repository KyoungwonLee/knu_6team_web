const buyerName = document.getElementById("buyer_name");
const buyerEmail = document.getElementById("buyer_email");
const buyerPhoneNum = document.getElementById("buyer_phoneNum");
const recipientName = document.getElementById("recipient_name");
const recipientAddress = document.getElementById("recipient_address");
const recipientPhoneNum = document.getElementById("recipient_phoneNum");

const orderButton = document.getElementById("order_button");
// cart에 담긴 상품 id 추출
const storedProduct = localStorage.getItem("products");
const product = JSON.parse(storedProduct) || [];
console.log(product);
const productIdList = product.map((prod) => prod._id);

const productDataList = [];
for (const productId of productIdList) {
  async function fetchProductById(productId) {
    try {
      const response = await fetch(`/api/product/${productId}`);
      if (response.ok) {
        const product = await response.json();
        return product; // productDataList.push(product);
      } else {
        console.error("상품 정보를 불러올 수 없습니다.");
        return null;
      }
    } catch (error) {
      console.error("에러 발생:", error);
      return null;
    }
  }
}

productDataList.forEach((prod) => {
  // prod rednering
});
// fetchProductById(productId)
//

const productWrapper = document.getElementById("product-wrapper");
renderProduct = async () => {
  // productIdList
  const v = await fetchProductById(productId);

  if (!v) {
    alert("(!)상품 정보를 불러올 수 없습니다.");
    return null;
  } else {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `
            <div>${v.title}</div>
            <div>[가격]: ${v.price}</div>
            <div>[상세설명]: ${v.description}</div>
            `;
    productWrapper.appendChild(itemElem);
  }
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
    if (orderResult.ok) {
      alert("결제 성공");
    } else {
      alert("(!)결제 실패");
    }
  } catch (err) {
    console.error(err);
  }
});

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const id = params.get("id");

const inputTag = document.createElement("input");
inputTag.setAttribute("type", "number");
inputTag.setAttribute("id", "order-count-input");
// let cartList = [];
// document.getElementById("buy").onclick = function (){
//   window.location.href = "/cart";
// }
// document.getElementById("cart").onclick = function (){
//   alert("장바구니에 담겼습니다.");
// }

const fetchProduct = async (id) => {
  try {
    const fetchResult = await fetch(`/api/product/detail/${id}`);

    if (fetchResult.ok) {
      const result = await fetchResult.json();
      const product = result.data;
      return product;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const productWrapper = document.getElementById("product-wrapper");

renderProduct = async () => {
  const v = await fetchProduct(id);

  if (!v) {
    alert("(!)상품 정보를 불러올 수 없습니다.");
    return null;
  } else {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `
            <div>${v.title}</div>
            <div>
                <img src="${v.imgUrl}"/>
            </div>
            <div>[가격]: ${v.price}</div>
            <div>[상세설명]: ${v.description}</div>
            <div>[재고]: ${v.stock}</div>
                
            `;
    // <button id="cart" onclick="alert('장바구니에 담겼습니다.')">장바구니</button>
    const cartButtonElem = document.createElement("button");
    cartButtonElem.innerHTML = "장바구니";
    cartButtonElem.onclick = () => {
      const orderCount = parseInt(
        document.getElementById("order-count-input").value,
        10
      );
      let cartList = JSON.parse(localStorage.getItem("products")) || [];

      const duplicatedIndex = cartList.findIndex(
        (cart) => cart.productId === v.productId
      );
      // 있으면 0 이상
      // 없으면 -1

      // []
      // {}
      //중복 확인
      if (duplicatedIndex >= 0) {
        cartList.forEach((e) => {
          if (e.productId === v.productId) {
            let sum = e.orderCount + orderCount;
            if (sum > v.stock) {
              alert("재고를 초과했습니다.");
            } else {
              e.orderCount += orderCount;
              alert("장바구니에 담겼습니다.");
            }
          }
        });
      } else {
        cartList.push({ ...v, orderCount: Number(orderCount) });
        alert("장바구니에 담겼습니다.");
      }

      localStorage.setItem("products", JSON.stringify(cartList));
    };

    const buyButtonElem = document.createElement("button");
    buyButtonElem.innerHTML = "구매하기";
    buyButtonElem.onclick = () => {
      window.location.href = "/cart";
    };
    const labelTag = document.createElement("label");
    labelTag.innerHTML = "구매수량";

    inputTag.addEventListener("input", (e) => {
      const value = parseInt(inputTag.value, 10);

      // 값이 숫자인지 확인하고 유효한 범위로 제한합니다.
      if (isNaN(value) || value < 0) {
        inputTag.value = 0;
      } else if (value > v.stock) {
        inputTag.value = v.stock;
      }
    });

    const brTag = document.createElement("br");
    itemElem.append(labelTag);
    itemElem.append(inputTag);
    itemElem.append(brTag);
    itemElem.append(cartButtonElem);
    itemElem.append(buyButtonElem);
    productWrapper.append(itemElem);
  }
};

renderProduct();

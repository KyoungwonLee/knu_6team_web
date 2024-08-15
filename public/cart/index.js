const cartItems = localStorage.getItem("products");
// const items = JSON.parse(cartItems); //파싱
let cartList_ = JSON.parse(localStorage.getItem("products")) || [];
const totPrice = document.createElement("div");
const fetchCartList = async () => {
  try {
    const fetchResult = await fetch("/api/product/cart", {
      method: "post",
      body: cartItems,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fetchResult.ok) {
      return fetchResult.json(); //리스트만 리턴됨
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
const cartListWrapper = document.getElementById("cart-list-wrapper");
const renderCartList = async () => {
  const cartList = await fetchCartList(); //리스트
  if (!cartList || cartList.length === 0) {
    console.log("empty cartList");
    return;
  }
  cartList.data.forEach((v, index) => {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `
          <div>
            <a href="../product/detail?id=${v.productId}">${v.title}</a>
          </div>
          <div>
              <img src="${v.imgUrl}"/>
          </div>
          <div>[상세설명]: ${v.description}</div>
          <div>[가격]: ${v.price}</div>
          <div>[재고]: ${v.stock}</div>
      `;

    const remove = document.createElement("button");
    remove.setAttribute("id", `btn-${v.productId}`);
    remove.addEventListener("click", () => {
      console.log("index");
      removeFromCart(index);
      totPrice.innerHTML = `총 금액 = ${totalPrice(c)}`;
    });
    remove.innerHTML = "삭제";
    const countInputElem = document.createElement("input");
    const countLabel = document.createElement("label");
    countLabel.innerHTML = "수량";
    countInputElem.setAttribute("id", `count-${v.productId}`);
    countInputElem.setAttribute("type", "number");
    countInputElem.setAttribute("data-index", index);
    countInputElem.setAttribute("min", 1);
    countInputElem.setAttribute("max", v.stock);
    countInputElem.setAttribute("value", v.orderCount);

    countInputElem.addEventListener("input", (e) => {
      if (e.target.value > v.stock) {
        e.target.value = v.stock;
      }
      setPrice(v.productId);
      setTotal(v.productId);
      totPrice.innerHTML = `총 금액 = ${totalPrice()}`;
    });
    const priceElem = document.createElement("div");
    priceElem.innerHTML = `[가격합계]: ${v.price * v.orderCount}`;
    priceElem.setAttribute("id", `price-${v.productId}`);

    itemElem.append(priceElem);
    itemElem.append(countLabel);
    itemElem.append(countInputElem);

    itemElem.append(remove);

    cartListWrapper.append(itemElem);
  });

  totPrice.setAttribute("id", "price");
  totPrice.innerHTML = `총 금액 = ${totalPrice()}`;
  cartListWrapper.append(totPrice);
};

function totalPrice() {
  let cartList_ = JSON.parse(localStorage.getItem("products")) || [];
  let totalPrice = 0;
  cartList_.forEach((e) => {
    totalPrice += e.price * e.orderCount;
  });

  return totalPrice;
}
function setTotal(id) {
  let List = JSON.parse(localStorage.getItem("products")) || [];
  List.forEach((e) => {
    if (e.productId === id) {
      document.getElementById(`price-${id}`).innerHTML = `[가격합계]: ${
        e.orderCount * e.price
      }`;
    }
  });
}

function setPrice(id) {
  console.log(id);
  let List = JSON.parse(localStorage.getItem("products")) || [];
  List.forEach((e) => {
    if (e.productId === id) {
      e.orderCount = parseInt(document.getElementById(`count-${id}`).value, 10);
    }
  });
  localStorage.setItem("products", JSON.stringify(List));
}

function removeFromCart(index) {
  // 로컬 스토리지에서 장바구니 정보를 가져옴
  let cartList = JSON.parse(localStorage.getItem("products")) || [];

  // 해당 인덱스의 상품을 제거
  cartList.splice(index, 1);

  // 변경된 장바구니 정보를 로컬 스토리지에 다시 저장
  localStorage.setItem("products", JSON.stringify(cartList));

  // 페이지 새로고침하여 변경 사항 반영
  location.reload();
}

renderCartList();

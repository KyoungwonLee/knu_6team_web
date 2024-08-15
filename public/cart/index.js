const cartItems = localStorage.getItem("products");
// const items = JSON.parse(cartItems); //파싱

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
          <div>[가격]: ${v.price}</div>
          <div>[상세설명]: ${v.description}</div>
          <div>[재고]: ${v.stock}</div>
          <button onclick="removeFromCart(${index})">삭제</button>
      `;
    cartListWrapper.append(itemElem);
  });
};

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

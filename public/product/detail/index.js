const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const id = params.get("id");

const fetchProduct = async (id) => {
  try {
    const fetchResult = await fetch(`/api/product/detail/${id}`);
    if (fetchResult.ok) {
      const result = await fetchResult.json();
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const productWrapper = document.getElementById("product-wrapper");

const renderProduct = async () => {
  const product = await fetchProduct(id);
  if (!product) {
    alert("(!)상품 정보를 불러올 수 없습니다.");
    return;
  }

  const itemElem = document.createElement("div");
  itemElem.id = "product-details";

  itemElem.innerHTML = `
    <h2>${product.title}</h2>
    <div class="price">가격: ${product.price}</div>
    <div class="description">상세설명: ${product.description}</div>
    <div class="stock">재고: ${product.stock}</div>
    <div class="button-container">
      <label for="quantity">구매수량:</label>
      <input id="quantity" type="number" min="1" max="${product.stock}" value="1" />
      <button class="product-button" id="cart">장바구니</button>
      <button class="product-button" id="buy">구매하기</button>
    </div>
  `;

  const imgElem = document.createElement("img");
  imgElem.src = product.imgUrl;
  imgElem.alt = product.title;

  productWrapper.innerHTML = ""; // Clear existing content
  productWrapper.append(imgElem);
  productWrapper.append(itemElem);

  // Event listeners for buttons
  itemElem.querySelector("#cart").onclick = () => {
    alert("장바구니에 담겼습니다.");
  };
  itemElem.querySelector("#buy").onclick = () => {
    window.location.href = "/cart";
  };
};

renderProduct();

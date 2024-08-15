const fetchProductList = async () => {
  try {
    const fetchResult = await fetch("/api/product", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fetchResult.ok) {
      const result = await fetchResult.json();
      return result.data; //리스트만 리턴됨
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const productListWrapper = document.getElementById("product-list-wrapper");
const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }
  productList.forEach((v) => {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `
    <h2 class="title">${v.title}</h2>
    <div>
        <a href="./detail?id=${v.productId}"><img src="${v.imgUrl}"/></a>
    </div>
    <div class="price">[가격]: ${v.price}</div>
    <div class="description">[상세설명]: ${v.description}</div>
    <div class="stock">[재고]: ${v.stock}</div>
    `;
    productListWrapper.append(itemElem);
  });
};

renderProductList();

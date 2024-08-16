// Fetch product list from the server
const fetchProductList = async () => {
  try {
    const fetchResult = await fetch("/api/product", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fetchResult.ok) {
      const result = await fetchResult.json();
      return result.data; // Return only the product list
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Load the product list for displaying in the cart summary
const loadProductList = () => {
  return JSON.parse(localStorage.getItem("productList")) || [];
};

// Render the product list and add to cart functionality
const productListWrapper = document.getElementById("product-list-wrapper");

const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    return;
  }

  // Save product list to local storage for cart summary

  productList.forEach((product) => {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `
      <h2 class="title">${product.title}</h2>
      <div>
        <a href="./detail?id=${product.productId}">
          <img src="${product.imgUrl}" alt="${product.title}"/>
        </a>
      </div>
      <div class="price">[가격]: ${product.price}</div>
      <div class="description">[상세설명]: ${product.description}</div>
      <div class="stock">[재고]: ${product.stock}</div>
      <div>
        
      </div>
    `;
    productListWrapper.append(itemElem);

    // Add event listener to the "Add to Cart" button
  });
};

// Initialize the page with product list rendering
renderProductList();

// Add event listener to the "Checkout" button

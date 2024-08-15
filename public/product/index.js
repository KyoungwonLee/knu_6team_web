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

// Save the cart to local storage
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Load the cart from local storage
const loadCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Add an item to the cart
const addToCart = (productId, quantity) => {
  let cart = loadCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingItemIndex !== -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item if it does not exist
    cart.push({ productId, quantity });
  }

  saveCart(cart);
};

// Display the cart summary
const displayCartSummary = () => {
  const cart = loadCart();
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>장바구니에 담긴 물건이 없습니다.</li>";
    return;
  }

  // Fetch product details for cart summary
  const productList = loadProductList();
  cart.forEach((cartItem) => {
    const product = productList.find((p) => p.productId === cartItem.productId);
    if (product) {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.title} - 수량: ${cartItem.quantity}`;
      cartItems.appendChild(listItem);
    }
  });

  // Show the cart summary
  document.getElementById("cart-summary").style.display = "block";
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
    console.log("empty productList");
    return;
  }

  // Save product list to local storage for cart summary
  localStorage.setItem("productList", JSON.stringify(productList));

  productList.forEach((product) => {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `
      <div>${product.title}</div>
      <div>
        <a href="./detail?id=${product.productId}">
          <img src="${product.imgUrl}" alt="${product.title}"/>
        </a>
      </div>
      <div>[가격]: ${product.price}</div>
      <div>[상세설명]: ${product.description}</div>
      <div>[재고]: ${product.stock}</div>
      <div>
        <input type="number" id="quantity-${product.productId}" min="1" value="1" />
        <button id="add-to-cart-${product.productId}">장바구니에 추가</button>
      </div>
    `;
    productListWrapper.append(itemElem);

    // Add event listener to the "Add to Cart" button
    const addToCartButton = document.getElementById(
      `add-to-cart-${product.productId}`
    );
    addToCartButton.addEventListener("click", () => {
      const quantityInput = document.getElementById(
        `quantity-${product.productId}`
      );
      const quantity = parseInt(quantityInput.value, 10);
      if (quantity > 0) {
        addToCart(product.productId, quantity);
        alert(`${product.title} has been added to the cart.`);
      } else {
        alert("Please enter a valid quantity.");
      }
    });
  });
};

// Initialize the page with product list rendering
renderProductList();

// Add event listener to the "Checkout" button
document
  .getElementById("checkout-button")
  .addEventListener("click", displayCartSummary);

// Add event listener to the "Close" button in the cart summary
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-summary").style.display = "none";
});

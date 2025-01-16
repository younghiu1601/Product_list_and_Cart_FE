// Array to store cart items
let cartItems = [];

// Function to add an item to the cart
function addToCart(productName, price) {
  // Check if item is already in the cart
  const existingItem = cartItems.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if item already exists
  } else {
    // Add a new item to the cart
    cartItems.push({ name: productName, price: price, quantity: 1 });
  }

  updateCart(); // Update the cart display
}

// Function to update the cart display
function updateCart() {
  const cartElement = document.querySelector(".cart");
  const cartCount = document.querySelector(".cart h2");
  const cartList = document.createElement("ul");

  // Clear current cart display
  cartElement.innerHTML = `
    <h2>Your Cart (${cartItems.length})</h2>
    <p>Your added items will appear here</p>
  `;

  // If cart is empty, show placeholder
  if (cartItems.length === 0) {
    const cartPlaceholder = document.createElement("img");
    cartPlaceholder.src = "./assets/images/image-cart-placeholder.jpg";
    cartPlaceholder.alt = "Cart placeholder";
    cartElement.appendChild(cartPlaceholder);
    return;
  }

  // Generate the list of items in the cart
  cartItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartList.appendChild(listItem);
  });

  // Append cart items to the cart section
  cartElement.appendChild(cartList);

  // Calculate and display the total price
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = document.createElement("p");
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
  cartElement.appendChild(totalPrice);
}

// Function to handle button clicks
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-button");

  buttons.forEach(button => {
    button.addEventListener("click", event => {
      const productItem = event.target.closest(".product-item");
      const productName = productItem.querySelector("h2").textContent;
      const productPrice = parseFloat(productItem.querySelector(".product-info p:last-child").textContent.replace("$", ""));

      addToCart(productName, productPrice); // Add product to the cart
    });
  });
}

// Initialize the script when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  setupAddToCartButtons();
});

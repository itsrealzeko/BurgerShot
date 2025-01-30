// script.js
const cartItems = [];
let total = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const menuItem = button.parentElement;
    const itemName = menuItem.getAttribute('data-name');
    const itemPrice = parseFloat(menuItem.getAttribute('data-price'));

    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const discountToggle = document.getElementById('discount-toggle').checked;

  // Clear the cart list
  cartList.innerHTML = '';

  // Update cart items and total
  total = 0;
  cartItems.forEach((item, index) => {
    let price = item.price;

    // Apply discount for Royal Meal if toggle is ON or quantity > 10
    if (
      item.name === "Heart Stopper & Watermelon Slushie" &&
      (discountToggle || item.quantity > 9)
    ) {
      price = 500; // Discounted price
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <span>$${(price * item.quantity).toFixed(2)}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartList.appendChild(li);
    total += price * item.quantity;
  });

  // Update total
  totalElement.textContent = total.toFixed(2);
}

function updateQuantity(index, newQuantity) {
  const quantity = parseInt(newQuantity, 10);
  if (quantity > 0) {
    cartItems[index].quantity = quantity;
    updateCart();
  }
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function increaseQuantity(index) {
  cartItems[index].quantity += 1;
  updateCart();
}

function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    updateCart();
}}

// Add event listener for discount toggle
document.getElementById('discount-toggle').addEventListener('change', updateCart);
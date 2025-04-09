// Go Back to the Previous Page
function goBack() {
  window.history.back();
}

// Load Order Summary
function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('plantzo_cart')) || []; // Retrieve full cart
  const selectedItems = JSON.parse(localStorage.getItem('selected_cart_items')) || []; // Retrieve selected items
  const orderSummaryContainer = document.getElementById("order-summary");
  const orderTotalContainer = document.getElementById("order-total");

  // Handle case where no selected items are found or cart is empty
  if (!selectedItems.length || !cart.length) {
      orderSummaryContainer.innerHTML = "<p>Your cart is empty or no items were selected. Please go back and add/select items.</p>";
      orderTotalContainer.innerHTML = "";
      return;
  }

  orderSummaryContainer.innerHTML = ""; // Clear existing content
  let totalPrice = 0;

  selectedItems.forEach(itemId => {
      // Match selected item IDs with items in the cart
      const item = cart.find(cartItem => cartItem.id === itemId); // Compare `itemId` with cart `id`
      if (item) {
          const itemElement = document.createElement("div");
          itemElement.innerHTML = `
              <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
          `;
          orderSummaryContainer.appendChild(itemElement);

          totalPrice += item.price * item.quantity;
      } else {
          console.warn(`Selected item ${itemId} not found in cart!`);
      }
  });

  orderTotalContainer.innerHTML = `<p>Total: ₹${totalPrice.toFixed(2)}</p>`;
}
// Load order summary when page is ready
document.addEventListener("DOMContentLoaded", loadOrderSummary);

// Place Order Function
function placeOrder() {
  const form = document.getElementById("checkout-form");

  // Field Inputs
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address1 = document.getElementById("address1").value.trim();
  const address2 = document.getElementById("address2").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked');

  // Validation Rules
  if (!name || !/^[A-Za-z\s]{3,50}$/.test(name)) {
      alert("Please enter a valid name (only alphabets, min 3 characters).");
      return;
  }

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.");
      return;
  }

  if (!address1 || address1.length < 5) {
      alert("Address Line 1 must be at least 5 characters long.");
      return;
  }

  if (!address2 || address2.length < 5) {
      alert("Address Line 2 must be at least 5 characters long.");
      return;
  }

  if (!pincode || !/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
  }

  if (!city || !/^[A-Za-z\s]+$/.test(city)) {
      alert("Please enter a valid city (only alphabets allowed).");
      return;
  }

  if (!state || !/^[A-Za-z\s]+$/.test(state)) {
      alert("Please enter a valid state (only alphabets allowed).");
      return;
  }

  if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
  }

  // If all validations pass
  const fullAddress = `${address1}, ${address2}, ${city}, ${state}, ${pincode}`;
  const orderData = {
      name,
      phone,
      address: fullAddress,
      paymentMethod: paymentMethod.value,
  };

  console.log("Order placed:", orderData); // For debugging
  alert("Order placed successfully!"); // Success message
}

// Load order summary when the page is ready
document.addEventListener("DOMContentLoaded", loadOrderSummary);

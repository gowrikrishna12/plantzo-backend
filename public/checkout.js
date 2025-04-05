// checkout.js
function goBack() {
    window.history.back();
  }
  
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

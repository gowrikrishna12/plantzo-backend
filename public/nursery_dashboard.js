// JavaScript Code for Partner Dashboard Functionality
const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm");
const logoutButton = document.getElementById("logoutButton");

// Load Products for Partner
const loadProducts = async () => {
  const token = localStorage.getItem("token");


  try {
    const res = await fetch("/api/products/by-partner", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { success, data } = await res.json();
    if (success) {
      productList.innerHTML = data.map(product => `
        <div class="product-card">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Category: ${product.category}</p>
          <p>${product.description || "No description available"}</p>
        </div>
      `).join("");
    } else {
      productList.innerHTML = `<p>No products found!</p>`;
    }
  } catch (error) {
    productList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
  }
};

// Add New Product
addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first!");
    window.location.href = "/login.html";
    return;
  }

  const product = {
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    stock: document.getElementById("productStock").value,
    category: document.getElementById("productCategory").value,
    description: document.getElementById("productDescription").value,
    image: document.getElementById("productImage").value || "/images/default.png",
  };

  try {
    const res = await fetch("/api/products/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    const { success, data } = await res.json();
    if (success) {
      alert("Product added successfully!");
      loadProducts(); // Reload products
      addProductForm.reset(); // Clear the form
    } else {
      alert("Failed to add product!");
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// Logout Functionality
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts);
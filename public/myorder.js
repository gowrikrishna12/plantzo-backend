const ordersList = document.getElementById('orders-list');

async function renderOrders() {
    try {
        const response = await fetch("/api/admin/orders");
        const result = await response.json();

        if (response.ok && result.success) {
            const orders = result.data;

            ordersList.innerHTML = ""; // Clear existing content

            orders.forEach(order => {
                const orderCard = document.createElement("div");
                orderCard.className = "order-card";

                // Render items with names and images
                const itemsHTML = order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image || 'default-image.jpg'}" alt="${item.productName}" class="item-image" />
                        <p>${item.productName}</p>
                    </div>
                `).join("");

                // Add status and rating functionality
                orderCard.innerHTML = `
                    <h3>Order ID: ${order.orderId}</h3>
                    <div class="order-details">
                        <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total Price:</strong> ₹${order.totalAmount}</p>
                        <p><strong>Items:</strong> ${order.items.length}</p>
                        <div class="order-items">${itemsHTML}</div>
                        <p class="order-status ${order.status.toLowerCase()}">
                            <strong>Status:</strong> ${order.status}
                        </p>
                    </div>
                `;

                // If status is "Delivered", add rating functionality
                if (order.status === "Delivered") {
                    const ratingForm = document.createElement("div");
                    ratingForm.className = "rating-form";
                    ratingForm.innerHTML = `
                        <label for="rating-${order.orderId}">Rate Your Order:</label>
                        <select id="rating-${order.orderId}" class="rating-select">
                            <option value="" disabled selected>Select rating</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                        <button class="btn submit-rating-btn" data-order-id="${order.orderId}">Submit Rating</button>
                    `;

                    orderCard.appendChild(ratingForm);
                }

                ordersList.appendChild(orderCard);
            });

            // Add event listeners to handle rating submission
            document.querySelectorAll(".submit-rating-btn").forEach(button => {
                button.addEventListener("click", async event => {
                    const orderId = event.target.getAttribute("data-order-id");
                    const ratingSelect = document.getElementById(`rating-${orderId}`);
                    const rating = ratingSelect.value;

                    if (!rating) {
                        alert("Please select a rating before submitting!");
                        return;
                    }

                    try {
                        const ratingResponse = await fetch(`/api/admin/orders/${orderId}/rating`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ rating: parseInt(rating) })
                        });

                        const ratingResult = await ratingResponse.json();

                        if (ratingResponse.ok) {
                            alert("Thank you for your feedback!");
                            renderOrders(); // Refresh orders after submitting rating
                        } else {
                            alert("An error occurred while submitting your rating: " + ratingResult.message);
                        }
                    } catch (error) {
                        alert("An error occurred: " + error.message);
                        console.error("Error submitting rating:", error);
                    }
                });
            });
        } else {
            console.error("Error fetching orders:", result.message);
            ordersList.innerHTML = "<p>Error loading orders. Please try again later.</p>";
        }
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        ordersList.innerHTML = "<p>Error loading orders. Please try again later.</p>";
    }
}

// Back button functionality
document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = "landing.html";
});

// Render orders on page load
renderOrders();
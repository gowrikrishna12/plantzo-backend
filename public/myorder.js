const orders = [
    { id: 1, date: '2025-04-08', total: 500, items: 3, status: 'Pending' },
    { id: 2, date: '2025-04-07', total: 750, items: 5, status: 'Shipped' },
  ];
  
  const ordersList = document.getElementById('orders-list');
  
  function renderOrders() {
    ordersList.innerHTML = '';
  
    orders.forEach(order => {
      const orderCard = document.createElement('div');
      orderCard.className = 'order-card';
  
      orderCard.innerHTML = `
        <h3>Order ID: ${order.id}</h3>
        <div class="order-details">
          <p><strong>Order Date:</strong> ${order.date}</p>
          <p><strong>Total Price:</strong> ₹${order.total}</p>
          <p><strong>Items:</strong> ${order.items}</p>
          <p class="order-status ${order.status.toLowerCase()}">
            <strong>Status:</strong> ${order.status}
          </p>
        </div>
      `;
  
      ordersList.appendChild(orderCard);
    });
  }
  
  // Back button functionality
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = "landing.html";

  });
  
  // Render orders on page load
  renderOrders();
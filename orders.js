// orders.js

function calculateOrderStatus(orderTimestamp) {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const elapsedDays = (now - orderTimestamp) / ONE_DAY;

    if (elapsedDays < 1) {
        return { status: 'Processing', color: '#f39c12', width: '33%' };
    } else if (elapsedDays >= 1 && elapsedDays < 5) {
        return { status: 'Shipped', color: '#3498db', width: '66%' };
    } else {
        return { status: 'Delivered', color: '#2ecc71', width: '100%' };
    }
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Reverse orders to show newest first
    orders.reverse();

    if (orders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; background: #fff; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                <i class="fa fa-shopping-bag" style="font-size: 60px; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #555;">No Orders Yet</h3>
                <p style="color: #777; margin-bottom: 20px;">You haven't placed any orders. Start exploring our products!</p>
                <a href="product.html" class="btn">Browse Products</a>
            </div>
        `;
        return;
    }

    let html = '';

    orders.forEach(order => {
        let statusObj = calculateOrderStatus(order.orderTimestamp);
        
        let productsHtml = order.items.map(item => `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; padding: 10px; background: #f9f9f9; border-radius: 6px;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; border-radius: 4px;">
                <div style="flex: 1;">
                    <p style="margin: 0; font-size: 14px; font-weight: 500; color: #555;">${item.name}</p>
                    <small style="color: #777;">Qty: ${item.quantity}  •  ₹${item.price}</small>
                </div>
            </div>
        `).join('');

        html += `
            <div class="order-card" style="background: #fff; border-radius: 10px; padding: 25px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: transform 0.3s; border-left: 5px solid ${statusObj.color};">
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                    <div>
                        <h4 style="margin: 0; color: #333;">Order ${order.orderId}</h4>
                        <small style="color: #777;">Placed: ${order.date}</small>
                    </div>
                    <div style="text-align: right;">
                        <h4 style="margin: 0; color: #ff523b;">₹${order.total.toFixed(2)}</h4>
                        <small style="color: #777;">Paid via ${order.paymentMethod}</small>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-weight: 600; background: ${statusObj.color}; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${statusObj.status}</span>
                        <span style="font-size: 13px; color: #555;"><i class="fa fa-truck"></i> Est. Delivery: ${order.deliveryDate}</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: #eee; border-radius: 10px; overflow: hidden;">
                        <div style="height: 100%; width: ${statusObj.width}; background: ${statusObj.color}; border-radius: 10px; transition: width 1s ease-in-out;"></div>
                    </div>
                </div>

                <div>
                    <h5 style="margin-bottom: 10px; color: #555;">Items:</h5>
                    ${productsHtml}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.includes('my-orders.html')) {
        renderOrders();
    }
});

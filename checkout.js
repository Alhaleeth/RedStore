// checkout.js

// Handle payment method toggles
function togglePaymentMethod(method) {
    // Hide all forms first
    document.getElementById('card-details').style.display = 'none';
    document.getElementById('upi-details').style.display = 'none';

    // Remove active class from all options
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
    
    // Set selected active
    document.getElementById('opt-' + method).classList.add('active');
    
    // Show respective form
    if (method === 'card') {
        document.getElementById('card-details').style.display = 'block';
    } else if (method === 'upi') {
        document.getElementById('upi-details').style.display = 'block';
    }
    
    // Store selected method in form dataset
    document.getElementById('checkoutForm').dataset.paymentMethod = method;
}

// Generate random order ID
function generateOrderID() {
    return 'ORD' + Math.floor(10000 + Math.random() * 90000);
}

// Compute total from cart
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function processCheckout(e) {
    e.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showToast('Your cart is empty.');
        setTimeout(() => window.location.href = 'index.html', 1500);
        return;
    }

    const form = document.getElementById('checkoutForm');
    const paymentMethod = form.dataset.paymentMethod || 'cod';
    
    // Basic validations base on payment method
    if (paymentMethod === 'card') {
        const cardNo = document.getElementById('card-no').value;
        const expiry = document.getElementById('card-exp').value;
        const cvv = document.getElementById('card-cvv').value;
        if (!cardNo || !expiry || !cvv) {
            showToast('Please fill all card details.');
            return;
        }
    } else if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upi-id').value;
        if (!upiId) {
            showToast('Please enter your UPI ID.');
            return;
        }
    }

    // Collect Data
    const now = new Date();
    const delivery = new Date();
    delivery.setDate(now.getDate() + 5);

    const orderDetails = {
        orderId: generateOrderID(),
        date: now.toLocaleString(),
        orderTimestamp: now.getTime(),
        deliveryDate: delivery.toLocaleDateString(),
        user: {
            name: document.getElementById('chk-name').value,
            phone: document.getElementById('chk-phone').value,
            address: document.getElementById('chk-address').value
        },
        items: cart,
        total: calculateTotal(cart),
        paymentMethod: paymentMethod.toUpperCase()
    };
    
    // Retrieve previous orders and push
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Empty Cart
    localStorage.removeItem('cart');
    updateCartCount(); // from main.js

    // Redirect to success page with ID
    window.location.href = `success.html?orderId=${orderDetails.orderId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Pre-fill user data if logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && document.getElementById('chk-name')) {
        document.getElementById('chk-name').value = user.name || '';
    }
});

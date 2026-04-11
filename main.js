/* main.js */
// Update Cart Count recursively on page load
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = totalItems;
    }
}

// Toast Notification System
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.style.background = '#4CAF50';
    toast.style.color = 'white';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    toast.style.fontSize = '16px';
    toast.style.transition = '0.3s ease-in-out';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Auth Link Update (Login/Logout)
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        const user = localStorage.getItem('user');
        if (user) {
            authLink.innerText = 'Logout';
            authLink.href = '#';
            authLink.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                showToast("Logged out successfully");
                updateAuthLink();
                if(window.location.pathname.includes('login.html') || window.location.pathname.includes('checkout.html')) {
                    setTimeout(() => window.location.href = 'index.html', 1000);
                }
            };
        } else {
            authLink.innerText = 'Account';
            authLink.href = 'login.html';
            authLink.onclick = null;
        }
    }
}



// Run on Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateAuthLink();
});

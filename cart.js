/* cart.js */

// Add to Cart global function
function addToCart(element, id, name, price, image) {
    if(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => element.style.transform = 'scale(1)', 100);
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${name} added to cart!`);
}

// Render Cart items on cart.html
function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 20px;">Your cart is empty. <a href="product.html" style="color: #ff523b;">Continue Shopping</a></td></tr>';
        subtotalEl.innerText = '₹0.00';
        taxEl.innerText = '₹0.00';
        totalEl.innerText = '₹0.00';
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.image}" alt="">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: ₹${item.price.toFixed(2)}</small>
                        <br>
                        <a href="#" onclick="removeFromCart('${item.id}'); return false;" style="color: #ff523b; font-size:14px; margin-top:5px; display:inline-block;">Remove</a>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)" style="width: 50px; padding: 5px; border border-radius: 4px;"></td>
            <td>₹${itemTotal.toFixed(2)}</td>
        `;
        cartContainer.appendChild(tr);
    });

    let tax = 0; // Flat tax or 0
    let total = subtotal + tax;

    subtotalEl.innerText = '₹' + subtotal.toFixed(2);
    taxEl.innerText = '₹' + tax.toFixed(2);
    totalEl.innerText = '₹' + total.toFixed(2);
}

// Update item quantity
function updateQuantity(id, newQty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = parseInt(newQty);
        if(product.quantity <= 0) product.quantity = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
    showToast("Item removed from cart");
}

function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart.length === 0) {
        alert("Your cart is empty! Please add some products.");
        return;
    }
    
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
        alert("Please login to proceed to checkout!");
        window.location.href = 'login.html';
        return;
    }
    
    window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.includes('cart.html')) {
        renderCart();
    }
});

/* auth.js */

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;

    if(!name || !email || !password) {
        showToast("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.find(u => u.email === email)) {
        showToast("Email already exists!");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    showToast("Registration successful! Please login.");
    toggleForm(); // Switch to login form
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;

    if(!email || !password) {
        showToast("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
        showToast("Login Successful!");
        updateAuthLink();
        // Redirect if came from checkout or just go to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showToast("Invalid credentials");
    }
}

function toggleForm() {
    const loginForm = document.getElementById('LoginForm');
    const regForm = document.getElementById('RegForm');
    const indicator = document.getElementById('Indicator');

    if (loginForm.style.transform === "translateX(0px)") {
        loginForm.style.transform = "translateX(-300px)";
        regForm.style.transform = "translateX(0px)";
        indicator.style.transform = "translateX(100px)";
    } else {
        loginForm.style.transform = "translateX(0px)";
        regForm.style.transform = "translateX(300px)";
        indicator.style.transform = "translateX(0px)";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check auth protection for checkout
    if(window.location.pathname.includes('checkout.html')) {
        const user = localStorage.getItem('user');
        if (!user) {
            alert("Please login first.");
            window.location.href = 'login.html';
        }
    }
});

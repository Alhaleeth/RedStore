import os

css_additions = """
/*------ New Upgrades ------*/
.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.col-4:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    transform: translateY(-8px);
    transition: all 0.3s ease-in-out;
}

.button:hover, .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(255, 82, 59, 0.4);
}

.cart-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
}
.cart-info img {
    width: 80px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

#search-bar {
    width: 100%;
    max-width: 400px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 30px;
    outline: none;
    transition: box-shadow 0.3s;
}
#search-bar:focus {
    box-shadow: 0 0 8px rgba(255, 82, 59, 0.5);
    border-color: #ff523b;
}

.btn {
    display: inline-block;
    background: #ff523b;
    color: #fff;
    padding: 8px 30px;
    margin: 30px 0;
    border-radius: 30px;
    transition: background 0.5s, transform 0.3s;
    text-decoration: none;
    border: none;
    cursor: pointer;
}
.btn:hover {
    background: #563434;
}
.add-to-cart-btn {
    margin-top: 10px;
    padding: 8px 20px;
    font-size: 14px;
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_additions)
print("CSS updated.")

import os

css_append = """
/* Payment Section UI Additions */
.payment-options {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}
.payment-option {
    flex: 1;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background: #fff;
}
.payment-option:hover {
    border-color: #ff523b;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.payment-option.active {
    border-color: #ff523b;
    background: rgba(255, 82, 59, 0.05);
}
.payment-details {
    display: none;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}
.success-container {
    text-align: center;
    padding: 50px 20px;
    background: #fff;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    border-radius: 10px;
    max-width: 600px;
    margin: 50px auto;
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)
print("Checkout CSS appended.")

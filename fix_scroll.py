import re

# 1. Update style.css
css_file = 'style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Remove the .sticky class entirely to prevent fixed reposition leaps
css_content = re.sub(r'\.sticky\s*\{[^}]+\}', '', css_content)

# Update .navbar to be natively sticky
new_navbar = """
html {
    scroll-behavior: smooth;
    overflow-x: hidden;
}
body {
    overflow-x: hidden;
}
.navbar{
	display:flex;
	align-items:center;
	padding:20px;
	position: sticky;
	top: 0;
	z-index: 1000;
	background: #fff;
	box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	border-radius: 0 0 10px 10px;
    margin: -20px -25px 20px -25px; /* offset container padding */
}
"""
css_content = re.sub(r'\.navbar\s*\{[^}]+\}', new_navbar, css_content, count=1)

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)


# 2. Update main.js
js_file = 'main.js'
with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Remove the JS sticky navbar logic
js_content = re.sub(r'// Sticky Navbar Logic.*?}\);', '', js_content, flags=re.DOTALL)

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Scroll fixed")

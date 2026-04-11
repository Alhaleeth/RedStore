import glob

html_files = glob.glob('*.html')

nav_old = '<li><a href="contact.html">Contact</a></li>'
nav_new = '<li><a href="contact.html">Contact</a></li>\n                <li><a href="my-orders.html">Orders</a></li>'

for filepath in html_files:
    if filepath == 'my-orders.html':
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'my-orders.html' not in content:
        content = content.replace(nav_old, nav_new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

css_append = """
.order-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Navigation patched across all files and CSS appended.")

import re

file_product_detail = 'product-detail.html'
with open(file_product_detail, 'r', encoding='utf-8') as f:
    content = f.read()

# Add button to product-detail.html
replacement = """
	 <select>
	   <option>select Size</option>
	   <option>XXL</option>
	   <option>XL</option>
	   <option>Large</option>
	   <option>medium</option>
	   <option>small</option>
	 </select>
	 <button class="btn" style="margin-left:10px;" onclick="addToCart(this, 'prod1', 'Grey strip T-Shirt by HRX', 299.00, 'images/product-1-new.PNG')">Add to Cart</button>
"""
content = re.sub(r'<select>.*?<\/select>', replacement, content, flags=re.DOTALL)

with open(file_product_detail, 'w', encoding='utf-8') as f:
    f.write(content)

# Process product.html to add search and buttons
file_product = 'product.html'
with open(file_product, 'r', encoding='utf-8') as f:
    content_prod = f.read()

# Add search bar
search_html = """
    <div class="row row-2">
      <h2>All Products</h2>
      <input type="text" id="search-bar" placeholder="Search products..." onkeyup="searchProducts()">
	  <select>
"""
content_prod = content_prod.replace('<h2>All Products<h2>\n	  <select>', search_html)

# Script for search
search_script = """
<script>
function searchProducts() {
    let filter = document.getElementById('search-bar').value.toUpperCase();
    let productBoxes = document.querySelectorAll('.small-container .col-4');
    
    productBoxes.forEach(box => {
        let title = box.querySelector('h4').textContent;
        if(title.toUpperCase().indexOf(filter) > -1) {
            box.style.display = "";
        } else {
            box.style.display = "none";
        }
    });
}
</script>
"""
if 'searchProducts()' not in content_prod:
    content_prod = content_prod.replace('</body>', search_script + '</body>')

# Add 'Add to Cart' to each product dynamically in index and product
def add_buttons(html_content):
    # Regex to find product blocks and append a button if it doesn't have one
    pattern = re.compile(r'(<div class="col-4">.*?<img src="([^"]+)".*?<h4>([^<]+)</h4>.*?<p>[^\d]*([\d,]+(?:\.\d+)?).*?</p>\s*)(</div>)', re.DOTALL)
    
    def replacer(match):
        block = match.group(1)
        closing = match.group(5)
        img = match.group(2)
        title = match.group(3).strip()
        price_str = match.group(4).replace(',','')
        price = float(price_str)
        # Create an ID based on title safely
        prod_id = "prod_" + re.sub(r'\W+', '', title.lower())
        
        button = f'<button class="btn add-to-cart-btn" onclick="addToCart(this, \'{prod_id}\', \'{title}\', {price}, \'{img}\')">Add to Cart</button>\n'
        return block + button + closing

    return pattern.sub(replacer, html_content)

content_prod = add_buttons(content_prod)
with open(file_product, 'w', encoding='utf-8') as f:
    f.write(content_prod)

# Also update index.html with add to cart buttons
file_index = 'index.html'
with open(file_index, 'r', encoding='utf-8') as f:
    content_idx = f.read()

content_idx = add_buttons(content_idx)
with open(file_index, 'w', encoding='utf-8') as f:
    f.write(content_idx)

print("Product buttons and search injected.")

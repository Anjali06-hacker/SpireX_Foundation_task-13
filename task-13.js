// Product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1200,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Comfortable wireless headphones with clear sound."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1800,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "A stylish smartwatch for everyday use."
    },
    {
        id: 3,
        name: "Wireless Mouse",
        price: 500,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
        description: "Smooth and comfortable wireless mouse."
    },
    {
        id: 4,
        name: "Keyboard",
        price: 800,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80",
        description: "Comfortable keyboard for work and study."
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1500,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=300&q=80",
        description: "Portable speaker with good sound quality."
    },
    {
        id: 6,
        name: "USB Cable",
        price: 300,
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=300&q=80",
        description: "Durable USB cable for charging and data transfer."
    }
];
// Shopping cart
let cart = [];
// Display products
function displayProducts(productArray = products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    productArray.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >
            <h3>${product.name}</h3>
            <p class="price">
                ₹${product.price}
            </p>
            <button onclick="showDetails(${product.id})">
                View Details
            </button>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        productList.appendChild(productCard);
    });
}
// Show product details
function showDetails(id) {
    const product = products.find(item => item.id === id);
    document.getElementById("detailImage").src = product.image;
    document.getElementById("detailName").textContent =
        product.name;
    document.getElementById("detailDescription").textContent =
        product.description;
    document.getElementById("detailPrice").textContent =
        "₹" + product.price;
    document.getElementById("detailButton").onclick =
        function () {
            addToCart(product.id);
            closeModal();
        };
    document.getElementById("productModal").style.display = "block";
}
// Close product details
function closeModal() {
    document.getElementById("productModal").style.display = "none";
}
// Add product to cart
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    updateCartCount();
    displayCart();
}
// Display cart
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    cartItems.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>
                    ₹${item.price} × ${item.quantity}
                </p>
            </div>
            <div>
                <button onclick="decreaseQuantity(${item.id})">
                    -
                </button>
                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>
                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    cartTotal.textContent = total;
}
// Increase quantity
function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);
    item.quantity++;
    displayCart();
    updateCartCount();
}
// Decrease quantity
function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);
    item.quantity--;
    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }
    displayCart();
    updateCartCount();
}
// Remove product
function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    displayCart();
    updateCartCount();
}
// Update cart count
function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    document.getElementById("cartCount").textContent = count;
}
// Open cart
function openCart() {
    displayCart();
    document.getElementById("cartModal").style.display = "block";
}
// Close cart
function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}
// Search products
function searchProducts() {
    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
}
// Display products when page loads
displayProducts();
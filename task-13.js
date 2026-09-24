// Product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1200,
        image: "https://via.placeholder.com/300x200?text=Headphones",
        description: "Comfortable wireless headphones with clear sound."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1800,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch",
        description: "A stylish smartwatch for everyday use."
    },
    {
        id: 3,
        name: "Wireless Mouse",
        price: 500,
        image: "https://via.placeholder.com/300x200?text=Mouse",
        description: "Smooth and comfortable wireless mouse."
    },
    {
        id: 4,
        name: "Keyboard",
        price: 800,
        image: "https://via.placeholder.com/300x200?text=Keyboard",
        description: "Comfortable keyboard for work and study."
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1500,
        image: "https://via.placeholder.com/300x200?text=Speaker",
        description: "Portable speaker with good sound quality."
    },
    {
        id: 6,
        name: "USB Cable",
        price: 300,
        image: "https://via.placeholder.com/300x200?text=USB+Cable",
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
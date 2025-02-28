// Sample book data
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 9.99,
        image: "https://source.unsplash.com/random/300x400?book,classic",
        description: "A story of decadence and excess."
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.99,
        image: "https://source.unsplash.com/random/300x400?book,vintage",
        description: "A classic of modern American literature."
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 10.99,
        image: "https://source.unsplash.com/random/300x400?book,dystopia",
        description: "A dystopian social science fiction novel."
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 8.99,
        image: "https://source.unsplash.com/random/300x400?book,romance",
        description: "A romantic novel of manners."
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 14.99,
        image: "https://source.unsplash.com/random/300x400?book,fantasy",
        description: "A fantasy novel and children's book."
    },
    {
        id: 6,
        title: "Dune",
        author: "Frank Herbert",
        price: 13.99,
        image: "https://source.unsplash.com/random/300x400?book,scifi",
        description: "A science fiction novel."
    }
];

// Shopping cart state
let cart = [];
let isCartOpen = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    updateCart();
});

// Display books in the grid
function displayBooks() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = books.map(book => `
        <div class="product-card">
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <p>${book.description}</p>
            <div class="price">$${book.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${book.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    const cartItem = cart.find(item => item.id === bookId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }

    updateCart();
    if (!isCartOpen) {
        toggleCart();
    }
}

// Remove item from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                ❌
            </button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const products = document.querySelector('.products');
    
    isCartOpen = !isCartOpen;
    
    if (isCartOpen) {
        cartSidebar.classList.add('open');
        products.classList.add('cart-open');
    } else {
        cartSidebar.classList.remove('open');
        products.classList.remove('cart-open');
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
    
    // Clear cart
    cart = [];
    updateCart();
    toggleCart();
}
// Function to add an item to the cart
function addToCart(product) {
    // Get the current cart from localStorage, or initialize it if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // If product is already in the cart, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product is not in the cart, add it with quantity 1
        product.quantity = 1;
        cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    displayCart();
}

// Function to display the cart with product images
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-container');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let cartHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        totalPrice += item.price * item.quantity;
    });

    cartHTML += `<p><strong>Total: $${totalPrice.toFixed(2)}</strong></p>`;
    cartContainer.innerHTML = cartHTML;
}


// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the product to be removed
    cart = cart.filter(item => item.id !== productId);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    displayCart();
}

// Function to clear the entire cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// Call displayCart when the page loads
document.addEventListener('DOMContentLoaded', function () {
    displayCart();
});

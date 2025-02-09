// Function to add an item to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart or initialize an empty array
  
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // If product exists, update the quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If product does not exist, add it to the cart with quantity 1
      product.quantity = 1;
      cart.push(product);
    }
  
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert('Item added to cart!');
  }

  // Function to display the cart 
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
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage
    
    // Filter out the product to be removed
    cart = cart.filter(item => item.id !== productId);
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert('Item removed from cart!');
  }

  // Function to update the quantity of an item in the cart
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage
    
    // Find the item by ID and update its quantity
    const product = cart.find(item => item.id === productId);
    if (product) {
      product.quantity = newQuantity;
      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Cart updated!');
    } else {
      alert('Product not found in cart');
    }
  }

  // Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    alert('Cart has been cleared');
  }

  // Example Product
const product1 = { id: 1, name: 'Hat', price: 15.99 };
const product2 = { id: 2, name: 'Shirt', price: 25.99 };

// user login//
async function register() {
const fullName = document.getElementById('full-name').value;
const username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const password = document.getElementById('password').value;

try {
    const restDBUrl = 'https://madhatters-bd8a.restdb.io/rest/customers?max=2';
    const apiKey = '175771d3905bf0347c58972100efb2811090f';

    // Creating a new user object
    const newUser = {
        fullName: fullName,
        username: username,
        email: email,
        phone: phone,
        password: password
    };

        // Sending data to RestDB for registration
    const response = await fetch(restDBUrl, {
        method: 'POST',
        headers: {
            'x-apikey': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration successful!');
        // Redirect or perform further actions after successful registration
    } else {
        document.getElementById('error-message').innerText = 'Registration failed. Please try again.';
    }
} catch (error) {
    console.error('Error during registration:', error);
    document.getElementById('error-message').innerText = 'An error occurred. Please try again.';
    }
}
// cart.js

// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.loadCart();
    }

    addToCart(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.push(item);
        }
        this.saveCart();
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
    }

    updateQuantity(itemId, quantity) {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            item.quantity = quantity;
        }
        this.saveCart();
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }

    updateCartBadge() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.textContent = totalItems;
        }
    }
}

// Usage example:
const cart = new ShoppingCart();

// Adding an item to the cart
cart.addToCart({ id: 1, name: 'Coffee', price: 5, quantity: 1 });

// Removing an item from the cart
cart.removeFromCart(1);

// Updating quantity
cart.updateQuantity(1, 3);

// Calculating total
console.log(cart.calculateTotal()); // Displays total price

// Update cart badge
cart.updateCartBadge();

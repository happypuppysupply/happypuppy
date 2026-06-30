// Cart functionality for Happy Puppy Wellness
// Integrates with Shopify store

const CART_KEY = 'hpw_cart';

// Product database with Shopify variant IDs
const products = {
    'wuffes-hip-joint': {
        id: '45670672367660',
        name: 'Wuffes Hip & Joint Chews',
        price: 85.00,
        emoji: '🦴',
        handle: 'wuffes-hip-joint-chews-for-dogs-mobility-support-supplement-suitable-for-small-breeds-large-breeds-made-in-usa-60-soft-chews'
    },
    'wuffes-allergy': {
        id: '45674659315756',
        name: 'Wuffes Allergy & Itch Chews',
        price: 43.00,
        emoji: '✨',
        handle: 'wuffes-allergy-itch-chews-for-dogs-skin-immune-support-supplement-for-seasonal-allergies-itch-relief-all-breeds-ages-made-in-usa'
    },
    'probiotics': {
        id: '45701821628460',
        name: 'Probiotics for Dogs',
        price: 39.82,
        emoji: '🥩',
        handle: 'probiotics-for-dogs-prebiotic-probiotic-dog-supplement-with-ginger-root-icelandic-seaweed-and-organic-kelp-all-breeds-and-sizes-60-count'
    },
    'veterinary-strength': {
        id: '45701821661228',
        name: 'Veterinary Strength Healthy Cognition',
        price: 75.76,
        emoji: '💊',
        handle: 'veterinary-strength-healthy-cognition-chews-senior-wellness-supplement-for-dogs-supports-cognition-immune-function-metabolism-60-count'
    },
    'smart-vitality': {
        id: '45701814255660',
        name: 'Smart Vitality Hip & Joint Supplement',
        price: 18.83,
        emoji: '💪',
        handle: 'smart-vitality-hip-joint-supplement-for-dogs-with-glucosamine-dog-joint-support-dog-supplements-for-mobility-flexibility-60ct'
    },
    'bully-sticks': {
        id: '45701720277036',
        name: '100% Natural Bully Sticks',
        price: 40.52,
        emoji: '🦴',
        handle: '100-natural-12-in-bully-sticks-for-dogs-tough-long-lasting-rawhide-free-single-ingredient-beef-pizzle-chew-treats-for-medium-large-dogs-aggressive-chewers-5-count-pack'
    },
    'training-treats-chicken': {
        id: '45701703827500',
        name: 'Rewarding Life Training Treats (Chicken)',
        price: 10.19,
        emoji: '✅',
        handle: 'rewarding-life-soft-dog-training-treats-natural-grain-free-chicken-and-lamb-recipe-6-oz-bag'
    },
    'training-treats-turkey': {
        id: '45701703860268',
        name: 'Rewarding Life Training Treats (Turkey)',
        price: 10.19,
        emoji: '✅',
        handle: 'rewarding-life-soft-dog-training-treats-natural-grain-free-turkey-and-duck-recipe-6-oz-bag'
    },
    'chicken-feet': {
        id: '45674251092012',
        name: 'USA Chicken Feet (5lbs)',
        price: 115.00,
        emoji: '🐔',
        handle: 'usa-chicken-feet-5lbs-225-235-feet-natural-scent-only-washed-with-water-human-grade-and-100-natural-wholesome-dog-chew-treats-high-in-protein-glucosamine-and-chondroitin-enrichment-chewing-lean-chews'
    },
    'redbarn-collagen': {
        id: '45701720932396',
        name: 'Redbarn Collagen-Wrapped Esophagus',
        price: 77.98,
        emoji: '🦷',
        handle: 'redbarn-collagen-wrapped-esophagus-slices-20-pack-natural-dog-chews-long-lasting-alternative-to-traditional-rawhide-for-all-dog-sizes-grain-free-beef-treats-slow-roasted'
    },
    'redbarn-braided': {
        id: '45701722243116',
        name: 'Redbarn Braided Collagen Chews',
        price: 199.47,
        emoji: '🦴',
        handle: 'redbarn-medium-braided-collagen-wrapped-esophagus-dog-chews-30-count-natural-grain-free-gluten-free-alternative-to-traditional-rawhide-long-lasting-treats-for-dogs'
    },
    'hip-joint-advanced': {
        id: '45701814386732',
        name: 'Dog Hip and Joint Chews - Advanced',
        price: 26.16,
        emoji: '🦴',
        handle: 'dog-hip-and-joint-chews-advanced-mobility-support-with-high-potency-glucosamine-green-lipped-mussel-omega-3-turmeric-150-count-soft-chews-for-joint-health'
    },
    'pupflex': {
        id: '45701814747180',
        name: 'Pupflex+ Hip and Joint Supplement',
        price: 74.52,
        emoji: '🦴',
        handle: 'pupflex-hip-and-joint-supplement-dogs-vet-created-soft-chews-w-uc-ii-collagen-curcuvet-omega-3-uc-ii-collagen-more-effective-than-glucosamine-chondroitin-dog-joint-supplement-60-ct'
    },
    'calming-care': {
        id: '45701814321196',
        name: 'Purina Pro Plan Calming Care',
        price: 33.95,
        emoji: '💙',
        handle: 'purina-pro-plan-veterinary-supplements-calming-care-calming-dog-supplements-30-ct-boxes'
    },
    'orthopedic-bed': {
        id: 'custom_orthopedic_bed',
        name: 'Orthopedic Memory Foam Bed',
        price: 89.99,
        emoji: '🛏️',
        handle: 'orthopedic-memory-foam-bed',
        url: 'https://www.happypuppysupply.com/collections/dog-beds-mats'
    },
    'calming-bed': {
        id: 'custom_calming_bed',
        name: 'Calming Donut Bed',
        price: 79.99,
        emoji: '🛏️',
        handle: 'calming-donut-bed',
        url: 'https://www.happypuppysupply.com/collections/dog-beds-mats'
    },
    'puzzle-toys': {
        id: 'custom_puzzle_toys',
        name: 'Interactive Puzzle Toys',
        price: 24.99,
        emoji: '🧩',
        handle: 'interactive-puzzle-toys',
        url: 'https://www.happypuppysupply.com/collections/toys-entertainment'
    },
    'plush-toys': {
        id: 'custom_plush_toys',
        name: 'Plush Comfort Toys',
        price: 18.99,
        emoji: '🧸',
        handle: 'plush-comfort-toys',
        url: 'https://www.happypuppysupply.com/collections/toys-entertainment'
    },
    'active-toys': {
        id: 'custom_active_toys',
        name: 'Active Play Toys',
        price: 22.99,
        emoji: '🎾',
        handle: 'active-play-toys',
        url: 'https://www.happypuppysupply.com/collections/toys-entertainment'
    },
    'pet-ramp': {
        id: 'custom_pet_ramp',
        name: 'Pet Ramp for Furniture',
        price: 79.99,
        emoji: '📐',
        handle: 'pet-ramp',
        url: 'https://www.happypuppysupply.com/collections/gates-containment'
    },
    'grooming-brush': {
        id: 'custom_grooming_brush',
        name: 'Professional Grooming Brush',
        price: 24.99,
        emoji: '🧴',
        handle: 'professional-grooming-brush',
        url: 'https://www.happypuppysupply.com/collections/grooming-care'
    }
};

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productKey, quantity = 1) {
    const product = products[productKey];
    if (!product) return false;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.key === productKey);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            key: productKey,
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            handle: product.handle,
            url: product.url || null,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    showCartNotification(`Added ${product.name} to cart`);
    return true;
}

// Remove item from cart
function removeFromCart(productKey) {
    let cart = getCart();
    cart = cart.filter(item => item.key !== productKey);
    saveCart(cart);
}

// Update item quantity
function updateQuantity(productKey, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.key === productKey);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productKey);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
}

// Clear cart
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart count
function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count in header
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// Show cart notification
function showCartNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span>${message}</span>
        <a href="/cart.html" class="cart-notification-link">View Cart</a>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2D2D2D;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 20px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Build Shopify checkout URL
function buildCheckoutUrl() {
    const cart = getCart();
    if (cart.length === 0) return 'https://www.happypuppysupply.com/cart';
    
    // Build URL with variant IDs
    const ids = [];
    const quantities = [];
    
    cart.forEach(item => {
        // Only add items with numeric IDs (not custom products)
        if (!item.id.startsWith('custom_')) {
            ids.push(item.id);
            quantities.push(item.quantity);
        }
    });
    
    if (ids.length === 0) {
        // All items are custom, redirect to collections
        return 'https://www.happypuppysupply.com/collections/all';
    }
    
    if (ids.length === 1) {
        return `https://www.happypuppysupply.com/cart/add?id=${ids[0]}&quantity=${quantities[0]}`;
    }
    
    return `https://www.happypuppysupply.com/cart/add?id=${ids.join(',')}&quantity=${quantities.join(',')}`;
}

// Go to checkout
function goToCheckout() {
    const url = buildCheckoutUrl();
    window.open(url, '_blank');
}

// Render cart for cart.html
function renderCartPage() {
    const cart = getCart();
    const container = document.getElementById('cart-items');
    const emptyContainer = document.getElementById('cart-empty');
    const summaryContainer = document.getElementById('cart-summary');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.style.display = 'none';
        if (summaryContainer) summaryContainer.style.display = 'none';
        if (emptyContainer) emptyContainer.style.display = 'block';
        return;
    }
    
    if (emptyContainer) emptyContainer.style.display = 'none';
    container.style.display = 'block';
    if (summaryContainer) summaryContainer.style.display = 'block';
    
    let html = '';
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        html += `
            <div class="cart-item">
                <div class="cart-item-emoji">${item.emoji}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity('${item.key}', ${item.quantity - 1})" class="qty-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.key}', ${item.quantity + 1})" class="qty-btn">+</button>
                </div>
                <div class="cart-item-total">$${itemTotal}</div>
                <button onclick="removeFromCart('${item.key}')" class="remove-btn">×</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Update summary
    const subtotal = getCartTotal().toFixed(2);
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // If on cart page, render cart
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
});

// Export for use in other scripts
window.Cart = {
    add: addToCart,
    remove: removeFromCart,
    updateQuantity: updateQuantity,
    clear: clearCart,
    getTotal: getCartTotal,
    getCount: getCartCount,
    getItems: getCart,
    checkout: goToCheckout,
    products: products
};

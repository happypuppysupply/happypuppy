// Cart functionality for Happy Puppy Wellness
// Integrates with Shopify store - using actual products from happypuppysupply.com
// EXCLUDES: All Wuffes products, chicken feet, and previous assessment products

const CART_KEY = '***';

// Product database with actual Shopify variant IDs from happypuppysupply.com
// All NEW products - none from previous assessment recommendations
const products = {
    // Health & Wellness - NEW supplements (no Wuffes)
    'smart-vitality': {
        id: '45701814255660',
        name: 'Smart Vitality Hip & Joint Supplement',
        price: 18.83,
        emoji: '💪',
        handle: 'smart-vitality-hip-joint-supplement-for-dogs-with-glucosamine-dog-joint-support-dog-supplements-for-mobility-flexibility-60ct',
        category: 'Health & Wellness'
    },
    'pupflex-joint': {
        id: '45701814747180',
        name: 'Pupflex+ Hip and Joint Supplement',
        price: 74.52,
        emoji: '🦴',
        handle: 'pupflex-hip-and-joint-supplement-dogs-vet-created-soft-chews-w-uc-ii®-collagen-curcuvet®-omega-3-uc-ii-collagen-more-effective-than-glucosamine-chondroitin-dog-joint-supplement-60-ct',
        category: 'Health & Wellness'
    },
    'dog-hip-joint-advanced': {
        id: '45701814386732',
        name: 'Dog Hip and Joint Chews - Advanced',
        price: 26.16,
        emoji: '🦴',
        handle: 'dog-hip-and-joint-chews-advanced-mobility-support-with-high-potency-glucosamine-green-lipped-mussel-omega-3-turmeric-150-count-soft-chews-for-joint-health',
        category: 'Health & Wellness'
    },
    'veterinary-cognition': {
        id: '45701821661228',
        name: 'Veterinary Strength Healthy Cognition',
        price: 75.76,
        emoji: '💊',
        handle: 'veterinary-strength-healthy-cognition-chews-senior-wellness-supplement-for-dogs-supports-cognition-immune-function-metabolism-60-count',
        category: 'Health & Wellness'
    },
    'probiotics': {
        id: '45701821628460',
        name: 'Probiotics for Dogs',
        price: 39.82,
        emoji: '🥩',
        handle: 'probiotics-for-dogs-prebiotic-probiotic-dog-supplement-with-ginger-root-icelandic-seaweed-and-organic-kelp-all-breeds-and-sizes-60-count',
        category: 'Health & Wellness'
    },
    'bladder-control': {
        id: '45701822447660',
        name: 'Bladder Control Supplement',
        price: 28.96,
        emoji: '💧',
        handle: 'bladder-control-pet-supplies-for-bladder-health-support-urinary-tract-health-dog-health-supplement-pet-support-for-dogs-30-capsules-30-servings',
        category: 'Health & Wellness'
    },
    'calming-care': {
        id: '45701814321196',
        name: 'Purina Pro Plan Calming Care',
        price: 33.95,
        emoji: '💙',
        handle: 'purina-pro-plan-veterinary-supplements-calming-care-calming-dog-supplements-30-ct-boxes',
        category: 'Health & Wellness'
    },
    'calming-spray': {
        id: '45701821562924',
        name: 'Pet Calming Spray',
        price: 8.39,
        emoji: '🌿',
        handle: 'pet-calming-spray-pheromone-mood-calming-diffuser-improve-estrus-agitation-anxiety-relief-prevent-howling-cat-dog-health-supply',
        category: 'Health & Wellness'
    },
    'gut-health': {
        id: '45701814353964',
        name: 'Dog Gut Health Supplement',
        price: 44.83,
        emoji: '🥩',
        handle: 'dog-gut-health-supplement-plasma-powered-soft-chews-for-dog-immune-health-support-gut-health-made-with-natural-ingredients-for-dogs-of-all-breeds-sizes-60-count',
        category: 'Health & Wellness'
    },
    'omega-skin': {
        id: '45701815107628',
        name: 'Omega Canine Coat & Skin Chews',
        price: 22.85,
        emoji: '✨',
        handle: 'omega-canine-coat-skin-chews-skin-coat-chewables-for-dogs-120-soft-chews-fish-oil',
        category: 'Health & Wellness'
    },
    'glucosamine-soft-chews': {
        id: '45701814288428',
        name: 'Glucosamine Hip & Joint Soft Chews',
        price: 15.74,
        emoji: '🦴',
        handle: 'glucosamine-hip-joint-supplement-for-dogs-60-soft-chews-joint-support-supplement-with-msm-and-krill-dog-health-supplies-large-small-breed-chicken-flavored-chewables',
        category: 'Health & Wellness'
    },
    
    // Treats & Chews - NEW options (no chicken feet)
    'bully-sticks': {
        id: '45701720277036',
        name: '100% Natural Bully Sticks',
        price: 40.52,
        emoji: '🦴',
        handle: '100-natural-12-in-bully-sticks-for-dogs-tough-long-lasting-rawhide-free-single-ingredient-beef-pizzle-chew-treats-for-medium-large-dogs-aggressive-chewers-5-count-pack',
        category: 'Dog Treats & Chews'
    },
    'training-treats-chicken': {
        id: '45701703827500',
        name: 'Rewarding Life Training Treats (Chicken)',
        price: 10.19,
        emoji: '✅',
        handle: 'rewarding-life-soft-dog-training-treats-natural-grain-free-chicken-and-lamb-recipe-6-oz-bag',
        category: 'Dog Treats & Chews'
    },
    'training-treats-turkey': {
        id: '45701703860268',
        name: 'Rewarding Life Training Treats (Turkey)',
        price: 10.19,
        emoji: '✅',
        handle: 'rewarding-life-soft-dog-training-treats-natural-grain-free-turkey-and-duck-recipe-6-oz-bag',
        category: 'Dog Treats & Chews'
    },
    'redbarn-collagen': {
        id: '45701720932396',
        name: 'Redbarn Collagen-Wrapped Esophagus',
        price: 77.98,
        emoji: '🦷',
        handle: 'redbarn-collagen-wrapped-esophagus-slices-20-pack-natural-dog-chews-long-lasting-alternative-to-traditional-rawhide-for-all-dog-sizes-grain-free-beef-treats-slow-roasted',
        category: 'Dog Treats & Chews'
    },
    'redbarn-braided': {
        id: '45701722243116',
        name: 'Redbarn Braided Collagen Chews',
        price: 199.47,
        emoji: '🦴',
        handle: 'redbarn-medium-braided-collagen-wrapped-esophagus-dog-chews-30-count-natural-grain-free-gluten-free-alternative-to-traditional-rawhide-long-lasting-treats-for-dogs',
        category: 'Dog Treats & Chews'
    },
    'activfresh-small': {
        id: '45701722374188',
        name: 'Activfresh Dental Chews - Small',
        price: 10.84,
        emoji: '🦷',
        handle: 'activfresh-dog-chews-for-mini-and-small-dogs-5-20-lbs-dental-chews-to-freshen-breath-chicken-flavor-16-9-oz-56-chews-56-ct-pouch',
        category: 'Dog Treats & Chews'
    },
    'activfresh-medium': {
        id: '45701720309804',
        name: 'Activfresh Dental Chews - Medium',
        price: 14.71,
        emoji: '🦷',
        handle: 'activfresh-dog-chews-for-small-and-medium-dogs-20-40-lbs-dental-chews-to-freshen-breath-chicken-flavor-15-5-oz-21-chews-21-ct-pouch',
        category: 'Dog Treats & Chews'
    },
    'mighty-paw-yak': {
        id: '45674540171308',
        name: 'Mighty Paw Yak Cheese Dog Chews',
        price: 46.00,
        emoji: '🧀',
        handle: 'mighty-paw-yak-cheese-dog-chews-all-natural-treats-for-your-pup',
        category: 'Dog Treats & Chews'
    },
    'bacon-yak-cheese': {
        id: '45701720014892',
        name: 'Bacon Yak Cheese Dog Chews',
        price: 41.11,
        emoji: '🧀',
        handle: 'bacon-yak-cheese-dog-chews-the-better-for-you-chew-100-natural-long-lasting-healthy-dog-treats-lactose-grain-free-protein-rich-for-dogs-65-lbs-smaller-4-count',
        category: 'Dog Treats & Chews'
    },
    'marosnacks': {
        id: '45701751898156',
        name: 'Marosnacks with Real Bone Marrow',
        price: 14.50,
        emoji: '🦴',
        handle: 'marosnacks-small-dog-treats-with-real-bone-marrow-40-oz-canister',
        category: 'Dog Treats & Chews'
    },
    'zaggler-bacon': {
        id: '45701751865388',
        name: 'Zaggler Rolling Chew Toy - Bacon',
        price: 27.28,
        emoji: '🦴',
        handle: 'zaggler-rolling-dog-chew-toy-for-aggressive-chewers-real-bacon-made-in-usa-giant',
        category: 'Dog Treats & Chews'
    },
    
    // Dog Beds - NEW selection
    'orthopedic-crate-mat': {
        id: '45701788139564',
        name: 'Restful Dreamer Orthopedic Crate Mat',
        price: 41.08,
        emoji: '🛏️',
        handle: 'pet-products-restful-dreamer-medium-large-orthopedic-foam-deluxe-crate-mat-gray',
        category: 'Dog Beds & Mats'
    },
    'orthopedic-crate-mat-2pack': {
        id: '45701802852396',
        name: 'Restful Dreamer Orthopedic Mat (2-Pack)',
        price: 62.64,
        emoji: '🛏️',
        handle: '2-pack-pet-products-restful-dreamer-medium-large-orthopedic-foam-deluxe-crate-mat-gray',
        category: 'Dog Beds & Mats'
    },
    'memory-foam-mattress': {
        id: '45701787910188',
        name: 'Memory Foam Mattress Mat (2-Pack)',
        price: 53.04,
        emoji: '🛏️',
        handle: '2-pack-pet-products-mattress-edition-medium-memory-foam-dog-kennel-crate-mat-gray',
        category: 'Dog Beds & Mats'
    },
    'winter-warm-bed': {
        id: '45701787254828',
        name: 'Winter Warm Dog House Bed',
        price: 26.86,
        emoji: '🛏️',
        handle: 'winter-warm-dog-house-detachable-pet-sleeping-bed-for-small-medium-dogs-cats-soft-non-slip-dog-kennel-puppy-kitten-nest',
        category: 'Dog Beds & Mats'
    },
    'dog-blankets': {
        id: '45701787582508',
        name: 'Dog Blankets 3-Pack',
        price: 7.82,
        emoji: '🛏️',
        handle: 'dog-blankets-for-dogs-3-pack-dog-blanket-washable-23-x-16-fuzzy-soft-pet-mat-throw-cover-for-kennel-crate-bed-cute-paw-pattern-cat-blanket-blankets-for-dogs-pet-blanket',
        category: 'Dog Beds & Mats'
    },
    
    // Crates & Kennels - NEW selection
    'dog-crate-42': {
        id: '45701822840876',
        name: '42 Inch Foldable Dog Crate',
        price: 92.42,
        emoji: '🏠',
        handle: '42-inch-dog-crate-dog-crates-and-kennels-foldable-large-dog-crate-for-large-dogs-with-handle-double-door-outdoor-metal-wire-dog-cage-with-plastic-tray-for-medium-dogs-black',
        category: 'Outdoor Kennels & Pens'
    },
    'dog-crate-36': {
        id: '45701703729196',
        name: '36 Inch Foldable Dog Crate',
        price: 72.42,
        emoji: '🏠',
        handle: '36-inch-dog-crate-dog-crates-and-kennels-foldable-large-dog-crate-for-large-dogs-with-handle-double-door-outdoor-metal-wire-dog-cage-with-plastic-tray-for-medium-dogs-pink',
        category: 'Outdoor Kennels & Pens'
    },
    'heavy-duty-crate-48': {
        id: '45701776769068',
        name: '48 Inch Heavy Duty Dog Crate',
        price: 185.86,
        emoji: '🏠',
        handle: '48-inch-heavy-duty-dog-crate-indestructible-escape-proof-kennel-with-double-door-removable-tray-for-medium-to-large-dogs-black',
        category: 'Outdoor Kennels & Pens'
    },
    'wooden-dog-furniture': {
        id: '45701809537068',
        name: 'Dog Crate Furniture with Drawers',
        price: 219.27,
        emoji: '🏠',
        handle: '44-in-dog-crate-furniture-with-drawers-wooden-dog-cage-with-open-compartment-double-doors-heavy-duty-indoor-house-end-table-for-small-medium-large-breeds-vintage-brown-black',
        category: 'Outdoor Kennels & Pens'
    },
    
    // Toys & Entertainment - NEW selection
    'automatic-ball-launcher': {
        id: '45701802754092',
        name: 'Automatic Ball Launcher',
        price: 74.52,
        emoji: '🎾',
        handle: 'automatic-ball-launcher-for-dogs-2-mini-tennis-ball-thrower-with-3-distance-settings-interactive-puppy-pet-ball-indoor-thrower-fetch-machine-for-small-to-medium-dogs-green',
        category: 'Toys & Entertainment'
    },
    'ball-launcher-orange': {
        id: '45701802590252',
        name: 'Ball Launcher with 6 Balls (Orange)',
        price: 99.27,
        emoji: '🎾',
        handle: 'automatic-ball-launcher-for-dogs-with-6-balls-dog-ball-thrower-launcher-orange',
        category: 'Toys & Entertainment'
    },
    'plush-hedgehog': {
        id: '45701703696428',
        name: 'Plush Squeaky Hedgehog Toy',
        price: 10.01,
        emoji: '🧸',
        handle: 'plush-dog-toy-soft-plush-squeaky-hedgehog-dog-toy-stuffed-biting-training-playing-squeak-toys-for-dog-puppy-1',
        category: 'Toys & Entertainment'
    },
    'squeaker-balls-4pk': {
        id: '45701800230956',
        name: 'Flying Disc Fetch Toys 3-Pack',
        price: 23.43,
        emoji: '🥏',
        handle: '3-pcs-flying-disc-dog-fetch-toys-9-05-inch-interactive-flyer-and-tug-toys-feedable-lightweight-nylon-fabric-pet-training-and-outdoor-exercise-toys-for-small-medium-large-dogs-safe-on-teeth',
        category: 'Toys & Entertainment'
    },
    
    // Feeding - NEW selection
    'elevated-bowls': {
        id: '45701749538860',
        name: 'Elevated Dog Bowls Adjustable',
        price: 37.40,
        emoji: '🥣',
        handle: 'elevated-dog-bowls-adjustable-height-raised-dog-food-bowls-for-small-medium-and-large-dog',
        category: 'Feeding & Watering'
    },
    'slow-feeder': {
        id: '45701814222892',
        name: 'Gobble Stopper Slow Feeder',
        price: 15.15,
        emoji: '🥣',
        handle: 'gobble-stopper-slow-feeder-small-1-ct',
        category: 'Feeding & Watering'
    },
    
    // Wellness Kits - NEW selection
    'wellness-kit': {
        id: '45701822054444',
        name: 'Home Check 4-In-1 Dog Wellness Kit (2 Pack)',
        price: 49.51,
        emoji: '✅',
        handle: 'home-check-4-in-1-dog-wellness-kit-2-pack',
        category: 'Health & Wellness'
    },
    'health-records': {
        id: '45701815140396',
        name: 'Premium Canine Health Records (25-Pack)',
        price: 15.12,
        emoji: '📋',
        handle: 'pet-supplies-25-pack-premium-canine-health-record-6x4-inch-booklets-dog-vaccines-large-records-puppy-shot-vaccination-brochure',
        category: 'Health & Wellness'
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
    if (!product) {
        console.error('Product not found:', productKey);
        return false;
    }
    
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
            category: product.category,
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
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
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
            if (document.getElementById('cart-items')) {
                renderCartPage();
            }
        }
    }
}

// Clear cart
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
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
        el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
}

// Show cart notification
function showCartNotification(message) {
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
    
    const items = [];
    cart.forEach(item => {
        items.push(`${item.id}:${item.quantity}`);
    });
    
    return `https://www.happypuppysupply.com/cart/add?items=${items.join(',')}`;
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
                    <p class="cart-item-category">${item.category}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="Cart.updateQuantity('${item.key}', ${item.quantity - 1})" class="qty-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="Cart.updateQuantity('${item.key}', ${item.quantity + 1})" class="qty-btn">+</button>
                </div>
                <div class="cart-item-total">$${itemTotal}</div>
                <button onclick="Cart.remove('${item.key}')" class="remove-btn">×</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    const subtotal = getCartTotal().toFixed(2);
    const subtotalEls = document.querySelectorAll('#cart-subtotal');
    subtotalEls.forEach(el => el.textContent = `$${subtotal}`);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
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
    products: products,
    render: renderCartPage
};

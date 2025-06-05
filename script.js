// Données des produits
const products = [
    {
        id: 1,
        name: "Poulet de chair standard",
        price: 12.99,
        category: "poulets",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3",
        description: "Poulet de chair élevé en plein air, 2kg environ"
    },
    {
        id: 2,
        name: "Poulet de chair premium",
        price: 18.99,
        category: "poulets",
        image: "https://images.unsplash.com/photo-1596704017255-ee9c0cbb1fa1?ixlib=rb-4.0.3",
        description: "Poulet de chair bio, élevage en liberté, 2.5kg environ"
    },
    {
        id: 3,
        name: "Poule pondeuse",
        price: 15.99,
        category: "poules",
        image: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixlib=rb-4.0.3",
        description: "Poule pondeuse âgée de 6 mois, production élevée"
    },
    {
        id: 4,
        name: "Poule fermière",
        price: 14.50,
        category: "poules",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3",
        description: "Poule rustique adaptée à tous les climats"
    },
    {
        id: 5,
        name: "Pack familial (2 poulets + 1 poule)",
        price: 38.99,
        category: "packs",
        image: "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?ixlib=rb-4.0.3",
        description: "Pack économique pour les familles"
    },
    {
        id: 6,
        name: "Poulet fermier label rouge",
        price: 22.50,
        category: "poulets",
        image: "https://images.unsplash.com/photo-1564759298141-cef86f51d4d4?ixlib=rb-4.0.3",
        description: "Poulet fermier de haute qualité, label rouge"
    }
];

// Panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Chargement des produits
document.addEventListener('DOMContentLoaded', function() {
    // Charger les produits si on est sur la page produits.html
    if (document.getElementById('products-container')) {
        loadProducts();
    }
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            this.reset();
        });
    }
    
    // Mettre à jour le compteur du panier
    updateCartCount();
});

// Charger les produits
function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="fw-bold">${product.price.toFixed(2)} €</p>
                </div>
                <div class="card-footer bg-white">
                    <button class="btn btn-primary w-100 add-to-cart" data-id="${product.id}">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Ajouter les écouteurs d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Ajouter un produit au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Sauvegarder le panier
    saveCart();
    updateCartCount();
    
    // Afficher une notification
    showToast(`${product.name} ajouté au panier!`);
}

// Sauvegarder le panier dans le localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    countElements.forEach(element => {
        element.textContent = count;
    });
}

// Afficher une notification toast
function showToast(message) {
    // Créer l'élément toast
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '1100';
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Poulailler Express</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body bg-light">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
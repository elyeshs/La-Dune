// ==========================================================================
// 1. TRADUCTIONS DES SOINS DE LA COLLECTION "LA DUNE SIGNATURE"
// ==========================================================================
const translations = {
    fr: {
        "hero-title": "L'Élégance de la Haute Beauté",
        "hero-subtitle": "Des créations d'exception façonnées pour votre rituel à Oberhausen.",
        "hero-btn": "Découvrir la collection",
        "collection-title": "La Collection Signature",
        "prod1-name": "L'Élixir Doré",
        "prod1-desc": "Huile de soin régénérante d'exception pour un éclat absolu et une peau sublimée.",
        "prod2-name": "Crème de Soie",
        "prod2-desc": "Soin hydratation absolue à la texture aérienne, enveloppant la peau d'un voile de douceur.",
        "prod3-name": "Brume de Sable",
        "prod3-desc": "Lotion tonique minérale vivifiante qui rééquilibre, apaise et illumine le teint instantanément.",
        "status-out-of-stock": "En rupture de stock",
        "notify-btn": "M'avertir de la disponibilité",
        "modal-title": "Restez informé",
        "modal-desc": "Inscrivez-vous pour recevoir une notification exclusive dès le prochain réassort de nos produits.",
        "submit-btn": "Valider"
    },
    en: {
        "hero-title": "The Elegance of Pure Beauty",
        "hero-subtitle": "Exceptional creations crafted for your ritual in Oberhausen.",
        "hero-btn": "Discover the Collection",
        "collection-title": "The Signature Collection",
        "prod1-name": "The Golden Elixir",
        "prod1-desc": "Exceptional regenerating care oil for absolute radiance and sublimated skin.",
        "prod2-name": "Silk Cream",
        "prod2-desc": "Absolute moisturizing care with a lightweight texture, wrapping the skin in a veil of softness.",
        "prod3-name": "Sand Mist",
        "prod3-desc": "Invigorating mineral tonic lotion that instantly rebalances, soothes, and illuminates the complexion.",
        "status-out-of-stock": "Out of stock",
        "notify-btn": "Notify Me of Availability",
        "modal-title": "Stay Informed",
        "modal-desc": "Sign up to receive an exclusive notification as soon as our products are back in stock.",
        "submit-btn": "Submit"
    },
    de: {
        "hero-title": "Die Eleganz reiner Schönheit",
        "hero-subtitle": "Außergewöhnliche Kreationen, geschaffen für Ihr Ritual in Oberhausen.",
        "hero-btn": "Kollektion entdecken",
        "collection-title": "Die Signature-Kollektion",
        "prod1-name": "L'Élixir Doré",
        "prod1-desc": "Außergewöhnliches regenerierendes Pflegeöl für absolute Ausstrahlung und vollendete Haut.",
        "prod2-name": "Crème de Soie",
        "prod2-desc": "Absolute Feuchtigkeitspflege mit luftiger Textur, die die Haut in einen Schleier der Sanftheit hüllt.",
        "prod3-name": "Brume de Sable",
        "prod3-desc": "Belebendes mineralisches Gesichtswasser, das das Hautbild sofort ausgleicht, beruhigt und erstrahlen lässt.",
        "status-out-of-stock": "Ausverkauft",
        "notify-btn": "Bei Verfügbarkeit benachrichtigen",
        "modal-title": "Bleiben Sie informiert",
        "modal-desc": "Melden Sie sich an, um eine exklusive Benachrichtigung zu erhalten, sobald unsere Produkte wieder verfügbar sind.",
        "submit-btn": "Bestätigen"
    }
};

const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach(button => {
    button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        
        // Changement visuel de l'état du bouton sélectionné
        langButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        // Traduction dynamique sans toucher au logo "La Dune"
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    });
});

// ==========================================================================
// 2. MODAL DE NOTIFICATION DE STOCK
// ==========================================================================
const stockModal = document.getElementById("stock-modal");
const notifyButtons = document.querySelectorAll(".btn-stock");
const closeStockBtn = document.querySelector(".close-button");
const notifyForm = document.getElementById("notify-form");

notifyButtons.forEach(button => {
    button.addEventListener("click", () => {
        stockModal.style.display = "flex";
    });
});

closeStockBtn.addEventListener("click", () => {
    stockModal.style.display = "none";
});

notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Merci ! Votre inscription a bien été prise en compte.");
    stockModal.style.display = "none";
    notifyForm.reset();
});

// ==========================================================================
// 3. MODALES DES MENTIONS LÉGALES & POLITIQUE DE CONFIDENTIALITÉ
// ==========================================================================
const modalImpressum = document.getElementById("modal-impressum");
const btnImpressum = document.getElementById("open-impressum");
const closeImpressum = document.getElementById("close-impressum");

const modalPrivacy = document.getElementById("modal-privacy");
const btnPrivacy = document.getElementById("open-privacy");
const closePrivacy = document.getElementById("close-privacy");

// Actions d'ouverture au clic
btnImpressum.addEventListener("click", (e) => {
    e.preventDefault();
    modalImpressum.style.display = "block";
});

btnPrivacy.addEventListener("click", (e) => {
    e.preventDefault();
    modalPrivacy.style.display = "block";
});

// Actions de fermeture (Boutons X)
closeImpressum.addEventListener("click", () => {
    modalImpressum.style.display = "none";
});

closePrivacy.addEventListener("click", () => {
    modalPrivacy.style.display = "none";
});

// Fermeture si clic à l'extérieur des fenêtres blanches
window.addEventListener("click", (event) => {
    if (event.target === stockModal) {
        stockModal.style.display = "none";
    }
    if (event.target === modalImpressum) {
        modalImpressum.style.display = "none";
    }
    if (event.target === modalPrivacy) {
        modalPrivacy.style.display = "none";
    }
});

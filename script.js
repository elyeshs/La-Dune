// ==========================================================================
// 1. GESTION DES TRADUCTIONS MULTILINGUES (FR, EN, DE)
// ==========================================================================
const translations = {
    fr: {
        "hero-title": "L'Élégance de la Haute Pâtisserie",
        "hero-subtitle": "Des créations d'exception façonnées à la main à Oberhausen.",
        "hero-btn": "Découvrir nos créations",
        "products-title": "Nos Collections Signature",
        "product1-desc": "Biscuits cuillère faits maison, crème diplomate légère à la vanille de Madagascar et fraises fraîches sélectionnées.",
        "product2-desc": "Mousse au chocolat noir grand cru 70%, éclat de noisettes torréfiées et biscuit imbibé au cacao délicat.",
        "notify-btn": "M'avertir de la disponibilité",
        "modal-title": "Restez informé",
        "modal-desc": "Inscrivez-vous pour recevoir une notification exclusive dès notre prochaine ouverture de commandes.",
        "submit-btn": "Valider"
    },
    en: {
        "hero-title": "The Elegance of Haute Pâtisserie",
        "hero-subtitle": "Exceptional creations handcrafted in Oberhausen.",
        "hero-btn": "Discover Our Creations",
        "products-title": "Our Signature Collections",
        "product1-desc": "Homemade ladyfingers, light Madagascar vanilla diplomat cream, and selected fresh strawberries.",
        "product2-desc": "Intense 70% grand cru dark chocolate mousse, roasted hazelnut slivers, and delicate cocoa-soaked biscuit.",
        "notify-btn": "Notify Me of Availability",
        "modal-title": "Stay Informed",
        "modal-desc": "Sign up to receive an exclusive notification as soon as our next order window opens.",
        "submit-btn": "Submit"
    },
    de: {
        "hero-title": "Die Eleganz der Haute Pâtisserie",
        "hero-subtitle": "Außergewöhnliche Kreationen, handgefertigt in Oberhausen.",
        "hero-btn": "Unsere Kreationen entdecken",
        "products-title": "Unsere Signature-Kollektionen",
        "product1-desc": "Hausgemachter Löffelbiskuit, leichte Diplomatencreme mit Madagaskar-Vanille und ausgewählten frischen Erdbeeren.",
        "product2-desc": "Intensive Mousse aus 70% Grand-Cru-Dunkelschokolade, geröstete Haselnusssplitter und feiner Kakao-Biskuit.",
        "notify-btn": "Bei Verfügbarkeit benachrichtigen",
        "modal-title": "Bleiben Sie informiert",
        "modal-desc": "Melden Sie sich an, um eine exklusive Benachrichtigung zu erhalten, sobald unser nächstes Bestellfenster öffnet.",
        "submit-btn": "Bestätigen"
    }
};

const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach(button => {
    button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        
        // Changement de la classe active sur les boutons
        langButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        // Traduction des éléments avec l'attribut data-translate
        // Note : Le titre de la marque "La Dune" n'a pas cet attribut et reste intact en français
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    });
});

// ==========================================================================
// 2. MODAL DE NOTIFICATION DE STOCK (EXISTANTE)
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
// 3. FENÊTRES MODALES LÉGALES (IMPRESSUM & PRIVACY - NOUVEAU)
// ==========================================================================
const modalImpressum = document.getElementById("modal-impressum");
const btnImpressum = document.getElementById("open-impressum");
const closeImpressum = document.getElementById("close-impressum");

const modalPrivacy = document.getElementById("modal-privacy");
const btnPrivacy = document.getElementById("open-privacy");
const closePrivacy = document.getElementById("close-privacy");

// Événements d'ouverture
btnImpressum.addEventListener("click", (e) => {
    e.preventDefault();
    modalImpressum.style.display = "block";
});

btnPrivacy.addEventListener("click", (e) => {
    e.preventDefault();
    modalPrivacy.style.display = "block";
});

// Événements de fermeture via boutons 'X'
closeImpressum.addEventListener("click", () => {
    modalImpressum.style.display = "none";
});

closePrivacy.addEventListener("click", () => {
    modalPrivacy.style.display = "none";
});

// Fermeture globale si clic à l'extérieur de la modale active
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
    if (scrollValue < window.innerHeight && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrollValue * 0.4}px) translateZ(-${scrollValue * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrollValue / (window.innerHeight * 0.8));
        heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrollValue * 0.15}px)) scale(${1.05 + scrollValue * 0.0002})`;
    }

    if (scrollValue > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* --- 4. INTERSECTION OBSERVER POUR APPARITIONS --- */
const fadeElements = document.querySelectorAll('.fade-in');
const appearanceOptions = { threshold: 0.05, rootMargin: "0px 0px -20px 0px" };

const appearanceObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearanceOptions);

fadeElements.forEach(element => { appearanceObserver.observe(element); });

/* --- 5. GESTION DE LA BOÎTE MODALE RAPPELEZ-MOI --- */
const modal = document.getElementById('recall-modal');
const modalProductName = document.getElementById('modal-product-name');
const recallEmailInput = document.getElementById('recall-email');

function openRecallModal(productName) {
    modalProductName.innerText = productName;
    modal.classList.add('active');
}

function closeRecallModal() {
    modal.classList.remove('active');
    recallEmailInput.value = '';
}

function handleRecallSubmit(event) {
    event.preventDefault();
    const email = recallEmailInput.value;
    const product = modalProductName.innerText;
    
    if (document.documentElement.lang === 'en') {
        alert(`Thank you. A reminder email will be automatically sent to ${email} as soon as ${product} is back in stock.`);
    } else if (document.documentElement.lang === 'de') {
        alert(`Vielen Dank. Eine Erinnerungs-E-Mail wird automatisch an ${email} gesendet, sobald ${product} wieder lieferbar ist.`);
    } else {
        alert(`Merci. Un e-mail de rappel vous sera automatiquement envoyé à l'adresse ${email} dès le retour en stock de : ${product}.`);
    }
    closeRecallModal();
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) { closeRecallModal(); }
});

/* --- 6. GESTION DU SON ET DE L'AUTOPLAY --- */
const video = document.getElementById('hero-video');
const audioToggleBtn = document.getElementById('audio-toggle');

function forcePlayVideo() {
    if (video) {
        video.muted = true; 
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => { console.log("Attente interaction utilisateur."); });
        }
    }
}

function toggleAudio(event) {
    if(event) event.stopPropagation();
    if (video) {
        video.muted = !video.muted;
        updateAudioButtonVisuals();
        if(!video.muted && video.paused) {
            video.play().catch(() => {});
        }
    }
}

function updateAudioButtonVisuals() {
    if (!video || !audioToggleBtn) return;
    const lang = document.documentElement.lang || 'fr';
    
    if (video.muted) {
        audioToggleBtn.classList.remove('sound-on');
        if(lang === 'en') audioToggleBtn.innerText = '🔇 MUTE';
        else if(lang === 'de') audioToggleBtn.innerText = '🔇 STUMM';
        else audioToggleBtn.innerText = '🔇 MUET';
    } else {
        audioToggleBtn.classList.add('sound-on');
        if(lang === 'en') audioToggleBtn.innerText = '🔊 SOUND';
        else if(lang === 'de') audioToggleBtn.innerText = '🔊 AUDIO';
        else audioToggleBtn.innerText = '🔊 SON';
    }
}

function autoUnmuteOnFirstInteraction() {
    if (video && video.muted) {
        video.muted = false;
        video.volume = 0.6;
        updateAudioButtonVisuals();
        
        video.play().catch(() => {
            video.muted = true;
            updateAudioButtonVisuals();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    forcePlayVideo();
    updateAudioButtonVisuals();
});
window.addEventListener('load', forcePlayVideo);

document.body.addEventListener('click', autoUnmuteOnFirstInteraction, { once: true });
document.body.addEventListener('touchstart', autoUnmuteOnFirstInteraction, { once: true });
document.body.addEventListener('keydown', autoUnmuteOnFirstInteraction, { once: true });

/* --- 7. GESTION DU MENU DÉROULANT DE LANGUE --- */
const langContainer = document.getElementById('lang-container');

function toggleLangMenu(event) {
    event.stopPropagation();
    langContainer.classList.toggle('active');
}

window.addEventListener('click', () => {
    langContainer.classList.remove('active');
});

/* --- 8. SYSTÈME DE TRADUCTION INSTANTANÉE (TRILINGUE) --- */
let currentLang = 'fr';

const dictionary = {
    'title': { fr: 'La Dune Signature | Cosmétique Élégante & Sobre', en: 'La Dune Signature | Elegant & Sober Cosmetics', de: 'La Dune Signature | Elegante & Schlichte Kosmetik' },
    'nav-home': { fr: 'Accueil', en: 'Home', de: 'Startseite' },
    'nav-story': { fr: "L'Histoire", en: 'The Story', de: 'Die Geschichte' },
    'nav-collection': { fr: 'Collection', en: 'Collection', de: 'Kollektion' },
    'nav-contact': { fr: 'Contact', en: 'Contact', de: 'Kontakt' },
    'hero-p': { fr: "L'essentiel de la beauté pure, inspiré par la nature", en: 'The essence of pure beauty, inspired by nature', de: 'Das Wesentliche reiner Schönheit, inspiriert von der Natur' },
    'hero-btn': { fr: 'Découvrir la collection', en: 'Discover the collection', de: 'Kollektion entdecken' },
    'about-tag': { fr: "L'Équilibre Pure", en: 'Pure Balance', de: 'Reine Balance' },
    'about-h2': { fr: 'Notre Philosophie', en: 'Our Philosophy', de: 'Unsere Philosophie' },
    'about-txt': { fr: '"Née du mouvement intemporel du vent sur le sable, La Dune Signature incarne des rituels cosmétiques épurés. Des textures fluides, des formulations d\'une pureté absolue, créées pour révéler l\'éclat authentique et sobre de votre peau."', en: '"Born from the timeless movement of wind on sand, La Dune Signature embodies pure cosmetic rituals. Fluid textures, formulations of absolute purity, created to reveal the authentic and sober radiance of your skin."', de: '"Geboren aus der zeitlosen Bewegung des Windes auf dem Sand, verkörpert La Dune Signature reine kosmetische Rituale. Fließende Texturen, Rezepturen von absoluter Reinheit, kreiert, um die authentische und schlichte Ausstrahlung Ihrer Haut zu enthüllen."' },
    'prod-tag': { fr: 'Édition Limitée', en: 'Limited Edition', de: 'Limitierte Auflage' },
    'prod-h2': { fr: 'La Collection Signature', en: 'The Signature Collection', de: 'Die Signature-Kollektion' },
    
    'p1-title': { fr: "L'Élixir Doré", en: 'The Golden Elixir', de: 'Das Goldene Elixier' },
    'p1-type': { fr: 'Huile de soin régénérante', en: 'Regenerating care oil', de: 'Regenerierendes Pflegeöl' },
    'p1-recall': { fr: "openRecallModal('L\'Élixir Doré')", en: "openRecallModal('The Golden Elixir')", de: "openRecallModal('Das Goldene Elixier')" },
    
    'p2-title': { fr: 'Crème de Soie', en: 'Silk Cream', de: 'Seidencreme' },
    'p2-type': { fr: 'Soin hydratant absolu', en: 'Absolute moisturizing care', de: 'Absolute Feuchtigkeitspflege' },
    'p2-recall': { fr: "openRecallModal('Crème de Soie')", en: "openRecallModal('Silk Cream')", de: "openRecallModal('Seidencreme')" },
    
    'p3-title': { fr: 'Brume de Sable', en: 'Sand Mist', de: 'Sandnebel' },
    'p3-type': { fr: 'Lotion tonique minérale', en: 'Mineral tonic lotion', de: 'Mineralische Tonisierende Lotion' },
    'p3-recall': { fr: "openRecallModal('Brume de Sable')", en: "openRecallModal('Sand Mist')", de: "openRecallModal('Sandnebel')" },
    
    'prod-stock': { fr: 'Rupture de stock', en: 'Out of stock', de: 'Ausverkauft' },
    'prod-btn': { fr: 'Rappelez-moi', en: 'Remind me', de: 'Benachrichtigen Sie mich' },
    
    'modal-p': { fr: 'Inscrivez votre e-mail pour recevoir une notification prioritaire dès que ce produit sera de nouveau disponible.', en: 'Enter your email to receive a priority notification as soon as this product is back in stock.', de: 'Geben Sie Ihre E-Mail-Adresse ein, um eine Benachrichtigung zu erhalten, sobald dieses Produkt wieder verfügbar ist.' },
    'modal-ph': { fr: 'Votre adresse e-mail', en: 'Your email address', de: 'Ihre E-Mail-Adresse' },
    'modal-btn': { fr: "M'avertir de la disponibilité", en: 'Notify me when available', de: 'Benachrichtigen, wenn verfügbar' },
    
    'f-link1': { fr: 'Mentions Légales', en: 'Legal Notice', de: 'Impressum' },
    'f-link2': { fr: 'Politique de Confidentialité', en: 'Privacy Policy', de: 'Datenschutzerklärung' },
    'f-link3': { fr: 'Boutique', en: 'Shop', de: 'Shop' },
    'f-link4': { fr: 'Suivez-nous', en: 'Follow us', de: 'Folgen Sie uns' },
    'f-copy': { fr: '&copy; 2026 LA DUNE SIGNATURE — LRH. TOUS DROITS RÉSERVÉS.', en: '&copy; 2026 LA DUNE SIGNATURE — LRH. ALL RIGHTS RESERVED.', de: '&copy; 2026 LA DUNE SIGNATURE — LRH. ALLE RECHTE VORBEHALTEN.' }
};

function switchLanguage(targetLang) {
    currentLang = targetLang;
    document.documentElement.lang = currentLang;

    document.getElementById('current-lang-label').innerText = currentLang.toUpperCase();
    
    document.querySelectorAll('.lang-custom-menu li').forEach(el => el.classList.remove('selected'));
    document.getElementById(`opt-${currentLang}`).classList.add('selected');

    document.querySelector('title').innerText = dictionary['title'][currentLang];
    document.querySelector('nav ul li:nth-child(1) a').innerText = dictionary['nav-home'][currentLang];
    document.querySelector('nav ul li:nth-child(2) a').innerText = dictionary['nav-story'][currentLang];
    document.querySelector('nav ul li:nth-child(3) a').innerText = dictionary['nav-collection'][currentLang];
    document.querySelector('nav ul li:nth-child(4) a').innerText = dictionary['nav-contact'][currentLang];
    
    document.querySelector('.hero-content p').innerText = dictionary['hero-p'][currentLang];
    document.querySelector('.hero-content .btn-gold').innerText = dictionary['hero-btn'][currentLang];
    
    document.querySelector('.section-about .section-tag').innerText = dictionary['about-tag'][currentLang];
    document.querySelector('.section-about h2').innerText = dictionary['about-h2'][currentLang];
    document.querySelector('.section-about .about-text').innerText = dictionary['about-txt'][currentLang];
    
    document.querySelector('.section-products .section-tag').innerText = dictionary['prod-tag'][currentLang];
    document.querySelector('.section-products h2').innerText = dictionary['prod-h2'][currentLang];
    
    document.querySelector('.product-grid .product-card:nth-child(1) h3').innerText = dictionary['p1-title'][currentLang];
    document.querySelector('.product-grid .product-card:nth-child(1) .product-type').innerText = dictionary['p1-type'][currentLang];
    document.querySelector('.product-grid .product-card:nth-child(1) .btn-recall').setAttribute('onclick', dictionary['p1-recall'][currentLang]);
    
    document.querySelector('.product-grid .product-card:nth-child(2) h3').innerText = dictionary['p2-title'][currentLang];
    document.querySelector('.product-grid .product-card:nth-child(2) .product-type').innerText = dictionary['p2-type'][currentLang];
    document.querySelector('.product-grid .product-card:nth-child(2) .btn-recall').setAttribute('onclick', dictionary['p2-recall'][currentLang]);
    
    document.querySelector('.product-grid .product-card:nth-child(3) h3').innerText = dictionary['p3-title'][currentLang];
    document.querySelector('.product-grid .product-card:nth-child(3) .product-type').innerText = dictionary['p3-type'][currentLang];
    document.querySelector('.product-grid .product-card:nth-child(3) .btn-recall').setAttribute('onclick', dictionary['p3-recall'][currentLang]);
    
    document.querySelectorAll('.stock-status').forEach(el => el.innerText = dictionary['prod-stock'][currentLang]);
    document.querySelectorAll('.btn-recall').forEach(el => el.innerText = dictionary['prod-btn'][currentLang]);
    
    document.querySelector('.modal-box p').innerText = dictionary['modal-p'][currentLang];
    document.getElementById('recall-email').setAttribute('placeholder', dictionary['modal-ph'][currentLang]);
    document.querySelector('.btn-submit').innerText = dictionary['modal-btn'][currentLang];
    
    document.querySelector('.footer-links a:nth-child(1)').innerText = dictionary['f-link1'][currentLang];
    document.querySelector('.footer-links a:nth-child(2)').innerText = dictionary['f-link2'][currentLang];
    document.querySelector('.footer-links a:nth-child(3)').innerText = dictionary['f-link3'][currentLang];
    document.querySelector('.footer-links a:nth-child(4)').innerText = dictionary['f-link4'][currentLang];
    document.querySelector('.copyright').innerHTML = dictionary['f-copy'][currentLang];
    
    updateAudioButtonVisuals();
}

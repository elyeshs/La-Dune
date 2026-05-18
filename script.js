/* --- 1. SÉPARATION LETTRE PAR LETTRE DU TITRE --- */
const titleContainer = document.getElementById('animated-title');
const text = titleContainer.innerText;
titleContainer.innerHTML = '';
[...text].forEach((letter, index) => {
    const span = document.createElement('span');
    span.innerText = letter === ' ' ? '\u00A0' : letter;
    span.style.animationDelay = `${index * 0.1}s`;
    titleContainer.appendChild(span);
});

/* --- 2. SILLAGE DE PARTICULES SOURIS --- */
window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && Math.random() > 0.3) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        const offset = 8;
        trail.style.left = (e.clientX + (Math.random() * offset - offset/2)) + 'px';
        trail.style.top = (e.clientY + (Math.random() * offset - offset/2)) + 'px';
        
        const size = Math.random() * 5 + 3;
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';

        document.body.appendChild(trail);
        setTimeout(() => { trail.remove(); }, 800);
    }
});

/* --- 3. EFFET DE PARALLAXE AU SCROLL --- */
const heroVideo = document.getElementById('hero-video');
const heroContent = document.getElementById('hero-content');
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    let scrollValue = window.scrollY;
    
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

/* --- 5B. GESTION DE LA MODALE POLITIQUE DE CONFIDENTIALITÉ --- */
const privacyModal = document.getElementById('privacy-modal');

function openPrivacyModal(event) {
    if(event) event.preventDefault();
    privacyModal.classList.add('active');
}

function closePrivacyModal() {
    privacyModal.classList.remove('active');
}

privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) { closePrivacyModal(); }
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
    
    /* Textes de la Politique de Confidentialité (Conforme RGPD) */
    'privacy-title': { fr: 'Politique de Confidentialité', en: 'Privacy Policy', de: 'Datenschutzerklärung' },
    'privacy-intro': { fr: 'Conformément au Règlement Général sur la Protection des Données (RGPD) et aux réglementations européennes, nous accordons une importance capitale à la confidentialité de vos informations.', en: 'In accordance with the General Data Protection Regulation (GDPR) and European regulations, we attach paramount importance to the confidentiality of your information.', de: 'In Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) und den europäischen Vorschriften legen wir höchsten Wert auf die Vertraulichkeit Ihrer Informationen.' },
    'privacy-h1': { fr: '1. Collecte des données', en: '1. Data Collection', de: '1. Datenerhebung' },
    'privacy-p1': { fr: 'Nous collectons uniquement votre adresse e-mail de manière volontaire lorsque vous demandez à être averti d’un réapprovisionnement.', en: 'We only collect your email address on a voluntary basis when you request to be notified of a restock.', de: 'Wir erfassen Ihre E-Mail-Adresse ausschließlich auf freiwilliger Basis, wenn Sie benachrichtigt werden möchten, sobald ein produit wieder auf Lager ist.' },
    'privacy-h2': { fr: '2. Utilisation et Confidentialité', en: '2. Use and Confidentiality', de: '2. Nutzung und Vertraulichkeit' },
    'privacy-p2': { fr: 'Cette adresse est exclusivement réservée à l’envoi de la notification de stock demandée. Elle ne sera jamais vendue, échangée ou partagée avec des tiers.', en: 'This address is exclusively reserved for sending the requested stock notification. It will never be sold, exchanged, or shared with third parties.', de: 'Diese Adresse ist ausschließlich für den Versand der angeforderten Bestandsbenachrichtigung reserviert. Sie wird niemals verkauft, getauscht oder an Dritte weitergegeben.' },
    'privacy-h3': { fr: '3. Vos Droits (RGPD)', en: '3. Your Rights (GDPR)', de: '3. Ihre Rechte (DSGVO)' },
    'privacy-p3': { fr: 'Vous bénéficiez d’un droit d’accès, de rectification, de limitation et de suppression de vos données personnelles. Vous pouvez retirer votre consentement à tout moment en nous contactant.', en: 'You have the right to access, rectify, limit, and erase your personal data. You can withdraw your consent at any time by contacting us.', de: 'Sie haben das Recht auf Auskunft, Berichtigung, Einschränkung und Löschung Ihrer personenbezogenen Daten. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie uns kontaktieren.' },
    'privacy-btn': { fr: 'Fermer', en: 'Close', de: 'Schließen' },

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
    
    /* Traduction dynamique de la modale de confidentialité */
    document.getElementById('privacy-modal-title').innerText = dictionary['privacy-title'][currentLang];
    document.getElementById('privacy-modal-intro').innerText = dictionary['privacy-intro'][currentLang];
    document.getElementById('privacy-modal-h1').innerText = dictionary['privacy-h1'][currentLang];
    document.getElementById('privacy-modal-p1').innerText = dictionary['privacy-p1'][currentLang];
    document.getElementById('privacy-modal-h2').innerText = dictionary['privacy-h2'][currentLang];
    document.getElementById('privacy-modal-p2').innerText = dictionary['privacy-p2'][currentLang];
    document.getElementById('privacy-modal-h3').innerText = dictionary['privacy-h3'][currentLang];
    document.getElementById('privacy-modal-p3').innerText = dictionary['privacy-p3'][currentLang];
    document.getElementById('privacy-modal-btn').innerText = dictionary['privacy-btn'][currentLang];

    document.querySelector('.footer-links a:nth-child(1)').innerText = dictionary['f-link1'][currentLang];
    document.querySelector('.footer-links a:nth-child(2)').innerText = dictionary['f-link2'][currentLang];
    document.querySelector('.footer-links a:nth-child(3)').innerText = dictionary['f-link3'][currentLang];
    document.querySelector('.footer-links a:nth-child(4)').innerText = dictionary['f-link4'][currentLang];
    document.querySelector('.copyright').innerHTML = dictionary['f-copy'][currentLang];
    
    updateAudioButtonVisuals();
}

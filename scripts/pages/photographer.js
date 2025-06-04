// fct qui me permet de récupérer l'id du photographe directement depuis l’URL.
async function getPhotographerById(id) {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        const photographer = data.photographers.find((p) => p.id === parseInt(id));
        return photographer;
    } catch (error) {
        console.error('Erreur lors de la récupération du photographe:', error);
    }
}

function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function getPhotographerMediasById(id) {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        const medias = data.media.filter((m) => m.photographerId === parseInt(id));
        return { media: medias };
    } catch (error) {
        console.error('Erreur lors de la récupération des médias du photographe:', error);
    }
}

function updateTotalLikes(increment) {
    const totalLikesCount = document.getElementById('total-likes-count');
    totalLikesCount.textContent = parseInt(totalLikesCount.textContent) + increment;
}

let mediaArray = []; // Ma variable pour stocker les médias globalement
let photographerData = {}; // Ma viariable pour stocker le photographe

async function init() {
    const photographerId = getPhotographerIdFromURL();
    photographerData = await getPhotographerById(photographerId);
    const { media } = await getPhotographerMediasById(photographerId);
    mediaArray = media; // Je stocke dans la variable globale

    const photographerModel = photographerTemplate(photographerData);
    photographerModel.getUserHeaderDOM();
    photographerModel.getUserPriceDOM();

    const photographerNameElement = document.getElementById('photographer-name');
    photographerNameElement.textContent = photographerData.name;

    initMediaDisplay('popularity'); // J'afficher trié par popularité au début

    // Initiation de la lightbox après affichage des médias
    initLightbox(mediaArray, photographerData.name);

    // Initiation de ma gestion de tri
    initSort();
}

function initSort() {
    const sortSelect = document.getElementById('sort-select');

    sortSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        initMediaDisplay(selectedValue);
    });
}

function initMediaDisplay(criteria) {
    const mediaSection = document.querySelector('.media_section');
    mediaSection.innerHTML = ''; // Je vide

    let sortedMedia = [...mediaArray];

    switch (criteria) {
        case 'popularity':
            sortedMedia.sort((a, b) => b.likes - a.likes);
            break;
        case 'date':
            sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title':
            sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    sortedMedia.forEach((m) => {
        const mediaModel = mediaFactory(m, photographerData.name.replace(/\s/g, ' '));
        const mediaCard = mediaModel.getMediaDOM();
        mediaSection.appendChild(mediaCard);
    });

    // Je recalcule le total likes après tri
    const totalInitialLikes = sortedMedia.reduce((acc, m) => acc + m.likes, 0);
    document.getElementById('total-likes-count').textContent = totalInitialLikes;
    document.getElementById('price-per-day').textContent = `${photographerData.price}€ / jour`;

    // Je réinitialiser la lightbox avec les nouveaux médias triés
    initLightbox(sortedMedia, photographerData.name);
}

init();

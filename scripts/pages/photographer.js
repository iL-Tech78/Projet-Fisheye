// maj des likes
function updateTotalLikes(increment) {
  const totalLikesCount = document.getElementById('total-likes-count');
  totalLikesCount.textContent = parseInt(totalLikesCount.textContent, 10) + increment;
}

// fct qui recup le photographe spécifique en fonction de l'ID
async function getPhotographerById(id) {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const photographer = data.photographers.find(
      (p) => p.id === parseInt(id, 10),
    );
    return photographer;
  } catch (error) {
    console.error('Erreur lors de la récupération du photographe :', error);
    return null;
  }
}

// qui lit l'URL pour récupérer l’ID du photographe.
function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// recup tous les médias associés au photographerId.
async function getPhotographerMediasById(id) {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const medias = data.media.filter(
      (m) => m.photographerId === parseInt(id, 10),
    );
    return { media: medias };
  } catch (error) {
    console.error('Erreur lors de la récupération des médias du photographe :', error);
    return { media: [] };
  }
}

let mediaArray = []; // Variable globale pour stocker les médias
let photographerData = {}; // Variable globale pour stocker les données du photographe

async function init() {
  const photographerId = getPhotographerIdFromURL();
  photographerData = await getPhotographerById(photographerId);
  const { media } = await getPhotographerMediasById(photographerId);
  mediaArray = media;

  const photographerModel = photographerTemplate(photographerData);
  photographerModel.getUserHeaderDOM();
  photographerModel.getUserPriceDOM();

  const photographerNameElement = document.getElementById('photographer-name');
  photographerNameElement.textContent = photographerData.name;

  initMediaDisplay('popularity');
  initLightbox(mediaArray, photographerData.name);
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
  mediaSection.innerHTML = '';

  const sortedMedia = [...mediaArray];

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
    default:
      break;
  }

  sortedMedia.forEach((m) => {
    const mediaModel = mediaFactory(m, photographerData.name.replace(/\s/g, ' '));
    const mediaCard = mediaModel.getMediaDOM();
    mediaSection.appendChild(mediaCard);
  });

  const totalInitialLikes = sortedMedia.reduce((acc, m) => acc + m.likes, 0);
  document.getElementById('total-likes-count').textContent = totalInitialLikes;
  document.getElementById('price-per-day').textContent = `${photographerData.price}€ / jour`;

  initLightbox(sortedMedia, photographerData.name);
}

init();

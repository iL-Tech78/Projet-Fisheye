let currentMediaIndex = 0;
let mediaList = [];

const lightboxModal = document.getElementById('lightbox_modal');
const lightboxContent = document.querySelector('.lightbox_content');
const closeBtn = document.querySelector('.lightbox_close');
const prevBtn = document.querySelector('.lightbox_prev');
const nextBtn = document.querySelector('.lightbox_next');

// J'ouvrir la Lightbox
function openLightbox(index) {
  currentMediaIndex = index;
  displayMedia();
  lightboxModal.style.display = 'flex';
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Je bloque le scroll
}

// J'afficher le média actuel
function displayMedia() {
  const media = mediaList[currentMediaIndex];
  lightboxContent.innerHTML = '';

  let mediaElement;

  if (media.image) {
    mediaElement = document.createElement('img');
    mediaElement.src = `assets/photographers/${media.photographerName}/${media.image}`;
    mediaElement.alt = media.title;
  } else if (media.video) {
    mediaElement = document.createElement('video');
    mediaElement.src = `assets/photographers/${media.photographerName}/${media.video}`;
    mediaElement.setAttribute('controls', '');
    mediaElement.setAttribute('aria-label', media.title);
  }

  const title = document.createElement('h2');
  title.textContent = media.title;

  lightboxContent.appendChild(mediaElement);
  lightboxContent.appendChild(title);
}

// Je fermer la Lightbox
function closeLightbox() {
  lightboxModal.style.display = 'none';
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}


function showNext() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
  displayMedia();
}

function showPrev() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
  displayMedia();
}

// J'écoute
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

window.addEventListener('keydown', (e) => {
  if (lightboxModal.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  }
});

// Initialisation : je récupère tous les médias au clic
function initLightbox(medias, photographerName) {
  mediaList = medias.map((m) => ({
    ...m,
    photographerName
  }));

  const mediaElements = document.querySelectorAll('.media_section article img, .media_section article video');

  mediaElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      openLightbox(index);
    });

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openLightbox(index);
      }
    });
  });
}

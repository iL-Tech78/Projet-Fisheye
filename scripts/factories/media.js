// fct pour créer dynamiquement les médias.
function updateTotalLikes(increment) {
  const totalLikesCount = document.getElementById('total-likes-count');
  totalLikesCount.textContent = parseInt(totalLikesCount.textContent, 10) + increment;
}

function mediaFactory(media, photographerName) { 
  // media : json avec les photo et videos
  // photographerName : pour avoir le bon chemin
  const {
    title, image, video, likes,
  } = media; // destructuration

  const mediaFolder = `assets/photographers/${photographerName}/`;

  function getMediaDOM() {
    // Creation de l'article
    const article = document.createElement('article');

    let mediaElement;
    if (image) { // si l’objet media a une propriété image
      mediaElement = document.createElement('img');
      mediaElement.setAttribute('src', `${mediaFolder}${image}`);
      mediaElement.setAttribute('alt', title);
    } else if (video) { // sinon si l’objet media a une propriété video
      mediaElement = document.createElement('video');
      mediaElement.setAttribute('src', `${mediaFolder}${video}`);
      mediaElement.setAttribute('aria-label', title);
      mediaElement.setAttribute('controls', '');
    }

    // Création du footer
    const footer = document.createElement('div');
    footer.classList.add('media-footer');

    const mediaTitle = document.createElement('h2');
    mediaTitle.textContent = title;

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes');

    const likesCount = document.createElement('span');
    likesCount.textContent = likes;

    const likeIcon = document.createElement('i');
    likeIcon.classList.add('fas', 'fa-heart');
    likeIcon.setAttribute('tabindex', '0'); // Accessibilité
    likeIcon.style.cursor = 'pointer';

    // Assemblage des éléments
    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likeIcon);

    footer.appendChild(mediaTitle);
    footer.appendChild(likesContainer);

    article.appendChild(mediaElement);
    article.appendChild(footer);

    // Gestion des likes
    let liked = false;
    likeIcon.addEventListener('click', () => {
      if (!liked) {
        likesCount.textContent = parseInt(likesCount.textContent, 10) + 1;
        updateTotalLikes(1); // Ajoute au total
        liked = true;
      }
    });

    // Accessibilité clavier
    likeIcon.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !liked) {
        likesCount.textContent = parseInt(likesCount.textContent, 10) + 1;
        updateTotalLikes(1);
        liked = true;
      }
    });

    return article;
  }

  return { getMediaDOM };
}

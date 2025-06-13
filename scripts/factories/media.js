// Fonction pour mettre à jour le total de likes
function updateTotalLikes(increment) {
  const totalLikesCount = document.getElementById('total-likes-count');
  totalLikesCount.textContent = parseInt(totalLikesCount.textContent, 10) + increment;
}

// Factory Pattern pour créer dynamiquement les médias
function mediaFactory(media, photographerName) {
  const {
    title, image, video, likes,
  } = media;

  const mediaFolder = `assets/photographers/${photographerName}/`;

  function getMediaDOM() {
    const article = document.createElement('article');
    let mediaElement;

    if (image) {
      mediaElement = document.createElement('img');
      mediaElement.setAttribute('src', `${mediaFolder}${image}`);
      mediaElement.setAttribute('alt', title);
      mediaElement.setAttribute('tabindex', '0');
    } else if (video) {
      mediaElement = document.createElement('video');
      mediaElement.setAttribute('src', `${mediaFolder}${video}`);
      mediaElement.setAttribute('aria-label', title);
      mediaElement.setAttribute('tabindex', '0');
      mediaElement.setAttribute('preload', 'metadata');
      mediaElement.setAttribute('playsinline', '');
      mediaElement.setAttribute('muted', '');
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
    likeIcon.setAttribute('tabindex', '0');
    likeIcon.setAttribute('role', 'button');
    likeIcon.setAttribute('aria-label', `Ajouter un like à ${title}`);
    likeIcon.style.cursor = 'pointer';

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
        updateTotalLikes(1);
        liked = true;
      }
    });

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

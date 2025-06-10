const modal = document.getElementById('contact_modal');
const closeButton = document.querySelector('.modal header img');
const firstInput = document.querySelector('#contact_modal form input');

function displayModal() {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // pour bloquer le scroll de la page derrière
  firstInput.focus(); // focus sur le premier champ
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto'; // Réactiver le scroll
}

// Fermer avec la touche "Escape"
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

// Fermer en cliquant sur le bouton (X)
closeButton.addEventListener('click', closeModal);

const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    prenom: form.prenom.value,
    nom: form.nom.value,
    email: form.email.value,
    message: form.message.value,
  };

  console.log('Formulaire envoyé :', formData);
  closeModal();
});

// Fonction pour récupérer les photographes
async function getPhotographers() {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des photographes :', error);
    return null;
  }
}

// Fonction pour afficher les photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction d'initialisation
async function init() {
  // Récupère les données des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

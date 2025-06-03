async function getPhotographerById(id) { // fct qui me permet de récupérer l'id du photographe directement depuis l’URL.
    try {
        const response = await fetch('data/photographers.json'); // cherche les données JSON.
        const data = await response.json(); // convertion en objet JavaScript.

        // Je le photographe avec l'id correspondant grace a .find
        const photographer = data.photographers.find((p) => p.id === parseInt(id)); // trouve le bon photographe en comparant les id.

        console.log(photographer);

        return photographer;
    } catch (error) {
        console.error('Erreur lors de la récupération du photographe:', error);
    }
}

function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
    // si photographer.html?id=243 : params.get('id') me retourne "243".
}

async function init() {
    const photographerId = getPhotographerIdFromURL();
    const photographerData = await getPhotographerById(photographerId);
}

init();


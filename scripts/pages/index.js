    async function getPhotographers() { // fct qui me permet de recup les données de mes photographes en local.
        try {            
            const response = await fetch('data/photographers.json');
            const data = await response.json(); 
    
            console.log(data);
    
            return data; 
        } catch (error) {
            console.error('Erreur lors de la récupération des photographes:', error);
        }
    }

    async function displayData(photographers) { // fct qui permet d'afficher chaque photographe
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers(); // j'appelle getPhotographers() pour récupérer les données
        displayData(photographers); // j'utilise displayData() pour afficher les photographes sur la page d’accueil
    }
    
    init();
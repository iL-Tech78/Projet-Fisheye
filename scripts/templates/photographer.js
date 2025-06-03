// Factory Pattern pour créer dynamiquement les cartes de photographes.
function photographerTemplate(data) {
    // j'extrait les données dont j'ai besoin 
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // 
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', name); // Accessibilité

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name); // Accessibilité

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('photographer-location');

        const tagLine = document.createElement('p');
        tagLine.textContent = tagline;
        tagLine.classList.add('photographer-tagline');

        const priceElement = document.createElement('p');
        priceElement.textContent = `${price}€/jour`;
        priceElement.classList.add('photographer-price');

        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(tagLine);
        article.appendChild(priceElement);

        return article;
    }

    return { name, picture, getUserCardDOM }
}

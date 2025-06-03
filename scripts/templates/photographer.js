// Factory Pattern pour créer dynamiquement les cartes de photographes.
function photographerTemplate(data) {
    // j'extrait les données dont j'ai besoin 
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Portrait/${portrait}`;


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

    function getUserHeaderDOM() {
        const header = document.querySelector('.photograph-header');

        const info = document.createElement('div');
        info.classList.add('photograph-info');

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const location = document.createElement('p');
        location.classList.add('photographer-location');
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.classList.add('photographer-tagline');
        taglineElement.textContent = tagline;

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);

        info.appendChild(h1);
        info.appendChild(location);
        info.appendChild(taglineElement);

        // Je place les éléments avant le bouton
        header.insertBefore(info, header.querySelector('.contact_button'));
        header.appendChild(img);
    }

    function getUserPriceDOM() {
        const priceDiv = document.querySelector('.photographer-price');
        priceDiv.textContent = `${price}€/jour`;
    }

    return { name, picture, getUserCardDOM, getUserHeaderDOM, getUserPriceDOM };
}

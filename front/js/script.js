let href = document.getElementById('items').getElementsByTagName('a');
let img = document.getElementsByTagName('img');
let title = document.getElementsByClassName('productName');
let paragraph = document.getElementsByClassName('productDescription');

// Connexion vers l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    // Variables
    let product = document.getElementById('items');
    let link;
    let imageSrc;
    let imageAlt;
    let titleProduct;
    let description;

    // Création des produits : on fait une boucle pour ajouter dans le DOM chaque produit
    for (i = 0; i < data.length; i++) {
      product.innerHTML += `
    <a href="${link}">
      <article>
        <img src="${imageSrc}" alt="${imageAlt}">
        <h3 class="productName">${titleProduct}</h3>
        <p class="productDescription">${description}</p>
      </article>
    </a>`;
      // On stock dans des variables le chemin vers chaque éléments HTML
      // Et on lui donne les données de l'API
      link = href[0].href = './product.html?id=' + data[i]._id;
      imageSrc = img[5].src = data[i].imageUrl;
      imageAlt = img[5].alt = data[i].altTxt;
      titleProduct = title[0].innerHTML = data[i].name;
      description = paragraph[0].innerHTML = data[i].description;
    }
  });

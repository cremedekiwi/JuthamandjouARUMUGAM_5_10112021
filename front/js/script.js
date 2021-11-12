// Connexion vers l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    // Variables
    let product = document.getElementById('items');

    // Création des produits : on fait une boucle pour ajouter dans le DOM chaque produit
    for (i = 0; i < data.length; i++) {
      product.innerHTML += `
    <a href="./product.html?id=${data[i]._id}">
      <article>
        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
        <h3 class="productName">${data[i].name}</h3>
        <p class="productDescription">${data[i].description}</p>
      </article>
    </a>`;
    }
  });

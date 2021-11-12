// Récupérer l'id dans l'url
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get('id');
// console.log(id);

// Connexion vers l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    // Trouver le tableau correspondant à l'ID dans l'API
    function findArray(id) {
      return data.find((a) => a._id === id);
    }

    let myArray = findArray(id);

    // VAR des éléments HTML
    let image = document.getElementsByClassName('item__img');
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let description = document.getElementById('description');

    // Affectation des données de l'API
    image[0].innerHTML = `<img src="${myArray.imageUrl}" alt="${myArray.altTxt}">`;
    title.innerHTML = myArray.name;
    price.innerHTML = myArray.price;
    description.innerHTML = myArray.description;

    // Liste déroulante

    let option = document.getElementsByTagName('option');

    for (i = 0; i < myArray.colors.length; i++) {
      option[0].insertAdjacentHTML(
        'afterend',
        `<option value="${myArray.colors[i]}">${myArray.colors[i]}</option>`
      );
    }
  });

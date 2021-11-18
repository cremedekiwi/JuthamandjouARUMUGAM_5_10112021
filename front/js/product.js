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
    let colors = document.getElementById('colors');

    // Affectation des données de l'API
    image[0].innerHTML = `<img src="${myArray.imageUrl}" alt="${myArray.altTxt}">`;
    title.innerHTML = myArray.name;
    price.innerHTML = myArray.price;
    description.innerHTML = myArray.description;
    // Liste déroulante
    for (i = 0; i < myArray.colors.length; i++) {
      colors.insertAdjacentHTML(
        'beforeend',
        `<option value="${myArray.colors[i]}">${myArray.colors[i]}</option>`
      );
    }

    // Gestion du panier
    // Liste déroulante
    const idForm = document.querySelector('#colors');
    const quantity = document.querySelector('#quantity');
    const sendCart = document.querySelector('#addToCart');

    sendCart.addEventListener('click', (event) => {
      const formChoice = idForm.value;

      // Récuperer les valeurs du produit dans un objet
      let optionProduct = {
        _id: id,
        qty: quantity.value,
        colors: formChoice,
      };

      // Local Storage
      let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'));

      // Ajouter un produit sélectionné dans le localStorage
      const addProductLocalStorage = () => {
        saveProductLocalStorage.push(optionProduct);
        localStorage.setItem(
          'product',
          JSON.stringify(saveProductLocalStorage)
        );
      };

      // Modifier un produit sélectionné dans le localStorage
      const modifyProductLocalStorage = () => {
        // Trouver l'index d'une couleur
        let indexColor = saveProductLocalStorage
          .map((e) => e.colors)
          .indexOf(optionProduct.colors);

        saveProductLocalStorage.splice(indexColor, 1, optionProduct);
        localStorage.setItem(
          'product',
          JSON.stringify(saveProductLocalStorage)
        );
      };

      // SI couleur non définie & quantité à 0, ne rien faire
      if (optionProduct.colors !== '' && optionProduct.qty > 0) {
        // SI le tableau existe, AJOUTER le PRODUIT
        if (saveProductLocalStorage) {
          // SI la couleur existe, MODIFIER le produit
          if (
            Object.values(optionProduct).includes(
              saveProductLocalStorage[0].colors
            )
          ) {
            modifyProductLocalStorage();
            console.log('modifier');
            // SINON ajouter le produit
          } else {
            addProductLocalStorage();
            console.log('ajouter');
          }
          // SINON créer le tableau puis AJOUTER le produit
        } else {
          saveProductLocalStorage = [];
          addProductLocalStorage();
          console.log('créer');
        }
      }
    });
  });

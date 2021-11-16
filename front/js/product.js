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

      // Si déjà un produit dans le local storage
      if (saveProductLocalStorage) {
        addProductLocalStorage();
      }
      // Si pas de produit dans le local storage, créer le tableau
      else {
        saveProductLocalStorage = [];
        addProductLocalStorage();
      }

      console.log(saveProductLocalStorage);

      // for (i = 0; i < saveProductLocalStorage.length; i++) {
      //   // test = saveProductLocalStorage[i]._id;
      //   let test = saveProductLocalStorage[i].qty++;
      //   console.log(test);
      // }
    });
  });

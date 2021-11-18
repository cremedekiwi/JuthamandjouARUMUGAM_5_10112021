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
    let image = document.getElementsByClassName('item__img')[0];
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let description = document.getElementById('description');
    let colors = document.getElementById('colors');

    // Affectation des données de l'API
    image.innerHTML = `<img src="${myArray.imageUrl}" alt="${myArray.altTxt}">`;
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
        qty: quantity.value,
        colors: formChoice,
        _id: id,
        name: title.innerHTML,
        price: price.innerHTML,
        imageUrl: image,
        alttxt: image,
      };

      // Local Storage
      let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'));

      // Ajoute à l'emplacement de stockage, sinon met à jour la valeur si la clé existe déjà
      const setItem = () => {
        localStorage.setItem(
          'product',
          JSON.stringify(saveProductLocalStorage)
        );
      };

      // Ajoute un produit sélectionné dans le localStorage
      const addProductLocalStorage = () => {
        saveProductLocalStorage.push(optionProduct);
        setItem();
      };

      // SI la couleur est vide et que la quantité est 0, ne rien faire
      if (optionProduct.colors == '' && optionProduct.qty === 0) {
        console.log('pas de valeurs');
      }

      // SI pas de produit dans le LS, créer le tableau
      if (!saveProductLocalStorage) {
        saveProductLocalStorage = [];
        addProductLocalStorage();
      }
      // Trouve l'index qui a la même couleur, ou la même ID
      else {
        let index = saveProductLocalStorage.findIndex(
          (e) =>
            e.colors === optionProduct.colors && e._id === optionProduct._id
        );
        // SI le produit existe, modifie la quantité
        if (index !== -1) {
          saveProductLocalStorage[index].qty = optionProduct.qty;
          setItem();
        }
        // SINON crée le produit
        else {
          addProductLocalStorage();
        }
      }
    });
  });

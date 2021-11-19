// Récupérer l'id dans l'url
let str = window.location.href
let url = new URL(str)
let id = url.searchParams.get('id')

// Connexion vers l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    // Trouver le tableau correspondant à l'ID dans l'API
    function findObject(id) {
      return data.find((o) => o._id === id)
    }

    let myObject = findObject(id)

    // VAR des éléments HTML
    let image = document.getElementsByClassName('item__img')[0]
    let title = document.getElementById('title')
    let price = document.getElementById('price')
    let description = document.getElementById('description')
    let colors = document.getElementById('colors')

    // Affectation des données de l'API
    image.innerHTML = `<img src="${myObject.imageUrl}" alt="${myObject.altTxt}">`
    title.innerHTML = myObject.name
    price.innerHTML = myObject.price
    description.innerHTML = myObject.description
    // Liste déroulante
    for (i = 0; i < myObject.colors.length; i++) {
      colors.insertAdjacentHTML(
        'beforeend',
        `<option value="${myObject.colors[i]}">${myObject.colors[i]}</option>`
      )
    }

    // Gestion du panier
    // Liste déroulante
    let idForm = document.querySelector('#colors')
    let quantity = document.querySelector('#quantity')
    let sendCart = document.querySelector('#addToCart')
    // Images
    let imageSrc = document.getElementsByTagName('img')[5].src
    let imageAlt = document.getElementsByTagName('img')[5].alt

    sendCart.addEventListener('click', (event) => {
      // Récuperer les valeurs du produit dans un objet
      let optionProduct = {
        qty: quantity.value,
        colors: idForm.value,
        _id: id,
        name: title.innerHTML,
        price: price.innerHTML,
        imageUrl: imageSrc,
        alttxt: imageAlt,
      }

      // Local Storage
      let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'))

      // Ajoute à l'emplacement de stockage, sinon met à jour la valeur si la clé existe déjà
      let setItem = () => {
        localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
      }

      // Ajoute un produit sélectionné dans le localStorage
      let addProductLocalStorage = () => {
        saveProductLocalStorage.push(optionProduct)
        setItem()
      }

      // SI la couleur est vide et que la quantité est 0, ne rien faire
      if (
        optionProduct.colors == '' ||
        optionProduct.qty <= 0 ||
        optionProduct.qty > 100
      ) {
        console.log('pas de valeurs')
      } else {
        // SI pas de produit dans le LS, crée le tableau
        if (!saveProductLocalStorage) {
          saveProductLocalStorage = []
          addProductLocalStorage()
          console.log('crée le tableau')
        }
        // Trouve l'index qui a la même couleur, ou la même ID
        else {
          let index = saveProductLocalStorage.findIndex(
            (e) =>
              e.colors === optionProduct.colors && e._id === optionProduct._id
          )
          // SI le produit existe, modifie la quantité
          if (index !== -1) {
            saveProductLocalStorage[index].qty = optionProduct.qty
            setItem()
            console.log('modifie la quantité')
          }
          // SINON crée le produit
          else {
            addProductLocalStorage()
            console.log('ajoute le produit')
          }
        }
      }
    })
  })

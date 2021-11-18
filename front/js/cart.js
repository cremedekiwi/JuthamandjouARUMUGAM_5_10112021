// Connexion vers l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    let cartItems = document.querySelector('#cart__items')

    // Récupère les données du localStorage
    let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'))

    // Boucle avec tout les produits du Storage
    for (let i = 0; i < saveProductLocalStorage.length; i++) {
      cartItems.innerHTML += `<article
      class="cart__item"
      data-id="${saveProductLocalStorage[i]._id}"
      data-color="${saveProductLocalStorage[i].colors}"
    >
      <div class="cart__item__img">
        <img src="${saveProductLocalStorage[i].imageUrl}" alt="${saveProductLocalStorage[i].alttxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${saveProductLocalStorage[i].name}</h2>
          <p>${saveProductLocalStorage[i].colors}</p>
          <p>${saveProductLocalStorage[i].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input
              type="number"
              class="itemQuantity"
              name="itemQuantity"
              min="1"
              max="100"
              value="${saveProductLocalStorage[i].qty}"
            />
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>;`
    }

    // Stock les éléments dans des tableaux
    let deleteItemContainer = [...document.getElementsByClassName('deleteItem')]
    let quantity = [...document.getElementsByClassName('itemQuantity')]

    // Boucle dans le tableau
    deleteItemContainer.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Au click, supprime l'item dans le DOM et sur le LocalStorage
        let pickArticle = deleteItemContainer[index].closest('.cart__item')
        pickArticle.remove()
        saveProductLocalStorage.splice(index, 1)
        // UP sur le local storage la supression
        localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
      })
    })

    // Boucle dans le tableau
    quantity.forEach((item, index) => {
      // Au click, modifie l'item sur le LocalStorage
      item.addEventListener('click', () => {
        saveProductLocalStorage[index].qty = quantity[index].value
        localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
      })
    })
  })

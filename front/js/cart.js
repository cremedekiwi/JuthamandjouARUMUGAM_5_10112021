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
    </article>`
}

// Stock les éléments dans des tableaux
let deleteItemContainer = [...document.getElementsByClassName('deleteItem')]
let quantityContainer = [...document.getElementsByClassName('itemQuantity')]

deleteItemContainer.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Supprime dans le DOM
    let pickArticle = deleteItemContainer[index].closest('.cart__item')
    pickArticle.remove()
    // Supprime dans le local storage
    saveProductLocalStorage.splice(index, 1)
    localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
    location.reload()
  })
})

quantityContainer.forEach((item, index) => {
  // Au click, modifie l'item sur le LocalStorage
  item.addEventListener('click', () => {
    saveProductLocalStorage[index].qty = quantityContainer[index].value
    localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
  })
})

console.log(saveProductLocalStorage[0])

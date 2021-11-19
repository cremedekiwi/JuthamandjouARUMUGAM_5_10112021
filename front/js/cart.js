// Sélectionne la div pour afficher les articles
let cartItems = document.querySelector('#cart__items')
// Récupère les données du localStorage
let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'))

// Affiche tout les produits du pannier
if (saveProductLocalStorage !== null) {
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
}

// Stock les éléments dans des tableaux
let deleteItemContainer = [...document.getElementsByClassName('deleteItem')]
let quantityContainer = [...document.getElementsByClassName('itemQuantity')]

// Supprime le produit
deleteItemContainer.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Dans le DOM
    let pickArticle = deleteItemContainer[index].closest('.cart__item')
    pickArticle.remove()
    // Dans le local storage
    saveProductLocalStorage.splice(index, 1)
    localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
    location.reload()
  })
})

// Modifie la quantité
quantityContainer.forEach((item, index) => {
  // Au click, modifie l'item sur le LocalStorage
  item.addEventListener('click', () => {
    saveProductLocalStorage[index].qty = quantityContainer[index].value
    localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
    location.reload()
  })
})

// Total des articles et somme
let sumProduct = 0
let sumMoney = 0
let totalQuantity = document.querySelector('#totalQuantity')
let totalMoney = document.querySelector('#totalPrice')

if (saveProductLocalStorage !== null) {
  for (let q = 0; q < saveProductLocalStorage.length; q++) {
    let quantityLoop = parseInt(saveProductLocalStorage[q].qty)
    let moneyLoop = parseInt(saveProductLocalStorage[q].price)
    sumProduct += quantityLoop
    sumMoney += moneyLoop * quantityLoop
  }
}

totalQuantity.innerHTML = sumProduct
totalMoney.innerHTML = sumMoney

// Formulaire Contact

addEventListener('change', () => {
  // event.preventDefault(event)

  let firstName = document.getElementById('firstName').value
  let lastName = document.getElementById('lastName').value
  let address = document.getElementById('address').value
  let city = document.getElementById('city').value
  let mail = document.getElementById('email').value

  function validFirstName() {
    let text = document.getElementById('firstNameErrorMsg')
    let pattern = /^[a-z ,.'-]+$/i

    if (firstName.match(pattern)) {
      text.innerHTML = 'Prénom valide'
      text.style.color = '#00ff00'
      return firstName
    } else {
      text.innerHTML = 'Merci de rentrer un prénom valide'
      text.style.color = '#fbbcbc'
    }
    if (firstName == '') {
      text.innerHTML = ''
    }

    console.log(text.innerHTML)
  }

  function validLastName() {
    let text = document.getElementById('lastNameErrorMsg')
    let pattern = /^[a-z ,.'-]+$/i

    if (lastName.match(pattern)) {
      text.innerHTML = 'Nom valide'
      text.style.color = '#00ff00'
      return lastName
    } else {
      text.innerHTML = 'Merci de rentrer un nom valide'
      text.style.color = '#fbbcbc'
      lastName = ''
    }
    if (lastName == '') {
      text.innerHTML = ''
    }
  }

  function validAdress() {
    let text = document.getElementById('addressErrorMsg')
    let pattern = '([0-9a-zA-Z,. ]*) ?([0-9]{5}) ?([a-zA-Z]*)'

    if (address.match(pattern)) {
      text.innerHTML = 'Adresse postale valide'
      text.style.color = '#00ff00'
      return address
    } else {
      text.innerHTML =
        'Merci de rentrer une adresse valide : numéro + rue/bd/av + code postal'
      text.style.color = '#fbbcbc'
      address = ''
    }
    if (address == '') {
      text.innerHTML = ''
    }
  }

  function validCity() {
    let text = document.getElementById('cityErrorMsg')
    let pattern = /^[a-z ,.'-]+$/i

    if (city.match(pattern)) {
      text.innerHTML = 'Ville valide'
      text.style.color = '#00ff00'
      return city
    } else {
      text.innerHTML = 'Merci de rentrer une ville valide'
      text.style.color = '#fbbcbc'
      city = ''
    }
    if (city == '') {
      text.innerHTML = ''
    }
  }

  function validEmail() {
    let text = document.getElementById('emailErrorMsg')
    // ^ : début
    // dans les crochets ce qu'on peut écrire, miniscule, majustucle, nombre, point, tiret, underscore
    // après le '+' l'élément suivant ; puis entre accolade le nombre de fois où il peut être répété
    // $ : fin
    let pattern = new RegExp(
      '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
      'g'
    )

    if (mail.match(pattern)) {
      text.innerHTML = 'Adresse email valide'
      text.style.color = '#00ff00'
      return mail
    } else {
      text.innerHTML = 'Merci de rentrer une adresse valide'
      text.style.color = '#fbbcbc'
      mail = ''
    }
    if (mail == '') {
      text.innerHTML = ''
    }
  }

  let contact = {
    prenom: validFirstName(),
    nom: validLastName(),
    adresse: validAdress(),
    ville: validCity(),
    email: validEmail(),
  }

  let sendContact = document.querySelector('#order')

  sendContact.addEventListener('click', (e) => {
    e.preventDefault(e)

    let saveContactLocalStorage = JSON.parse(localStorage.getItem('contact'))
    // console.log(saveContactLocalStorage)

    let addContactLocalStorage = () => {
      saveContactLocalStorage.push(contact)
      localStorage.setItem('contact', JSON.stringify(saveContactLocalStorage))
    }

    if (
      contact.prenom == undefined ||
      contact.nom == undefined ||
      contact.adresse == undefined ||
      contact.ville == undefined ||
      contact.email == undefined
    ) {
      console.log('wait')
    } else {
      // SI pas de contact dans le LS, crée le tableau
      if (!saveContactLocalStorage) {
        saveContactLocalStorage = []
        addContactLocalStorage()
        console.log('crée le tableau')
      } else {
        console.log('Contact déjà crée')
      }
    }
  })
})

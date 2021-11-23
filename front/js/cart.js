fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    // *** Affiche le panier
    // Sélectionne le conteneur des articles
    let cartItems = document.querySelector('#cart__items')

    // Récupère les données du localStorage
    let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'))

    // Crée un tableau produit vide
    let products = []
    // Affiche tout les produits du panier
    if (document.URL.includes('cart.html')) {
      for (let i in saveProductLocalStorage) {
        let id = saveProductLocalStorage[i]._id

        // *** Trouver l'objet correspondant à l'ID
        // Entrée : ID de l'URL (searchParams)
        // Sortie : l'objet qui correspond à ID dans data
        function findObject(id) {
          return data.find((object) => object._id === id)
        }

        let myObject = findObject(id)

        if (cartItems) {
          cartItems.innerHTML += `<article
      class="cart__item"
      data-id="${saveProductLocalStorage[i]._id}"
      data-color="${saveProductLocalStorage[i].colors}"
    >
      <div class="cart__item__img">
        <img src="${myObject.imageUrl}" alt="${myObject.alttxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${myObject.name}</h2>
          <p>${saveProductLocalStorage[i].colors}</p>
          <p>${myObject.price}</p>
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
        // Mets dans le tableau produit les ID du panier
        let productsId = [saveProductLocalStorage[i]._id]
        products.push(productsId)
      }
    }

    // *** Supprimer
    // Stock dans un tableaux les éléments du DOM à supprimer
    let deleteItemContainer = [...document.getElementsByClassName('deleteItem')]
    // Supprime le produit
    deleteItemContainer.forEach((item, index) => {
      item.addEventListener('click', () => {
        // closest permet de sélectionner la classe pour la supprimer
        let pickArticle = deleteItemContainer[index].closest('.cart__item')
        pickArticle.remove()
        // splice permet de modifier la quantité ; recharger pour reset l'index
        saveProductLocalStorage.splice(index, 1)
        localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
        location.reload()
      })
    })

    // *** Modifie la quantité
    // Stock dans un tableaux les éléments du DOM à modifier
    let quantityContainer = [...document.getElementsByClassName('itemQuantity')]
    // Modifie la quantité
    quantityContainer.forEach((item, index) => {
      // Au click, modifie l'item sur le LocalStorage
      item.addEventListener('click', () => {
        saveProductLocalStorage[index].qty = quantityContainer[index].value
        localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
        location.reload()
      })
    })

    // *** Totaux : article et €
    let sumProduct = 0
    let sumMoney = 0
    let totalQuantity = document.querySelector('#totalQuantity')
    let totalMoney = document.querySelector('#totalPrice')

    if (document.URL.includes('cart.html')) {
      for (let q in saveProductLocalStorage) {
        let id = saveProductLocalStorage[q]._id
        let myObjectTotal = findObject(id)

        let quantityLoop = parseInt(saveProductLocalStorage[q].qty)
        let moneyLoop = parseInt(myObjectTotal.price)
        sumProduct += quantityLoop
        sumMoney += moneyLoop * quantityLoop
      }
      totalQuantity.innerHTML = sumProduct
      totalMoney.innerHTML = sumMoney
    }

    // *** Formulaire Contact
    addEventListener('change', () => {
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
        }
        if (mail == '') {
          text.innerHTML = ''
        }
      }

      // Crée l'objet contact avec des fonctions pour valeurs qui vérifie chaque entrée
      const contact = {
        firstName: validFirstName(),
        lastName: validLastName(),
        address: validAdress(),
        city: validCity(),
        email: validEmail(),
      }

      let sendContact = document.querySelector('#order')

      sendContact.addEventListener('click', (e) => {
        e.preventDefault()

        let saveContactLocalStorage = JSON.parse(
          localStorage.getItem('contact')
        )

        let addContactLocalStorage = () => {
          saveContactLocalStorage.push(contact)
          localStorage.setItem(
            'contact',
            JSON.stringify(saveContactLocalStorage)
          )
        }

        if (
          contact.firstName == undefined ||
          contact.lastName == undefined ||
          contact.address == undefined ||
          contact.city == undefined ||
          contact.email == undefined
        ) {
          return false
        } else {
          // SI pas de contact dans le localStorage, crée le tableau
          if (!saveContactLocalStorage) {
            saveContactLocalStorage = []
            addContactLocalStorage()
            console.log('Crée le tableau')
          } else {
            console.log('Contact déjà crée')
          }
        }

        const toSend = {
          contact,
          products,
        }

        // Envoi de l'objet vers le serveur
        const promiseOne = fetch('http://localhost:3000/api/products/order', {
          method: 'POST',
          body: JSON.stringify(toSend),
          headers: {
            'Content-type': 'application/json',
          },
        })

        // Pour voir le résultat du serveur dans la console
        promiseOne.then(async (response) => {
          try {
            const content = await response.json()
            console.log(content)

            if (response.ok) {
              // Aller vers la page confirmation
              window.location = `../html/confirmation.html?id=${content.orderId}`
              localStorage.clear()
            } else {
              console.log(`Réponse du serveur : `, response.status)
            }
          } catch (e) {
            console.log('Erreur qui vient du catch : ', e)
          }
        })
      })
    })
  })

// *** Confirmation de commande
// Récupération de l'ID
const orderId = new URL(window.location.href).searchParams.get('id')

const idSelector = document.querySelector('#orderId')
if (document.URL.includes('confirmation.html')) {
  idSelector.innerHTML = orderId
}

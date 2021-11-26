let id = new URL(window.location.href).searchParams.get('id')

fetch('http://localhost:3000/api/products')
	.then((response) => response.json())
	.then((data) => {
		// *** Trouver l'objet correspondant à l'ID
		// object._id vient de l'API
		// id vient du searchParams
		let myObject = data.find((object) => object._id === id)

		// *** Injection
		// Sélecteurs HTML
		let image = document.querySelector('.item__img')
		let title = document.querySelector('#title')
		let price = document.querySelector('#price')
		let description = document.querySelector('#description')
		let colors = document.querySelector('#colors')
		let quantity = document.querySelector('#quantity')
		let sendCart = document.querySelector('#addToCart')

		// Affectation des données d'un produit
		image.innerHTML = `<img src="${myObject.imageUrl}" alt="${myObject.altTxt}">`
		title.innerHTML = myObject.name
		price.innerHTML = myObject.price
		description.innerHTML = myObject.description
		for (let i in myObject.colors) {
			colors.insertAdjacentHTML(
				'beforeend',
				`<option value="${myObject.colors[i]}">${myObject.colors[i]}</option>`
			)
		}

		// *** Crée l'objet
		sendCart.addEventListener('click', (event) => {
			let optionProduct = {
				_id: id,
				qty: quantity.value,
				colors: colors.value,
			}

			// *** Crée l'objet dans le localStorage
			// Lecture du localStorage
			let saveProductLocalStorage = JSON.parse(localStorage.getItem('product'))

			// Ajoute un produit sélectionné dans le localStorage
			let addProductLocalStorage = () => {
				saveProductLocalStorage.push(optionProduct)
				localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
			}

			// Modifie un produit sélectionné dans le localStorage
			let modifyProductLocalStorage = (index) => {
				saveProductLocalStorage[index].qty = optionProduct.qty
				localStorage.setItem('product', JSON.stringify(saveProductLocalStorage))
				console.log('Modifie la quantité')
			}

			// SI la couleur est non renseignée OU que la quantité est inférieur ou égal à 0 OU supérieur à 100 : ne rien faire
			if (
				optionProduct.colors == '' ||
				optionProduct.qty <= 0 ||
				optionProduct.qty > 100
			) {
				console.log('Ne rien faire')
			} else {
				// SI pas de produit dans le localStorage, crée le tableau et ajoute le produit
				if (!saveProductLocalStorage) {
					saveProductLocalStorage = []
					addProductLocalStorage()
					console.log('Crée le tableau avec le premier produit')
				}
				// Trouve l'index dans le localStorage qui a la même couleur & la même ID que la sélection actuelle
				else {
					let index = saveProductLocalStorage.findIndex(
						(e) =>
							e.colors === optionProduct.colors && e._id === optionProduct._id
					)
					// SI le produit existe déjà, modifie la quantité
					if (index !== -1) {
						modifyProductLocalStorage(index)
					}
					// SINON ajoute le produit
					else {
						addProductLocalStorage()
						console.log('Ajoute le produit')
					}
				}
			}
		})
	})

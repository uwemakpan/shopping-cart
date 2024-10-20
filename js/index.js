// list of products on shopping cart
class Cart {
  constructor(products) {
    this.products = products
  }

  renderCartProducts = () => {
    // select the div where products is to be rendered
    const productsDiv = document.getElementsByClassName('list-products')[0]
    const cartTotal = document.querySelector('.total')

    // cart products total pruce
    let totalPrice = 0
    // empty current content of productsDiv upon reload
    productsDiv.innerHTML = ''

    // loop over products list
    for (let product of this.products) {
      totalPrice += product.price * product.quantity
      // create cardDiv to hold each cart Item
      let cardDiv = document.createElement('div')

      // add car-body class to cardDiv
      cardDiv.classList.add('card-body')

      cardDiv.innerHTML = `<div class="card" style="width: 18rem">
              <img src=${product.imageUrl} class="card-img-top" alt="baskets" />
              <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">${product.description}</p>
                <h4 class="unit-price">${product.price} $</h4>
                <div>
                  <i class="fas fa-plus-circle" value=${product.id}></i>
                  <span class="quantity">${product.quantity}</span>
                  <i class="fas fa-minus-circle" value=${product.id}></i>
                </div>
                <div>
                  <i class="fas fa-trash-alt" value=${product.id}></i>
                  ${
                    product.isFavorite
                      ? `<i class="fas fa-heart icon" value=${product.id}></i>`
                      : `<i class="fas fa-heart" value=${product.id}></i>`
                  }
                 
                </div>
              </div>
            </div>`

      // show total price on the user interface
      cartTotal.textContent = `$ ${totalPrice}`
      // append each cardDiv created to productsDiv
      productsDiv.appendChild(cardDiv)
    }

    // select all plus and minus icons
    const plusButtons = document.getElementsByClassName('fa-plus-circle')

    const minusButtons = document.getElementsByClassName('fa-minus-circle')
    // select all favorite icons
    const favoriteButtons = document.getElementsByClassName('fa-heart')

    // select all delete icons
    const deleteButtons = document.getElementsByClassName('fa-trash-alt')

    // loop over each plus buttons
    for (let plusBtn of plusButtons) {
      const productId = plusBtn.getAttribute('value')

      plusBtn.addEventListener(
        'click',
        this.increaseProductQuantity.bind(this, productId)
      )
    }

    // loop over each minus buttons
    for (let minusBtn of minusButtons) {
      const productId = minusBtn.getAttribute('value')

      minusBtn.addEventListener(
        'click',
        this.decreaseProductQuantity.bind(this, productId)
      )
    }

    //loop over favorite buttons
    for (let favoriteBtn of favoriteButtons) {
      const productId = favoriteBtn.getAttribute('value')
      favoriteBtn.addEventListener(
        'click',
        this.toggleFavorite.bind(this, productId)
      )
    }

    // loop over delete buttons
    for (let deleteBtn of deleteButtons) {
      const productId = deleteBtn.getAttribute('value')

      deleteBtn.addEventListener(
        'click',
        this.deleteCartItem.bind(this, productId)
      )
    }
  } // end arrow function renderCartProducts

  increaseProductQuantity(productId) {
    // console.log(productId)
    // find the index of the product to increament
    // using the array findInex method
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    )

    // use the found index to get object to increament on the array
    // increament quantity of product object by 1
    this.products[productIndex].quantity += 1

    // call renderCartProducts to reflect increment on the user interface
    return this.renderCartProducts()
    // console.log(this.products)
  } // end function increaseProductQuantity

  decreaseProductQuantity(productId) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    )

    // check if quantity is greater than 0
    if (this.products[productIndex].quantity === 0) {
      // reduction should not occur if product quantity is = 0
      return
    }

    this.products[productIndex].quantity -= 1

    return this.renderCartProducts()
  } // end function decreaseProductQuantity

  toggleFavorite(productId) {
    const productIndex = this.products.findIndex(
      (product) => product.id == productId
    )

    // use the tenary operator to update product isFavorite property
    this.products[productIndex].isFavorite = this.products[productIndex]
      .isFavorite
      ? false
      : true

    return this.renderCartProducts()
  } // end method toggleFavorite

  deleteCartItem(productId) {
    const productIndex = this.products.findIndex(
      (product) => product.id == productId
    )

    // delete a product from the array using the splice method
    this.products.splice(productIndex, 1)

    return this.renderCartProducts()
  } // end method deleteCartItem
} // end class Cart

const products = new Cart([
  {
    id: 'p1',
    productName: 'Shoe',
    price: 100,
    imageUrl: 'assets/shoe.png',
    description: 'A pair of shoe',
    quantity: 0,
    isFavorite: false,
  },

  {
    id: 'p2',
    productName: 'Socks',
    price: 20,
    imageUrl: 'assets/socks.png',
    description: 'A pair of socks',
    quantity: 0,
    isFavorite: true,
  },

  {
    id: 'p3',
    productName: 'Bag',
    price: 50,
    imageUrl: 'assets/bag.png',
    description: 'A pair of bag',
    quantity: 0,
    isFavorite: false,
  },
])

// product render function
// function renderCartProducts() {
//   // cart products total pruce
//   let totalPrice = 0
//   // empty current content of productsDiv
//   productsDiv.innerHTML = ''

//   // loop over products list
//   for (product of products) {
//     totalPrice += product.price * product.quantity
//     // create cardDiv to hold each cart Item
//     let cardDiv = document.createElement('div')

//     // add car-body class to cardDiv
//     cardDiv.classList.add('card-body')

//     cardDiv.innerHTML = `<div class="card" style="width: 18rem">
//               <img src=${product.imageUrl} class="card-img-top" alt="baskets" />
//               <div class="card-body">
//                 <h5 class="card-title">${product.productName}</h5>
//                 <p class="card-text">${product.description}</p>
//                 <h4 class="unit-price">${product.price} $</h4>
//                 <div>
//                   <i class="fas fa-plus-circle" value=${product.id}></i>
//                   <span class="quantity">${product.quantity}</span>
//                   <i class="fas fa-minus-circle" value=${product.id}></i>
//                 </div>
//                 <div>
//                   <i class="fas fa-trash-alt" value=${product.id}></i>
//                   ${
//                     product.isFavorite
//                       ? `<i class="fas fa-heart icon" value=${product.id}></i>`
//                       : `<i class="fas fa-heart" value=${product.id}></i>`
//                   }

//                 </div>
//               </div>
//             </div>`

//     // show total price on the user interface
//     cartTotal.textContent = `$ ${totalPrice}`
//     // append each cardDiv created to productsDiv
//     productsDiv.appendChild(cardDiv)
//   }

//   // select all plus and minus icons
//   const plusButtons = document.getElementsByClassName('fa-plus-circle')
//   const minusButtons = document.getElementsByClassName('fa-minus-circle')
//   // select all favorite icons
//   const favoriteButtons = document.getElementsByClassName('fa-heart')

//   // select all delete icons
//   const deleteButtons = document.getElementsByClassName('fa-trash-alt')

//   // loop over each plus buttons
//   for (plusBtn of plusButtons) {
//     const productId = plusBtn.getAttribute('value')

//     plusBtn.addEventListener(
//       'click',
//       increaseProductQuantity.bind(this, productId)
//     )
//   }

//   // loop over each minus buttons
//   for (minusBtn of minusButtons) {
//     const productId = minusBtn.getAttribute('value')

//     minusBtn.addEventListener(
//       'click',
//       decreaseProductQuantity.bind(this, productId)
//     )
//   }

//   //loop over favorite buttons
//   for (favoriteBtn of favoriteButtons) {
//     const productId = favoriteBtn.getAttribute('value')
//     favoriteBtn.addEventListener('click', toggleFavorite.bind(this, productId))
//   }

//   // loop over delete buttons
//   for (deleteBtn of deleteButtons) {
//     const productId = deleteBtn.getAttribute('value')

//     deleteBtn.addEventListener('click', deleteCartItem.bind(this, productId))
//   }
// }

// increament product quantity function
// function increaseProductQuantity(productId) {
//   // find the index of the product to increament
//   // using the array findInex method
//   const productIndex = products.findIndex((product) => product.id === productId)

//   // use the found index to get object to increament on the array
//   // increament quantity of product object by 1
//   products[productIndex].quantity += 1

//   // call renderCartProducts to reflect increment on the user interface
//   return renderCartProducts()
// }

// function decreaseProductQuantity(productId) {
//   const productIndex = products.findIndex((product) => product.id === productId)

//   // check if quantity is greater than 0
//   if (products[productIndex].quantity === 0) {
//     // reduction should not occur if product quantity is = 0
//     return
//   }

//   products[productIndex].quantity -= 1

//   return renderCartProducts()
// }

// toggle item favorite function
// function toggleFavorite(productId) {
//   const productIndex = products.findIndex((product) => product.id == productId)

//   // use the tenary operator to update product isFavorite property
//   products[productIndex].isFavorite = products[productIndex].isFavorite
//     ? false
//     : true

//   return renderCartProducts()
// }

// delete cart item function
// function deleteCartItem(productId) {
//   const productIndex = products.findIndex((product) => product.id == productId)

//   // delete a product from the array using the splice method
//   products.splice(productIndex, 1)

//   return renderCartProducts()
// }
// execute renderCartProducts function on window load
window.addEventListener('load', products.renderCartProducts())

function addNum(num1, num2) {
  return num1 + num2
}

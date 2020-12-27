import shop from '@/api/shop.js'
export default{
  state:{
    cart:[],
    checkoutStatus: null

  },
  getters:{
    cartProducts(state, getters, rootState){
      return state.cart.map(cartItem => {
        const product = rootState.products.products.find(product => product.id === cartItem.id)
        return{
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters){
      return getters.cartProducts.reduce((total,product)=> total + product.price * product.quantity, 0)
    },


  },
  mutations:{
    emptyCart(state){
      state.cart = []

    },
    setCheckoutStatus(state, status){
      state.checkoutStatus = status
    },


    pushToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state,cartItem){
      cartItem.quantity++
    },

  },

  actions:{
    addToCart( {state, getters, commit, rootState } ,product){
      if(getters.productIsInStock(product)){
        const cartItem = state.cart.find(item => item.id === product.id)
        if(!cartItem){
          commit('pushToCart', product.id)
        }else{
          commit('incrementItemQuantity', cartItem) //購物車數量
        }
      }
       commit('decrementProductInventory', product) //商數量
    },

    checkout({state, commit}){
      shop.buyProducts(
        state.cart,
        () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
        },
        () => {
        commit('setCheckoutStatus', 'fail')
        })
      }

  }
}

import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state:{
    products:[],
    cart:[],
    checkoutStatus: null
  },

  getters:{
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts(state, getters){
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
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
    setProducts(state, products){
      state.products = products
    },



    setCheckoutStatus(state, status){
      state.checkoutStatus = status
    },

    emptyCart(state){
      state.cart = []

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

    decrementProductInventory(state, product){
      product.inventory--
    }

  },

  actions:{
    fetchProducts({commit}){
      return new Promise((resolve, reject)=>{
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },

    addToCart(context,product){
      if(product.inventory > 0){
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem){
          context.commit('pushToCart', product.id)
        }else{
          context.commit('incrementItemQuantity', cartItem) //購物車數量
        }
      }
      context.commit('decrementProductInventory', product) //商數量
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

  })

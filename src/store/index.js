import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state:{
    products:[],
    cart:[]
  },

  getters:{
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }


  },

  mutations:{
    setProducts(state, products){
      state.products = products
    },

    pushToCart(state,productId){
      state.cart.push({
        id: productId,
        quantitu: 1
      })
    },
    incrementItemQuantity(state,cartItem){
      cartItem.quantity++
    },
    decrementProductInventory(state,cartItem){
      cartItem.quantity--
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
      const cartItem = context.state.cart.find(item => item.id === product.id)
      if(product.inventory > 0){
        if(!cartItem){
          context.commit('pushToCart', product.id)
        }else{
          context.commit('incrementItemQuantity', cartItem)
        }
      }else{
        context.commit('decrementProductInventory', product)

      }
    }


  }

})

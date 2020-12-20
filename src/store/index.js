import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state:{
    products:[]
  },

  getters:{
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }


  },

  mutations:{
    setProducts(state, products){
      state.products = products

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


  }

})

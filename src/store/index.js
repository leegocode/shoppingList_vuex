import Vuex from 'vuex'
import Vue from 'vue'
// import shop from '@/api/shop.js'
// import actions from './actions.js'
import cart from './modules/cart'
import products from './modules/products'


Vue.use(Vuex)


export default new Vuex.Store({
  modules:{
    cart,
    products
  },

  state:{


  },

  getters:{



  },

  mutations:{



  },



})

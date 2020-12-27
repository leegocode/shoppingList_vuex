<template>
<div>
<h1>product list</h1>
<img
       v-if="loading"
       src="https://i.imgur.com/JfPpwOA.gif"
     >
<ul v-else>
  <li v-for="product in products"> {{ product.title }} --- {{ product.price | currency }} -- {{ product.inventory }}
    <button type="button" name="button" :disabled=" !productIsInStock(product) " @click="addToCart(product)">
      add to cart
    </button>
  </li>

</ul>


</div>
</template>

<script>
import shop from '@/api/shop.js'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return {
      loading: false,
      productIndex: 1
    }
  },
  computed:{
    ...mapState({
      products: state => state.products.products
    }),

    ...mapGetters('products',{
      productIsInStock: 'productIsInStock'
    })

  },



  methods:{
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addToCart: 'cart/addToCart'
    }),

  },

  created(){
    this.loading = true
    this.fetchProducts()
    .then(()=> this.loading = false)

  }
}
</script>

<style>
</style>

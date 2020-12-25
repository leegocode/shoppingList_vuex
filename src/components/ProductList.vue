<template>
<div>
<h1>product list</h1>
<img
       v-if="loading"
       src="https://i.imgur.com/JfPpwOA.gif"
     >
<ul v-else>
  <li v-for="product in products"> {{ product.title }} --- {{ product.price | currency }} -- {{ product.inventory }}
    <button type="button" name="button" :disabled=" !productIsInStock(product) " @click="addProductToCart(product)">
      add to cart
    </button>
  </li>

</ul>


</div>
</template>

<script>
import shop from '@/api/shop.js'
export default {
  data(){
    return {
      loading: false
    }
  },
  computed:{
    products() {
      return this.$store.state.products
    },

    productIsInStock(){
      return this.$store.getters.productIsInStock
    }

  },
  methods:{
    addProductToCart(product){
      this.$store.dispatch('addToCart', product)
    }
  },

  created(){
    this.loading = true
    this.$store.dispatch('fetchProducts')
    .then(()=> this.loading = false)

  }
}
</script>

<style>
</style>

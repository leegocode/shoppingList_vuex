<template lang="html">
  <div class="">
    <h1>shopping cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} -- {{ product.price | currency }} -- {{ product.quantity }}
      </li>
    </ul>
  <h2>
    Total: {{total}}
  </h2>

  </div>
</template>

<script>
export default {
  computed: {
    products(){
      return this.$store.getters.cartProducts
    },
    total(){
      return this.$store.getters.cartTotal
    }
  }

}
</script>

<style lang="css" scoped>
</style>

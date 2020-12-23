<template lang="html">
  <div class="">
    <h1>shopping cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} -- {{ product.price }} -- {{ product.quantity }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  computed: {
    products(){
      return this.$store.getters.cartProducts
    }
  }

}
</script>

<style lang="css" scoped>
</style>

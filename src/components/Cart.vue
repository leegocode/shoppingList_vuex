<template lang="html">
  <div class="">
    <h1>shopping cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} -- {{ product.price | currency }} -- {{ product.quantity }}
      </li>
    </ul>
  <h2>
    Total: {{total | currency}}
  </h2>
  <button type="button" name="button" @click="checkout">
    checkout
  </button>
  <p v-if="checkoutStatus">{{ checkoutStatus }}</p>

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {

  computed:{

    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    }),

    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })

  },
  methods: {
    ...mapActions(['checkout'])
  }

    //
    // products(){
    //   return this.$store.getters.cartProducts
    // },
    // total(){
    //   return this.$store.getters.cartTotal
    // }

}
</script>

<style lang="css" scoped>
</style>

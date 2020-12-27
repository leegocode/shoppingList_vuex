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

    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal'
    }),

    ...mapState('cart', {
      checkoutStatus: state => state.checkoutStatus
    })

  },
  methods: {
    ...mapActions('cart',['checkout'])
  }


}
</script>

<style lang="css" scoped>
</style>

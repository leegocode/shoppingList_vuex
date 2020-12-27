<template>
  <div id="app">
    <ProductList/>
    <hr>
    <Cart/>
    <Button/>
  </div>
</template>

<script>
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Button from './components/Button'

export default {
  name: 'App',
  components: {
    ProductList,
    Cart,
    Button

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters({
    products: 'allProducts',
    isLoaded: 'isLoaded'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    if (this.products.length < 1) this.$store.dispatch('getAllProducts');
    console.log(this.isLoaded);
  },
  mounted () {
    console.log(this.isLoaded);
  }
}
</script>

<template>
  <div>
    <div class="loader" v-show="!isLoaded">Loading ...</div>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price }}
        <br>
        <button :class="p.title"
          :disabled="!p.inventory"
          @click="addToCart(p)">
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

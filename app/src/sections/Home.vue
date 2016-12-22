<script>

import ProductList from '../components/ProductList.vue';
import Basket from '../components/Basket.vue';

export default {

  name:'Home',
  components : {
    'productList':ProductList,
    'basket':Basket,
  },
  data(){
      return {
        test:'test'
      }
  },
  mounted(){
    console.log(this);
    console.log('Home Mounted !');

    console.log(this.$route);
    console.log('toto');


  },
  methods:{
  }

}

</script>

<template>
    <div class="section">
        <h1>This is the Welcome View</h1>
        <product-list></product-list>
        <basket></basket>
    </div>
</template>

<script>
  import Events from '../events'
  import windowsill from 'windowsill'

  import Header from '../components/Header.vue'

  let resizer = windowsill.resizer;

  export default {
    name: "App",
    components: {
      'headerBar':Header
    },
    data(){
      return {
          isLoading:true,
      }
    },
    mounted(){

      console.log("App Container mounted");

      // Resizer
    	resizer.addListener(this.resize);
    	resizer.bind();

      this.isLoading = false;

    },
    methods: {
    	resize(){
    		//this.$broadcast(Events.WINDOW_RESIZE);
    	}
    }
  }
</script>

<template>
    <div class="root">
      <header-bar></header-bar>
      <router-view v-if='!isLoading'></router-view>
    </div>
</template>

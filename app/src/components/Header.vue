<script>

    export default {

        name: "Header",
        components : {
        },
        data(){
            return {
            }
        },
        mounted(){

          console.log('mounted');

        },
        methods:{
        }

    }

</script>

<template>

  <nav class="navbar navbar-light bg-faded">
    <a class="navbar-brand" href="#">Vue2</a>
    <ul class="nav navbar-nav">
      <router-link class="nav-item" tag="li" to="/home">
        <a class="nav-link">Home</a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/about">
        <a class="nav-link">About</a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/contact">
        <a class="nav-link">Contact</a>
      </router-link>
    </ul>
  </nav>

</template>

<template>
  <div >
    <!-- <Navigation /> -->
    <Dashboard/>
  </div>
</template>

<script>
  import Dashboard from '../components/Dashboard.vue'
  //import Navigation from '../components/Navigation.vue';
  export default {
    name: 'Home',

    components: {
      Dashboard,
      // Navigation
    },
    beforeMount() {
      
      this.$store.commit('drawerController',true);
    },
   
  }
</script>
<style>

</style>
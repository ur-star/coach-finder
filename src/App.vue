<template>
  <v-app>
    <div id="app-bar">
      <Appbar v-if="homepageEnabled"/>
    </div>
    
    <v-main >
   
        <!-- <v-col cols="auto" class="navigation-bar"> 
          <Navigation v-if="homepageEnabled"/>
        </v-col> -->
        
          <router-view />
       
      
    </v-main>
  
  </v-app>
</template>

<script>
import Appbar from "./components/Appbar.vue";
// import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Appbar,
    // Navigation
  },
  computed:{
    homepageEnabled(){
      return this.$store.state.drawerController
    }
  },

  data: () => ({
    
  }),
  
};
</script>
<style>

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;700&display=swap');

h1,
h2,
h3,
h4 {
  font-family: "Montserrat", sans-serif;
}
.v-main__wrap{
  background-image: url("./assets/background.webp");
  width: 100%;
  height: 100%;
  background-size: cover;
}



</style>

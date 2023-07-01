<template>
  
  <v-app>
    <div id="app-bar">
      <Appbar v-if="homepageEnabled" />
    </div>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "./components/Appbar.vue";

export default {
  name: "App",
 
  components: {
    Appbar,
  },
  computed: {
    homepageEnabled() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;700&display=swap");

h1,
h2,
h3,
h4 {
  font-family: "Montserrat", sans-serif;
  
}
.v-main__wrap {
  background-image: url("./assets/background.webp");
  width: 100%;
  height: 100%;
  background-size: cover;
}
.h3{
  font-size: calc(16px + 6 * ((100vw - 320px) / 680));
}
</style>

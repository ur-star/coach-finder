<template>
  <div>
    <v-row>
      <v-col cols="auto" class="nav-height">
        <Navigation />
      </v-col>
      <v-col>
        <Dashboard />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
import Navigation from "../components/Navigation.vue";
export default {
  name: "Home",

  components: {
    Dashboard,
    Navigation,
  },
 
};
</script>
<style scoped>
.nav-height{
  height: 100%;
}
</style>

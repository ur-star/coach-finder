<template>
  <div id="nav-body">
    <v-navigation-drawer
      app
      :mini-variant="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
      dark
      boder
      clipped
      color="grey darken-4"
      class="left-nav-drawer"
    >
      <v-list-item v-if="source" class="px-2 py-1">
        <v-img :src="source" contain width="80px" height="80px" round></v-img>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", path: "/homepage" },
        {
          title: "Become a Trainer",
          icon: "mdi-plus",
          path: "/trainer-signup",
        },
      ],
      source: "",
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set() {
        this.$store.dispatch("toggleDrawer");
      },
      // return true;
    },
    userDetails() {
      return this.$store.getters.userDetails;
    },
  },
  methods: {
     getProfile() {
      this.source = this.userDetails.imageUrl;
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
<style scoped>
.left-nav-drawer {
  height: calc(100%) !important;
}
</style>

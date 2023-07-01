<template>
  <div id="app-bar">
    <v-app-bar app clipped-left>
      <v-btn
        text
        small
        @click="toggleDrawer"
        v-if="isUserLoggedIn"
        class="mr-2"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-toolbar-title class="text-uppercase font-weight-medium  h3">Coach Finder</v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="mr-2">
        <v-menu offset-y transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-account</v-icon>
              <h4>{{ user ? user : "Test" | name }}</h4>
            </v-btn>
          </template>
          <v-list v-if="isUserLoggedIn">
            <v-list-item dense>
              <v-btn text @click="handleSignout">Signout</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import router from "@/router";
import { onAuthStateChanged, signOut } from "@firebase/auth";
export default {
  name: "Appbar",
  data() {
    return {};
  },
  methods: {
    toggleDrawer: function () {
      // console.log("toggleDrawre called appbar");
      this.$store.dispatch("toggleDrawer");
      // console.log("store value",this.$store.state.drawer);
    },
    handleSignout() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$store.dispatch("toggleLoggedInStatus", true);
        } else {
          this.$store.dispatch("toggleLoggedInStatus", false);
        }
      });

      signOut(auth).then(() => {
        this.$store.dispatch("userDetails", { name: "", uid: null });
        router.push("/login");
      });
    },
  },
  computed: {
    
    user() {
      return this.$store.getters.userDetails.name;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  
};
</script>

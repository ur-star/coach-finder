<template>
  <div id="nav-body">
    <v-navigation-drawer
      :mini-variant="drawer"
      permanent
      dark
      height="100%"
      boder
      color="grey darken-4"
      class="left-nav-drawer"
    >
      <v-list-item v-if="source"  class="px-2 py-1">
        <v-list-item-avatar>
          <v-img :src="source" contain width="50px" height="50px"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
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
import { db } from '@/firebase';
import { doc,getDoc} from "firebase/firestore";
// import { getDownloadURL,ref } from '@firebase/storage';
export default {
  name: "Navigation",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", path: "/homepage" },
        { title: "Login", icon: "mdi-login", path: "/" },
        { title: "Become a Trainer", icon: "mdi-plus", path: "/trainer-signup" },
      ],
      source:"",
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit("toggleDrawer", value);
      },
      // return true;
    },
    uid(){
      return this.$store.state.userDetails.uid;
    }
  },
  methods: {
   async getProfile(){
      const docRef = doc(db, "trainers",this.uid);
      const docData = await getDoc(docRef)
      //console.log(docData.data(),this.uid);
      this.source = docData.data().source;
    }
  },
  mounted(){
    // getDownloadURL(ref(storage, `profile/${this.uid}.jpg`))
    //     .then((url) => {
    //       this.source = url;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
   
      this.getProfile()
    
  }
};
</script>
<style scoped>
.left-nav-drawer {
  height: calc(100vh - 64px) !important;
}
</style>

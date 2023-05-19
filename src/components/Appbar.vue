<template>
  <div id="app-bar">
    <v-app-bar app clipped-left>
    <v-btn text small @click="toggleDrawer" v-if="drawerController" class="mr-2">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <!-- <v-btn color="dark" class="mx-1" text to="/">Login</v-btn> -->
    <!-- <v-btn color="dark" class="mx-1" text to="/homepage">Homepage</v-btn> -->
    <!-- <v-btn color="dark" class="mx-1" text to="/Signup">Signup</v-btn> -->
    <v-spacer></v-spacer>

    <h1>Coach Finder</h1>
    <v-spacer></v-spacer>
    
    <div class="mr-2" >
        <v-menu offset-y transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-account</v-icon>
              <h4>{{ user ? user : "Test" |name }}</h4>
            </v-btn>
          </template>
          <v-list v-if="isUserLoggedIn" >
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
import { auth } from '@/firebase';
import router from '@/router';
import { onAuthStateChanged,signOut } from '@firebase/auth';
export default {
  name: "Appbar",
  data() {
    return {
     
    }
  },
  methods: {
    toggleDrawer:function(){
      // console.log("toggleDrawre called appbar");
      this.$store.commit('toggleDrawer');
      // console.log("store value",this.$store.state.drawer);
    },
    handleSignout(){

      onAuthStateChanged(auth,(user)=>{
       
       if(user){
         this.$store.commit('toggleLoggedInStatus',true)
       }
       else{
         this.$store.commit('toggleLoggedInStatus',false)
 
       }
     })
      
    signOut(auth).then(()=>{
      this.$store.commit('userDetails',{name:"",uid:null});
      router.push("/")
    })
  }
  },
  computed: {
    drawerController(){
      return this.$store.state.drawerController;
    },
    user(){
      // return this.$store.state.user;
      
      return this.$store.state.userDetails.name;
      
    },
    isUserLoggedIn(){
      return this.$store.state.isUserLoggedIn
    }
  },
  // mounted(){
    
  //   onAuthStateChanged(auth,(user)=>{
       
  //     if(user){
  //       this.$store.commit('toggleLoggedInStatus',true)
  //     }
  //     else{
  //       this.$store.commit('toggleLoggedInStatus',false)

  //     }
  //   })
   
  // }

};
</script>

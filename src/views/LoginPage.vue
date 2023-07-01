<template>
  <div class="Login">
    <v-container>
      <Errorbar v-if="error" :msg="error"/>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="4">
          <v-card class="pa-5 pb-8 mt-10" height="460" elevation="4" light>
            <v-card-title class="mb-4 justify-center">
              <h2>Coach Finder</h2>
            </v-card-title>

            <v-card-text>
              <v-form dense v-model="valid">
                <v-text-field
                  label="Username"
                  required
                  :rules="[(v) => !!v || 'Email is required']"
                  v-model="email"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Password"
                  :type="showPass? 'text' :'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  :rules="[(v) => !!v || 'Please enter the password']"
                  v-model="password"
                  outlined
                ></v-text-field>
                <!-- <v-checkbox dense label="I am a Trainer"></v-checkbox> -->
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="mx-auto font-weight-bold grey darken-4 v-size--x-large white--text"
                :disabled="!valid"
                block
                @click="login"
                >Login</v-btn
              >
            </v-card-actions>
            <v-card-text class="text-center">
              New Here?

              <router-link to="/signup"> Register Yourself</router-link>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import Errorbar from "@/components/Errorbar.vue";
export default {
  name: "LoginPage",
  data() {
    return {
      valid: true,
      email: "",
      error:null,
      password: "",
      showPass:false
    };
  },
 
  components:{
    Errorbar
  },
  methods: {
    login() {
      this.error = null;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          //console.log("Login: " + JSON.stringify(userCredential));
          if (userCredential.user.uid) {
            let name = userCredential.user.displayName
            let uid = userCredential.user.uid
            let email = userCredential.user.email
            let imageUrl =userCredential.user.photoURL
            
            // console.log(name,uid);
            this.$store.dispatch('toggleLoggedInStatus',true)
            this.$store.dispatch('userDetails',{name,uid,email,imageUrl})
            

          }
        }).then(() => {
            this.$router.push('/homepage')
          })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
              // window.alert("Invalid Email")
              this.error = "Invalid Email"
              break;
              case "auth/user-not-found":
              // window.alert("User does not exist")
              this.error = "User does not exist"
              break;
              case "auth/wrong-password":
              // window.alert("wrong password")
              this.error = "wrong password"
              break;
              case "auth/user-disabled":
              this.error = "User disabled"
              break;
          
            default: window.alert(err)

              break;
          }
        });
    },
  },
};
</script>


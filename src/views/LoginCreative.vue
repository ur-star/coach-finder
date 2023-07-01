<template>
  <!-- Not in use -->
    <div class="Login">
      <v-container fill-height fluid>
        <v-row >
          <v-spacer></v-spacer>
          <v-col cols="8" xl="4" >
            <v-card class="pa-3" tile>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="6" >
                  <v-img
                    max-height="336"
                   
                    src="../assets/fox.jpg"
                    contain
                    class="text-white my-3"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="12" md="6" >
                  <v-card-title class="text-h4"> Coach Finder </v-card-title>
                  <v-form v-model="valid">
                    <v-card-text>
                      <v-form v-model="valid">
                        <v-text-field
                          label="Email"
                          required
                          :rules="[(v) => !!v || 'Email is required']"
                          v-model="email"
                          prepend-icon="mdi-email"
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          type="password"
                          :rules="[
                            (v) => !!v || 'Please enter the password',
                            (v) =>
                              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v) ||
                              'Password must contain a digit and a number',
                            (v) =>
                              (v && v.length > 8) ||
                              'Password must be atleast 8 characters',
                          ]"
                          v-model="password"
                          prepend-icon="mdi-lock"
                        ></v-text-field>
                        <v-checkbox label="I am a Trainer"></v-checkbox>
                      </v-form>
                      <v-list-tile-sub-title>Forgot Password?  </v-list-tile-sub-title>
  
                      <router-link to="/reset"> Reset Password</router-link>
                    </v-card-text>
  
                    <v-card-actions>
                      <v-btn class="ml-2" color="primary" :disabled="!valid"
                        >Login</v-btn
                      >
                    </v-card-actions>
                  
                  </v-form>
  
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name:'LoginPage',
    data() {
      return {
        valid: true,
        email: "",
        password: "",
      };
    },
  };
  </script>
  
  <style scoped>
  .Login {
    height: 100%;
    width: 100%;
    background-image: url("../assets/background.webp");
  }
  </style>
  
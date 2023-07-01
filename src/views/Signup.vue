<template>
  <div>
    <v-container>
      <Errorbar v-if="error" :msg="error" />
      <v-row>
        <v-spacer></v-spacer>

        <v-col cols="12" md="6">
          <v-card rounded elevation="4" class="pa-5 pb-8 mt-10" light>
            <h1 class="mb-4 text-center">User Signup</h1>
            <v-form class="pa-5 pb-8 mt-10" v-model="valid" ref="form">
              <v-file-input
                label="Add an Image"
                outlined
                small-chips
                v-model="image"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-text-field
                name="first name"
                label="First Name"
                v-model="firstName"
                :rules="[(v) => !!v || 'name is required']"
                outlined
              ></v-text-field>
              <v-text-field
                name="last name"
                label="Last Name"
                v-model="lastName"
                :rules="[(v) => !!v || 'name is required']"
                outlined
              ></v-text-field>

              <v-text-field
                name="Email"
                label="Email"
                v-model="email"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) => /.+@.+\..+/.test(v) || ' E-mail must be valid',
                ]"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="rePassword"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                :rules="[
                  (v) => !!v || 'Password is required',
                  (v) =>
                    v.length > 7 || 'Length must be more than 8 characters',
                ]"
                name="Re-Password"
                label="Re-Enter Password"
                hint="At least 8 characters"
                counter
                outlined
                @click:append="showPass = !showPass"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                :rules="[
                  (v) => !!v || 'Password is required',
                  (v) =>
                    v.length > 7 || 'Length must be more than 8 characters',
                ]"
                name="Password"
                label="Enter Password"
                hint="At least 8 characters"
                counter
                outlined
                @click:append="showPass = !showPass"
              ></v-text-field>

              <v-btn
                block
                :disabled="!valid"
                @click="signUp"
                class="mx-auto font-weight-bold grey darken-4 v-size--x-large white--text"
                >Submit</v-btn
              >
            </v-form>
            <v-card-text class="text-center">
              Already Registered

              <router-link to="/"> Sign In</router-link>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { auth, storage } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import Errorbar from "../components/Errorbar.vue";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";

export default {
  name: "StudentSignup",
  components: {
    Errorbar,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      showPass: false,
      valid: false,
      error: "",
      image: null,
      source: "",
      uid: "",
    };
  },
  methods: {
    async signUp() {
      this.error = "";
      this.$refs.form.validate();
      if (this.valid) {
        if (this.password !== this.rePassword) {
          window.alert("Password must match");
        } else {
          try {
            let res = await createUserWithEmailAndPassword(
              auth,
              this.email,
              this.password
            );

            this.uid = res.user.uid;

            if (this.image != null) {
              const imagesRef = ref(
                storage,
                `profile/${this.uid}/${this.image.name}`
              );

              await uploadBytes(imagesRef, this.image);

              this.source = await getDownloadURL(
                ref(storage, `profile/${this.uid}/${this.image.name}`)
              );
            }

            await updateProfile(auth.currentUser, {
              displayName: this.fullname,
              photoURL: this.source,
              email: this.email,
            });

            this.$router.push("/login");
          } catch (error) {
            if (error.code == "auth/email-already-in-use")
              this.error = "This email already exist";
            else {
              console.error(error);
            }
          }
        }
      } else {
        console.error("fill form correctly");
      }
    },
  },
 
  computed: {
    fullname() {
      return this.firstName + " " + this.lastName;
    },
  },
};
</script>

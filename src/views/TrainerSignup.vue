<template>
  <div class="signup">
    <v-row>
      <v-col cols="auto"><Navigation /></v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" md="5">
        <v-card rounded elevation="4" class="pa-5 pb-8 mt-10" light>
          <h1 class="mb-4 text-center">Trainer Signup</h1>
          <v-form class="pa-5 pb-8 mt-10" v-model="valid" ref="form">
            <!-- <v-file-input
                label="Add an Image"
                outlined
                small-chips
                v-model="image"
                prepend-icon="mdi-camera"
              ></v-file-input> -->
            <v-text-field
              name="name"
              label="Name"
              v-model="user.name"
              :rules="[(v) => !!v || 'name is required']"
              outlined
            ></v-text-field>

            <v-text-field
              name="Email"
              label="Email"
              v-model="user.email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || ' E-mail must be valid',
              ]"
              outlined
            ></v-text-field>

            <v-text-field
              name="country"
              v-model="user.country"
              label="Country"
              outlined
            >
            </v-text-field>
            <v-text-field
              name="designation"
              v-model="user.designation"
              label="Designation"
              outlined
            >
            </v-text-field>
            <v-select
              v-model="user.skills"
              :items="skillItems"
              label="Skills"
              multiple
              outlined
            >
              <template v-slot:selection="{ item, index }">
                <v-chip>
                  <span>{{ item }}</span>
                </v-chip>
              </template>
            </v-select>

            <v-textarea
              label="Description"
              name="Description"
              placeholder="About yourself"
              outlined
              dense
              :rules="[(v) => !!v || 'Please add a description']"
              v-model="user.description"
              rows="4"
            ></v-textarea>

            <v-btn
              block
              :disabled="!valid"
              @click="signUp"
              class="mx-auto font-weight-bold grey darken-4 v-size--x-large white--text"
              >Submit</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import { storage, db } from "@/firebase";
import router from "@/router";
import { doc, setDoc, getDoc } from "firebase/firestore";
//import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "TrainerSignup",
  components: {
    Navigation,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        country: "",
        designation: "",
        description: "",
        skills: [],
        source: "",
      },
      image: null,

      showPass: false,
      valid: false,
      skillItems: ["java", "c++", "python", "javascript", "react", "dotnet"],
    };
  },
  computed: {
    userDetails() {
      // console.log(this.$store.state.userDetails.uid);
      return this.$store.state.userDetails;
    },
  },
  methods: {
    async signUp() {
      this.$refs.form.validate();
      if (this.valid) {
        // this.user.source = this.userDetails.imageUrl
        await setDoc(doc(db, "trainers", this.userDetails.uid), this.user);
        router.push("/homepage");
      } else {
        console.error("fill form correctly");
      }
    },
    async getPreviousDetails() {
      const docRef = doc(db, "trainers", this.userDetails.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        this.user = {...docSnap.data()}

      } else {
        
        console.log("No such document!");
      }
    },
  },
  beforeMount() {
    this.$store.commit("drawerController", true);
    this.getPreviousDetails();
  },
  mounted() {
    this.user.name = this.userDetails.name;
    this.user.email = this.userDetails.email;
    this.user.source = this.userDetails.imageUrl;
  },
};
</script>
<style></style>

<template>
  <div class="signup">
    <v-container>
      <v-row>
        <v-spacer></v-spacer>

        <v-col cols="8" md="6">
          <v-card rounded elevation="4" class="pa-5 pb-8 mt-10" light>
            <h1 class="mb-4 text-center">Trainer Signup</h1>
            <v-form class="pa-5 pb-8 mt-10" v-model="valid" ref="form">
              <v-file-input
                label="Add an Image"
                outlined
                small-chips
                v-model="image"
                prepend-icon="mdi-camera"
              ></v-file-input>
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
    </v-container>
  </div>
</template>

<script>
import { storage, db } from "@/firebase";
// import { v4 as uuidv4 } from "uuid";
import router from "@/router";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "TrainerSignup",
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
      skillItems: ["Java", "C++", "python", "JavaScript", "react", "dotNet"],
    };
  },
  computed: {
    uid() {
      console.log(this.$store.state.userDetails.uid);
      return this.$store.state.userDetails.uid;
    },
  },
  methods: {
   async signUp() {
      this.$refs.form.validate();
      if (this.valid) {
        if (this.image != null) {
          const imagesRef = ref(storage, `profile/${this.uid}/${this.image.name}`);
         
          await uploadBytes(imagesRef, this.image)
          this.user.source = await getDownloadURL(ref(storage, `profile/${this.uid}/${this.image.name}`));
          await setDoc(doc(db, "trainers", this.uid), this.user);
          router.push("/homepage");

          
        } else {
          window.alert("image is null");
        }

        // setDoc(doc(db, "trainers", this.uid), this.user)
        //   .then(() => {
        //     router.push("/");
        //   })
        //   .catch((err) => {
        //     console.log("Error with setDoc", err);
        //   });
      } 
      else {
        console.error("fill form correctly");
      }
    },
  },
  beforeMount() {
    this.$store.commit("drawerController", true);
  },
};
</script>
<style></style>

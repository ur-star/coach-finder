<template>
  <!-- Not in use -->
  <div>
    <v-card max-width="50%" class="pa-5 ma-5">
      <h2 class="mb-4">Add you Display Picture</h2>
      <v-file-input
        label="File input"
        outlined
        v-model="file"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-btn @click="submit"> Submit </v-btn>
    </v-card>
    <v-card max-width="50%" class="pa-5 ma-5">
      <v-btn color="success" @click="getImage">showImage</v-btn>
      <v-img v-if="source" :src="source" contain></v-img>
    </v-card>
  </div>
</template>
<script>
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  name: "storage",
  data() {
    return {
      file: null,
      source: "",
    };
  },

  methods: {
    submit() {
      if (this.file != null) {
//    let name = this.file.name.split(".");
        //   let ext = name.length -1;
        //    if(name[ext]!= 'jpg' || name[ext]!= 'jpeg' || name[ext]!= 'webp' ){
        //     window.al        ert("file format "+name[ext]+" not supported")
        //    }

        const imagesRef = ref(storage, `profile/${this.file.name}`);
        uploadBytes(imagesRef, this.file).then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
        });
      }
    },
    getImage() {
      getDownloadURL(ref(storage, `profile/${this.file.name}`))
        .then((url) => {
          console.log(url);
          this.source = url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  // beforeMount() {
  //     console.log(storage);
  // },
};
</script>

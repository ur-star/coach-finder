<template>
  <div id="detail-card" class="text-center">
    <v-dialog width="800" v-model="toggleDialog">
      <v-card light class="pa-5 pb-8">
        <v-img :src="source" contain height="300"></v-img>

        <v-card-title > <h2>{{ name }}</h2> </v-card-title>
        <v-card-text class="text-subtitle-2">
          {{ description ? description : "No description yet" }}
        </v-card-text>
        <v-chip
        class="pa-2 ma-2"
        color="blue"
        pill
        large
        v-for="(item, index) in skills"
        :key="index"
        >{{ item }}
      </v-chip>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "InfoDialog",
  props: {
    name: {
      type: String,
      default: "Title",
    },
    description: {
      type: String,
      default: "This place contains the description of the trainer",
    },
    source: {
      type: String,
      default: "https://picsum.photos/230/150",
    },
    skills:{
      type:Array
    },
    location:{
      type: String
    }
  },
  computed: {
    toggleDialog: {
      get() {
        return this.$store.state.toggleDialog;
      },
      set(value) {
        this.$store.commit("toggleDialog");
      },
    },
  },
  data() {
    return {};
  },
};
</script>

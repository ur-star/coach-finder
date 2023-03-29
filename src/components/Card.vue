<template>
  <div id="card">
    <v-card light elevation="4" class="pa-5  mt-10 mb-2" >
      <v-img :src="source" contain ></v-img>
      <v-divider></v-divider>
      <v-card-title > <h4>{{ name }}</h4> </v-card-title>
      <v-card-text>
        {{
          description ? description : "No description yet" | shortDescription
        }}
      </v-card-text>
      <v-chip
        class="pa-1 mx-1"
        color="blue"
        pill
        small
        v-for="(item, index) in skills"
        :key="index"
        >{{ item }}
      </v-chip>
      <v-card-actions>
        <v-btn
          class="mx-auto my-2 grey darken-4 white--text"
          @click="toggleDialogValue"
          >Know More</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Card",
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
    index: {
      type: Number,
    },
    skills: {
      type: Array,
    },
  },

  filters: {
    shortDescription: function (value) {
      if (value.length > 70) {
        return value.slice(0, 70) + "....";
      } else {
        return value;
      }
    },
  },

  methods: {
    toggleDialogValue: function () {
      this.$store.commit("toggleDialog");
    },
  },
};
</script>
<style>
/* #card{
  min-height: 290px;
} */
</style>

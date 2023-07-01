<template>
  <div id="card">
    <!-- <InfoDialog /> -->
    <template>
  <div id="detail-card" class="text-center">
    <v-dialog width="800" v-model="dialog">
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
      <v-card-text class="text-center">
            <h4> Contact -> {{ email }}</h4>
            </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


    <v-card light elevation="4" class="pa-5  mt-10 mb-2" max-width="auto">
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
          @click='dialog = !dialog'
          >Know More</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import InfoDialog from './InfoDialog.vue';
export default {
  name: "Card",
  components:{
    InfoDialog
  },
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
    email: {
      type: String,
    }
  },
  data() {
    return {
      dialog:false,
    }
  },
  filters: {
    shortDescription: function (value) {
      if (value.length > 50) {
        return value.slice(0, 50) + "....";
      } else {
        return value;
      }
    },
  },

  
};
</script>
<style>
/* #card{
  min-height: 290px;
} */
</style>

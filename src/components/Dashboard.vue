<template>
  <div>
    <v-row class="mt-6 mx-4">
      <v-col cols="12" md="3" sm="6">
        <!-- <Finder /> -->

        <template>
          <div>
            <v-row>
              <v-col cols="12">
                <v-card elevation="4" class="pa-5 pb-8 mt-10" dark>
                  <v-card-title primary-title class="justify-center">
                    <h2>Filter</h2>
                  </v-card-title>
                  <v-form class="pa-4">
                    <v-text-field
                      name="location"
                      label="Location"
                      v-model="locationFilter"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      name="skills"
                      label="Skills"
                      v-model="skillFilter"
                      outlined
                    ></v-text-field>

                    <v-btn
                      class="mx-auto font-weight-bold grey darken-2 v-size--x-large white--text"
                      block
                      @click="filterResults"
                      >Find</v-btn
                    >
                  </v-form>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-col>
      <InfoDialog />
      <template v-for="(item, index) in data">
        <v-col cols="12" md="3" sm="6" class="text-center">
          <Card
            :key="index"
            :description="item.description"
            :name="item.name"
            :skills="item.skills"
            :source="item.source"
          />
          <!-- <v-btn>click here</v-btn> -->
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import Card from "./Card.vue";
import InfoDialog from "./InfoDialog.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  components: {
    Card,
    InfoDialog,
  },
  data() {
    return {
      data: [],
      index: null,
      locationFilter: "",
      skillFilter: "",
    };
  },
  created() {
    // console.log("created called");
    this.getData();
  },

  methods: {
    async getData() {
      const querySnapshot = await getDocs(collection(db, "trainers"));
      querySnapshot.forEach((doc) => {
        const data = {
          name: doc.data().name,
          description: doc.data().description,
          skills: doc.data().skills,
          country: doc.data().country,
          source: doc.data().source,
        }
    
        this.data.push(data);
       
      });
      // console.log(this.data);
    },
    async filterResults() {
      // console.log("Run filter results ",this.locationFilter);

      // const q = query(
      //   collection(db, "trainers"),
      //   where("country", "==", this.locationFilter),
      // );

      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   const queryData = {
      //     name: doc.data().name,
      //     description: doc.data().description,
      //     skills: doc.data().skills,
      //     country: doc.data().country,
      //   };
      //   this.filteredData.push(queryData)
      // });
      // console.log(this.filteredData);
    },
  },
};
</script>

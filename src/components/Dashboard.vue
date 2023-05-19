<template>
  <div>
    <h2 class="ma-4">Hello {{ user | name }} !!</h2>
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
                      name="country"
                      label="country"
                      v-model="countryFilter"
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
                      @click="filterdResults"
                      >Find</v-btn
                    >
                  </v-form>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-col>
      <!-- <InfoDialog /> -->
      <template v-for="(item, index) in filteredData">
        <v-col cols="auto" md="3" sm="6" class="text-center">
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

import { collection,query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  components: {
    Card,
  },
  data() {
    return {
      data: [],
      filteredData:[],
      index: null,
      countryFilter: "",
      skillFilter: "",
    };
  },
  created() {
    // console.log("created called");
    this.getData();
  },

  computed: {
    user() {
      return this.$store.state.userDetails.name;
    },
    
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
        };

        this.data.push(data);
      });
      this.filteredData = this.data;
      // console.log(this.data);
    },
    // filterdResults() {
    //   if(this.skillFilter && this.countryFilter){
    //     const skillFilter = this.skillFilter.toLowerCase().trim();
      
    //     const countryFilter = this.countryFilter.toLowerCase().trim();
      

    //   this.filteredData = this.data.filter(candidate => {
    //     const candidateSkills = candidate.skills.map(skill => skill.toLowerCase().trim());
    //     // console.log(candidate.country);
    //     const candidateLocation = candidate.country.toLowerCase().trim();

    //     return candidateSkills.includes(skillFilter) && candidateLocation === countryFilter;
    //   })}
    //   else this.filteredData = this.data
    // },
    async filterdResults() {
      console.log("Run filter results ",this.skillFilter);
      if(this.skillFilter==""&&this.countryFilter=="") this.filteredData = this.data;

      const q = query(
        collection(db, "trainers"),
        where("skills", "array-contains", this.skillFilter),
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const queryData = {
          name: doc.data().name,
          description: doc.data().description,
          skills: doc.data().skills,
          country: doc.data().country,
        };
        this.filteredData = [];
        this.filteredData.push(queryData)
      });
      console.log(this.filteredData);
    },
    
  },
};
</script>

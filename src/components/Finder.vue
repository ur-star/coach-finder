<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card elevation="4" class="pa-5 pb-8 mt-10" dark>
          <v-card-title primary-title class="justify-center">
            <h2>Filter</h2>
          </v-card-title>
          <v-form class="pa-4">
            <v-text-field name="location" label="Location" outlined></v-text-field>
            <v-text-field name="tech" label="Technology" outlined></v-text-field>
            <v-text-field name="experience" label="Experience" outlined></v-text-field>
            <v-btn class="mx-auto font-weight-bold grey darken-2 v-size--x-large white--text" block>Find</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Finder",
  data() {
    return {};
  },
};
</script>

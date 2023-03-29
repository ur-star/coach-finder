<template>
    <div>
        <v-snackbar
      :timeout="3000"
      :value="true"
      color="red darken-3"
      absolute
      right
      rounded="pill"
      top
    >
    <h4 class="pa-1 ml-2">{{ msg }} </h4>
    </v-snackbar>
    </div>
</template>
<script>

export default{
    name:'Errorbar',
    props:{
        msg: String,
    }
}
</script>
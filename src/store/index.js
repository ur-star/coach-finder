import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer:true,
    drawerController:true,
    toggleDialog: false,
    isUserLoggedIn: false,
    userDetails:{
      name:"",
      uid:"",
      email:"",
      imageUrl:"",
    },

  },
  getters: {
  },
  mutations: {
    toggleDrawer(state){
      state.drawer = ! state.drawer
      // console.log("toggleDrawre called appbar",state.drawer);

    },
    drawerController(state,payload){
      state.drawerController = payload
      // console.log("drawercontroller store:",payload);
    },
    toggleDialog(state)
    {
      state.toggleDialog = !state.toggleDialog
    },
    toggleLoggedInStatus(state,payload){
      state.isUserLoggedIn =  payload
    },
    
    userDetails(state,{name,email,uid,imageUrl}){
      state.userDetails = {...state.userDetails,name:name,email:email,uid:uid,imageUrl:imageUrl}
    }
    
  },
  actions: {
  },
  modules: {
  }
})

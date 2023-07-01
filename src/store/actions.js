export const toggleDrawer=({commit})=>{
    commit('toggleDrawer')
  }
  export const toggleLoggedInStatus=({commit},payload)=>{
    commit('toggleLoggedInStatus',payload)
  }
  export const userDetails=({commit},payload)=>{
    commit('userDetails',payload)
  }
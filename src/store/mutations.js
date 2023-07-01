export const toggleDrawer =(state)=>{
    state.drawer = ! state.drawer
  }
  export const drawerController=(state,payload)=>{
    state.drawerController = payload
  }

  export const toggleLoggedInStatus=(state,payload)=>{
    state.isUserLoggedIn =  payload
  }
  
  export const userDetails=(state,{name,email,uid,imageUrl})=>{
    state.userDetails = {...state.userDetails,name:name,email:email,uid:uid,imageUrl:imageUrl}
  }
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.filter('name',function(value){
  let nameValue=[]
  if(value){ let data = value.toUpperCase().split(" ")
  nameValue = data[0]}
  return nameValue;
})
new Vue({
  router,
  store,
  Vuelidate,
  vuetify,
  render: h => h(App)
}).$mount('#app')

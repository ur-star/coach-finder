import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/homepage',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
  },
  {
    path: '/',
    name: 'login',
    component : LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import( '../views/Signup.vue')
  },
  {
    path: '/trainer-signup',
    name:'Trainer Signup',
    component: ()=> import('../views/TrainerSignup.vue')
  },
  {
    path:'/storage',
    name:'storage',
    component: ()=> import('../views/Storage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

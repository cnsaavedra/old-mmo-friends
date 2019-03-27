import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/profile:id',
      name: 'profile',
      component: Profile
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import UserList from '@/components/UserList'
import FindFriends from '@/components/Find/Index'
import Notifications from '@/components/Notifications'
import Friends from '@/components/Friends'

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
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: Profile
    // },
    {
      path: '/profile/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/users',
      name: 'users',
      component: UserList
    },
    {
      path: '/find',
      name: 'find',
      component: FindFriends
    },
    {
      path: '/notifs',
      name: 'notifs',
      component: Notifications
    },
    {
      path: '/myfriends',
      name: 'myfriends',
      component: Friends
    }
  ]
})

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
import MessageList from '@/components/Messaging/MessageList'
import Message from '@/components/Messaging/Message'

Vue.use(Router)

export default new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
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
    },
    {
      path: '/mymessages',
      name: 'mymessages',
      component: MessageList
    },
    {
      path: '/message/:username',
      name: 'message',
      component: Message
    }
  ]
})

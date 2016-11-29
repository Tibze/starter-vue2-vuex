import Vue from 'vue'
import Router from 'vue-router'
import Home from '../sections/Home.vue'
import About from '../sections/About.vue'
import Contact from '../sections/Contact.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/home' },
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      name: 'contact',
      path: '/contact',
      component: Contact
    }
  ]
})

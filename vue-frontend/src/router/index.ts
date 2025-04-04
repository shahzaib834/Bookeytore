import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // Lazy loading example
  //   component: () => import('../views/About.vue')
  // },
  // Example with parameters
  // {
  //   path: '/user/:id',
  //   name: 'User',
  //   component: () => import('../views/User.vue')
  // },
  // Catch-all route for 404
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFound.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
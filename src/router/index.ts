// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import RepairCost from '../pages/RepairCost.vue'
import RepairShops from '../pages/RepairShops.vue'

const routes = [
  { path: '/', component: RepairCost },
  { path: '/repair-shops', component: RepairShops }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
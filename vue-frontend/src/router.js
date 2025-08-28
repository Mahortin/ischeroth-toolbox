import { createRouter, createWebHistory } from 'vue-router'

import BegabungCalculator from './components/BegabungCalculatorView.vue'
import SanityView from './components/SanityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BegabungCalculator },
    { path: '/sanity', component: SanityView },
  ],
})

export default router
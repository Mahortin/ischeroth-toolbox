import { createRouter, createWebHistory } from 'vue-router'

import BegabungCalculator from './components/BegabungCalculatorView.vue'
import SanityView from './components/SanityView.vue'
import SanityAttributesView from './components/SanityAttributesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BegabungCalculator },
    { path: '/sanity', component: SanityView },
    { path: '/sanityAttributes', component: SanityAttributesView },
  ],
})

export default router
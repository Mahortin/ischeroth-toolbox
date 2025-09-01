import { createRouter, createWebHistory } from 'vue-router'

import BegabungCalculator from './components/begabungsCalculator/BegabungCalculatorView.vue'
import SanityView from './components/sanityViews/SanityView.vue'
import SanityAttributesView from './components/sanityViews/SanityAttributesView.vue'
import SanitySkillView from './components/sanityViews/SanitySkillView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BegabungCalculator },
    { path: '/sanity', component: SanityView },
    { path: '/sanityAttributes', component: SanityAttributesView },
    { path: '/sanitySkills', component: SanitySkillView },
  ],
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

import BegabungCalculator from './components/begabungsCalculator/BegabungCalculatorView.vue'
import SanityAttributesView from './components/sanityViews/SanityAttributesView.vue'
import SanitySkillView from './components/sanityViews/SanitySkillView.vue'
import SanityViewCombined from './components/sanityViews/SanityViewCombined.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BegabungCalculator },
    { path: '/sanityAttributes', component: SanityAttributesView },
    { path: '/sanitySkills', component: SanitySkillView },
    { path: '/sanityCombined', component: SanityViewCombined },
  ],
})

export default router
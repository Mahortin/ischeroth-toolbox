import { createRouter, createWebHistory } from 'vue-router'

import BegabungCalculator from './components/begabungsCalculator/BegabungCalculatorView.vue'
import SanityNames from './components/sanityViews/SanityNames.vue'
import NameSuggestor from './components/nameSuggestor/NameSuggestorView.vue'
import SourcesView from './components/SourcesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BegabungCalculator },
    { path: '/sanityNames', component: SanityNames },
    { path: '/nameSuggestor', component: NameSuggestor },
    { path: '/quellen', component: SourcesView },
  ],
})

export default router

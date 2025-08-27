<script setup>
import SkillsFilter from './skillComponents/SkillsFilter.vue'
import CoreStatsView from './skillComponents/CoreStatsView.vue'
import CombatSkillsView from './skillComponents/CombatSkillsView.vue'
import SkillView from './skillComponents/SkillsView.vue'
import { skillFilterStore } from '@/stores/skillFilterStore'

const store = skillFilterStore()
</script>

<template>
  <div class="column">
    <h2>Talente</h2>
    <SkillsFilter />
    <CoreStatsView
      v-if="
        store.groupfilter.length === 0 ||
        store.groupfilter.includes('coreStat') ||
        (store.groupfilter.length === 1 && store.groupfilter.includes('increased'))
      "
    />
    <CombatSkillsView
      v-if="
        store.groupfilter.length === 0 ||
        store.groupfilter.includes('kampf') ||
        (store.groupfilter.length === 1 && store.groupfilter.includes('increased'))
      "
    />
    <SkillView />
  </div>
</template>

<style scoped></style>

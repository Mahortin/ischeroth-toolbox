<script setup>
import SkillsFilter from './SkillsFilter.vue'
import CoreStatsView from './CoreStatsView.vue'
import CombatSkillsView from './CombatSkillsView.vue'
import SkillView from './SkillsView.vue'
import { useFilterStore } from '@/stores/filterStore'

const store = useFilterStore()
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

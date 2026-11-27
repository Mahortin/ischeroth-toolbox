<script setup>
import { computed } from 'vue'
import { useSkillFilterStore } from '@/stores/skillFilterStore'

const store = useSkillFilterStore()
const filterSummary = computed(
  () =>
    store.groupfilter.map((group) => (group === 'increased' ? 'Erhöhte' : group)).join(' · ') ||
    'Alle Gruppen',
)
</script>

<template>
  <details class="app-panel app-filter-panel" open>
    <summary>
      <span class="app-filter-label">Filter</span>
      <span>{{ filterSummary }}</span>
    </summary>
    <div class="filter-controls">
      <button
        v-for="group in store.skillgroups"
        :key="group.name"
        class="app-button"
        type="button"
        :aria-pressed="store.groupfilter.includes(group.name)"
        @click="store.addFilter(group.name)"
      >
        {{ group.name }}
      </button>
      <button
        class="app-button"
        type="button"
        :aria-pressed="store.groupfilter.includes('increased')"
        @click="store.addFilter('increased')"
      >
        Erhöhte
      </button>
      <button class="app-button" type="button" @click="store.resetFilter()">Reset</button>
    </div>
  </details>
</template>

<style scoped>
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
}
</style>

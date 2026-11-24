<script setup>
import { useNameFilterStore } from '@/stores/nameFilterStore'

const store = useNameFilterStore()
</script>

<template>
  <div class="name-filters">
    <div class="filter-button" v-for="species in store.species" :key="species.englishName">
      <button
        type="button"
        :aria-pressed="store.speciesFilter.includes(species.englishName)"
        @click="store.addSpeciesFilter(species.englishName)"
      >
        {{ species.name }}
      </button>
    </div>
    <button type="button" @click="store.resetSpeciesFilter()">Reset</button>
  </div>
</template>

<style scoped>
button {
  padding: 5px 5px;
  margin: 3px;
  border: none;
  border-radius: 8px; /* Softer edges with rounded corners */
  font-size: 16px;
}

.filter-button {
  display: inline-block;
}

button[aria-pressed='true'] {
  background-color: #93d800;
  color: #422002;
}
</style>

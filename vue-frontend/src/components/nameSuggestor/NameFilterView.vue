<script setup>
import { useNameFilterStore } from '@/stores/nameFilterStore'

const store = useNameFilterStore()
</script>

<template>
  <div class="filter-controls">
    <div class="filter-option" v-for="species in store.species" :key="species.englishName">
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

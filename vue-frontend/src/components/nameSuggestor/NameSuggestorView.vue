<script setup>
import NameSuggestor from './NameSuggestor.vue'
import FilterView from './NameFilterView.vue'
</script>

<template>
  <div class="name-directory">
    <FilterView />
    <NameSuggestor />
  </div>
</template>

<style scoped>
.name-directory {
  display: grid;
  gap: 1rem;
}
</style>

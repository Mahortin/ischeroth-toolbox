<script setup>
import { useSkillFilterStore } from '@/stores/skillFilterStore'

const store = useSkillFilterStore()
</script>

<template>
  <div class="filter-controls">
    <div class="filter-option" v-for="group in store.skillgroups" :key="group.name">
      <button
        type="button"
        :aria-pressed="store.groupfilter.includes(group.name)"
        @click="store.addFilter(group.name)"
      >
        {{ group.name }}
      </button>
    </div>
    <button
      type="button"
      :aria-pressed="store.groupfilter.includes('increased')"
      @click="store.addFilter('increased')"
    >
      Erhöhte
    </button>
    <button type="button" @click="store.resetFilter()">Reset</button>
  </div>
</template>

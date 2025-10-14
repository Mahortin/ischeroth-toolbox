<script setup>
import { useSkillFilterStore } from '@/stores/skillFilterStore'

const store = useSkillFilterStore()
</script>

<template>
  <div>
    <div class="filter-buttons" v-for="group in store.skillgroups" :key="group.name" >
      <button
        :class="store.groupfilter.includes(group.name) ? 'highlight' : ''"
        @click="store.addFilter(group.name)"
      >
        {{ group.name }}
      </button>
    </div>
    <button
      :class="store.groupfilter.includes('increased') ? 'highlight' : ''"
      @click="store.addFilter('increased')"
    >
      Erhöhte
    </button>
    <button @click="store.resetFilter()">Reset</button>
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

.filter-buttons {
  display: inline-block;
  flex-direction: row;
}

.highlight {
  justify-content: space-between;
  align-items: center;
  color: #93d800;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transitions */
}

button.highlight {
  background-color: #93d800; /* Modern blue background for active state */
  color: #422002; /* Change the font color to white when active */
}
</style>

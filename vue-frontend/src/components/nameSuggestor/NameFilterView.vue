<script setup>
import { useNameFilterStore } from '@/stores/nameFilterStore';

const store = useNameFilterStore()
</script>

<template>
  <div>filterView</div>
  <!-- <div>
    <div class="filter-buttons" v-for="gender in store.genders" :key="gender.name" >
      <button
        :class="store.genderFilter.includes(gender.englishName) ? 'highlight' : ''"
        @click="store.addGenderFilter(gender.englishName)"
      >
        {{ gender.name }}
      </button>
    </div>
    <button @click="store.resetGenderFilter()">Reset</button>
  </div> -->

  <div>
    <div class="filter-buttons" v-for="species in store.species" :key="species.name" >
      <button
        :class="store.speciesFilter.includes(species.name) ? 'highlight' : ''"
        @click="store.addSpeciesFilter(species.name)"
      >
        {{ species.name }}
      </button>
    </div>
    <button @click="store.resetSpeciesFilter()">Reset</button>
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
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  /* background-color: #93d800; 
  color: #422002;  */
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

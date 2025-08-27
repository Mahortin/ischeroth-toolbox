<script setup>
import { coreStatsStore } from '@/stores/coreStatsStore'

const store = coreStatsStore()
</script>

<template>
  <div>
    <table>
      <tr>
        <th>Grundwert</th>
        <th>Wert</th>
        <th>Gruppe</th>
      </tr>
      <tr
        :class="[coreStat.increased ? 'skill-info highlight' : 'skill-info']"
        v-for="coreStat in store.getFilteredCoreStats"
        :key="coreStat.key"
        :value="coreStat.value"
      >
        <td>{{ coreStat.name }}</td>
        <td>{{ coreStat.value }}</td>
        <td>{{ coreStat.group }}</td>
      </tr>
    </table>
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

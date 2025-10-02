<script setup>
import { onMounted } from 'vue'
import { useNameStore } from '@/stores/nameStore'

const store = useNameStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) // optional: swallow to avoid console noise
})

</script>

<template>
  <div>nameSuggestor</div>
<div class="column">
    <h2>Names from nameStore</h2>

    <div>
      <h1 class="green">Name List</h1>

      <div v-if="store.error">
        <p style="color: red">Error: {{ store.error }}</p>
      </div>

      <div v-else-if="store.loading">
        <p>Loading names...</p>
      </div>

      <ul v-else>
        <li v-for="name in store.getFilteredNames" :key="name.name">
          {{ name.name }}
        </li>
      </ul>
    </div>
  </div>
 
</template>

<style scoped></style>

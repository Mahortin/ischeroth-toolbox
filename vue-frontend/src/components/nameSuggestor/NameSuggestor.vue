<script setup>
import { onMounted } from 'vue'
import { useNameStore } from '@/stores/nameStore'

const store = useNameStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) // optional: swallow to avoid console noise
})
</script>

<template>
  <div>
    <div class="name-columns">
      <section aria-labelledby="diverse-names">
        <img src="../../assets/gender-transgender.svg" alt="" width="75" height="75" />
        <h2 id="diverse-names">Diverse</h2>
        <ul>
          <li v-for="name in store.getFilteredDiverseNames" :key="name.id">{{ name.name }}</li>
        </ul>
      </section>
      <section aria-labelledby="female-names">
        <img src="../../assets/gender-female.svg" alt="" width="75" height="75" />
        <h2 id="female-names">Female</h2>
        <ul>
          <li v-for="name in store.getFilteredFemaleNames" :key="name.id">{{ name.name }}</li>
        </ul>
      </section>
      <section aria-labelledby="male-names">
        <img src="../../assets/gender-male.svg" alt="" width="75" height="75" />
        <h2 id="male-names">Male</h2>
        <ul>
          <li v-for="name in store.getFilteredMaleNames" :key="name.id">{{ name.name }}</li>
        </ul>
      </section>
    </div>
    <p v-if="store.error" role="alert">Die Namen konnten nicht geladen werden.</p>
    <p v-else-if="!store.loadedAt" role="status">Namen werden geladen …</p>
  </div>
</template>

<style scoped>
.name-columns {
  display: grid;
  gap: 1rem;
}

@media (min-width: 480px) {
  .name-columns {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>

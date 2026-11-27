<script setup>
import { useSkillStore } from '@/stores/skillStore'

const store = useSkillStore()
</script>

<template>
  <section v-if="store.getFilteredGrundwerte.length" aria-label="Grundwerte">
    <h3>Grundwerte</h3>
    <dl class="base-stats">
      <div v-for="stat in store.getFilteredGrundwerte" :key="stat.id">
        <dt>{{ stat.name }}</dt>
        <dd class="result-value" :class="{ 'increased-value': stat.increased }">
          {{ stat.value }}
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.base-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: 0.5rem;
  margin-block-start: 0.5rem;
}

.base-stats > div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
}

.result-value {
  font-size: 1.2rem;
}
</style>

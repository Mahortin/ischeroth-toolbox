<script setup>
import { computed } from 'vue'
import { useNameStore } from '@/stores/nameStore'
import { useNameFilterStore } from '@/stores/nameFilterStore'
import { getSpeciesIcon, speciesDisplay } from './speciesDisplay'

const store = useNameFilterStore()
const nameStore = useNameStore()

const speciesOptions = computed(() => {
  const available = new Set(nameStore.names.map((name) => name.speciesGroup).filter(Boolean))
  const orderedIds = new Set([...speciesDisplay.keys(), ...available])
  return [...orderedIds]
    .filter((id) => available.has(id))
    .map((id) => {
      const display = speciesDisplay.get(id)
      return {
        id,
        label: display?.label ?? id,
        icon: getSpeciesIcon(display?.icon),
      }
    })
})

const cultureSpecies = computed(() => {
  if (!store.culture) return []
  const members = new Set(
    nameStore.names
      .filter((name) => name.cultureGroup === store.culture)
      .map((name) => name.speciesGroup),
  )
  return speciesOptions.value.filter((species) => members.has(species.id))
})

const selectionLabel = computed(() => {
  if (store.mode === 'culture') return store.culture ?? 'Kultur wählen'
  if (!store.species) return 'Spezies wählen'
  const species = speciesDisplay.get(store.species)?.label ?? store.species
  return `${species} · ${store.culture ?? 'Alle Kulturen'}`
})
</script>

<template>
  <details class="name-filters" open>
    <summary>
      <span class="summary-label">Filter</span>
      <span>{{ selectionLabel }}</span>
    </summary>
    <div class="filter-content">
      <div class="browse-modes" role="group" aria-label="Suchmodus">
        <button
          type="button"
          :aria-pressed="store.mode === 'species'"
          @click="store.selectMode('species')"
        >
          Nach Spezies
        </button>
        <button
          type="button"
          :aria-pressed="store.mode === 'culture'"
          @click="store.selectMode('culture')"
        >
          Nach Kultur
        </button>
      </div>
      <div v-if="store.mode === 'species'" class="species-grid" role="group" aria-label="Spezies">
        <button
          v-for="species in speciesOptions"
          :key="species.id"
          type="button"
          :aria-pressed="store.species === species.id"
          @click="store.selectSpecies(species.id)"
        >
          <img :src="species.icon" alt="" width="24" height="24" />
          {{ species.label }}
        </button>
      </div>
      <div
        v-if="nameStore.cultureOptions.length"
        class="cultures"
        role="group"
        aria-label="Kulturen"
      >
        <button
          v-if="store.mode === 'species'"
          type="button"
          :aria-pressed="store.culture === null"
          @click="store.culture = null"
        >
          Alle Kulturen
        </button>
        <button
          v-for="culture in nameStore.cultureOptions"
          :key="culture"
          type="button"
          :aria-pressed="store.culture === culture"
          @click="store.culture = culture"
        >
          {{ culture }}
        </button>
      </div>
      <p v-else-if="nameStore.isLoaded && store.mode === 'culture'" role="status">
        Keine Kulturen verfügbar.
      </p>
      <div v-if="cultureSpecies.length" class="culture-members">
        <p id="culture-members-label">Spezies in {{ store.culture }}</p>
        <ul aria-labelledby="culture-members-label" role="list">
          <li v-for="species in cultureSpecies" :key="species.id">
            <img :src="species.icon" alt="" width="20" height="20" />
            {{ species.label }}
          </li>
        </ul>
      </div>
    </div>
  </details>
</template>

<style scoped>
.name-filters {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background-soft);
}

summary {
  padding: 0.85rem 1rem;
  cursor: pointer;
}

.summary-label {
  margin-inline: 0.35rem 0.75rem;
  font-weight: 600;
  color: var(--color-heading);
}

.filter-content {
  display: grid;
  gap: 1rem;
  padding: 0 1rem 1rem;
}

.browse-modes,
.cultures {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.species-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
  gap: 0.5rem;
}

button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

button:not([aria-pressed='true']) {
  background: var(--color-background);
  color: var(--color-heading);
}

button:not([aria-pressed='true']):hover {
  border-color: var(--color-border-hover);
}

.species-grid img {
  flex: none;
}

.culture-members {
  border-top: 1px solid var(--color-border);
  padding-top: 0.75rem;
}

.culture-members ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  list-style: none;
  padding: 0;
  margin-top: 0.35rem;
}

.culture-members li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
</style>

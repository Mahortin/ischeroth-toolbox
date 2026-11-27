<script setup>
import { computed } from 'vue'
import { useNameStore } from '@/stores/nameStore'
import { useNameFilterStore } from '@/stores/nameFilterStore'

const store = useNameFilterStore()
const nameStore = useNameStore()

// Add an imported SVG as an entry's optional icon value.
const speciesDisplay = new Map(
  [
    { label: 'Mensch', id: 'human' },
    { label: 'Elf', id: 'elf' },
    { label: 'Satyr', id: 'satyr' },
    { label: 'Zwerg', id: 'dwarf' },
    { label: 'Goblin', id: 'goblin' },
    { label: 'Ork', id: 'orc' },
    { label: 'Felida', id: 'felida' },
    { label: 'Harakhaya', id: 'harakhaya' },
    { label: 'Khanidh', id: 'khanidh' },
    { label: 'Nezumi', id: 'nezumi' },
    { label: 'Panthera', id: 'panthera' },
    { label: 'Ursid', id: 'ursid' },
    { label: 'Adrisya', id: 'adrisya' },
    { label: 'Uramantha', id: 'uramantha' },
    { label: 'Charaki', id: 'charaki' },
    { label: 'Lorel', id: 'lorel' },
    { label: 'Zathoqua', id: 'zathoqua' },
    { label: 'Accior', id: 'accior' },
    { label: 'Ornior', id: 'ornior' },
    { label: 'Mari', id: 'mari' },
  ].map((species) => [species.id, species]),
)

const speciesOptions = computed(() => {
  const available = new Set(nameStore.names.map((name) => name.speciesGroup).filter(Boolean))
  const orderedIds = new Set([...speciesDisplay.keys(), ...available])
  return [...orderedIds]
    .filter((id) => available.has(id))
    .map((id) => speciesDisplay.get(id) ?? { id, label: id })
})
</script>

<template>
  <div class="filter-controls">
    <div class="filter-option" v-for="species in speciesOptions" :key="species.id">
      <button
        type="button"
        :aria-pressed="store.speciesFilter.includes(species.id)"
        @click="store.addSpeciesFilter(species.id)"
      >
        <img v-if="species.icon" :src="species.icon" alt="" width="20" height="20" />
        {{ species.label }}
      </button>
    </div>
    <button type="button" @click="store.resetSpeciesFilter()">Reset</button>
  </div>
</template>

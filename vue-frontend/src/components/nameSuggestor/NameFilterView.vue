<script setup>
import { computed } from 'vue'
import placeholderIcon from '@/assets/icons/enlightenment.svg'
import { useNameStore } from '@/stores/nameStore'
import { useNameFilterStore } from '@/stores/nameFilterStore'

const store = useNameFilterStore()
const nameStore = useNameStore()

const speciesIcons = import.meta.glob('/src/assets/icons/species/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Set icon to the SVG filename in assets/icons/species.
const speciesDisplay = new Map(
  [
    { label: 'Mensch', id: 'human', icon: 'person.svg' },
    { label: 'Elf', id: 'elf', icon: 'elf-ear.svg' },
    { label: 'Satyr', id: 'satyr', icon: 'hoof.svg' },
    { label: 'Zwerg', id: 'dwarf', icon: 'dwarf-helmet.svg' },
    { label: 'Goblin', id: 'goblin', icon: 'goblin-head.svg' },
    { label: 'Ork', id: 'orc', icon: 'orc-head.svg' },
    { label: 'Felida', id: 'felida', icon: 'lynx-head.svg' },
    { label: 'Harakhaya', id: 'harakhaya', icon: 'hyena-head.svg' },
    { label: 'Khanidh', id: 'khanidh', icon: 'wolf-head.svg' },
    { label: 'Nezumi', id: 'nezumi', icon: 'rat.svg' },
    { label: 'Panthera', id: 'panthera', icon: 'tiger-head.svg' },
    { label: 'Ursid', id: 'ursid', icon: 'bear-head.svg' },
    { label: 'Adrisya', id: 'adrisya', icon: 'chameleon-glyph.svg' },
    { label: 'Uramantha', id: 'uramantha', icon: 'rupee.svg' },
    { label: 'Charaki', id: 'charaki', icon: 'shark-jaws.svg' },
    { label: 'Lorel', id: 'lorel', icon: 'wave-crest.svg' },
    { label: 'Zathoqua', id: 'zathoqua', icon: 'frog-adjusted.svg' },
    { label: 'Accior', id: 'accior', icon: 'eagle-head.svg' },
    { label: 'Ornior', id: 'ornior', icon: 'raven.svg' },
    { label: 'Mari', id: 'mari', icon: 'insect-jaws.svg' },
  ].map((species) => [species.id, species]),
)

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
        icon: speciesIcons[`/src/assets/icons/species/${display?.icon}`] ?? placeholderIcon,
      }
    })
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
        <img :src="species.icon" alt="" width="20" height="20" />
        {{ species.label }}
      </button>
    </div>
    <button type="button" @click="store.resetSpeciesFilter()">Reset</button>
  </div>
</template>

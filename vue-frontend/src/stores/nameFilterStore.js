import { defineStore } from 'pinia'

export const useNameFilterStore = defineStore('nameFilterStore', {
  state: () => ({
    mode: 'species',
    species: null,
    culture: null,
  }),

  actions: {
    selectMode(mode) {
      if (this.mode === mode) return
      this.mode = mode
      this.species = null
      this.culture = null
    },
    selectSpecies(species) {
      if (this.species === species) return
      this.species = species
      this.culture = null
    },
  },
})

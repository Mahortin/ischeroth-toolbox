import { defineStore } from 'pinia'

export const useNameFilterStore = defineStore('nameFilterStore', {
  state: () => ({
    genders: [
      { name: 'Männlich', englishName: 'male' },
      { name: 'Weiblich', englishName: 'female' },
      { name: 'Divers', englishName: 'diverse' },
    ],
    species: [
      { name: 'Mensch' },
      { name: 'Elf' },
      { name: 'Zwerg' },
    ],
    genderFilter: [],
    speciesFilter: [],
  }),

  getters: {},
  actions: {
    resetGenderFilter() {
      this.genderFilter = []
    },
    resetSpeciesFilter() {
      this.speciesFilter = []
    },
    addGenderFilter(gender) {
      if (gender === null) window.alert('group is null!')

      !this.genderFilter.includes(gender)
        ? this.genderFilter.push(gender)
        : this.genderFilter.splice(this.genderFilter.indexOf(gender), 1)
    },
    addSpeciesFilter(species) {
      if (species === null) window.alert('species is null!')

      !this.speciesFilter.includes(species)
        ? this.speciesFilter.push(species)
        : this.speciesFilter.splice(this.speciesFilter.indexOf(species), 1)
    },
  },
})

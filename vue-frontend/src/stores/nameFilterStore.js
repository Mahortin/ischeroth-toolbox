import { defineStore } from 'pinia'

export const useNameFilterStore = defineStore('nameFilterStore', {
  state: () => ({
    genders: [
      { name: 'Männlich', englishName: 'male' },
      { name: 'Weiblich', englishName: 'female' },
      { name: 'Divers', englishName: 'diverse' },
    ],
    species: [
      { name: 'Mensch', englishName: 'human' },
      { name: 'Elf', englishName: 'elf' },
      { name: 'Satyr', englishName: 'satyr' },
      { name: 'Zwerg', englishName: 'dwarf' },
      { name: 'Goblin', englishName: 'goblin' },
      { name: 'Ork', englishName: 'orc' },
      { name: 'Felida', englishName: 'felida' },
      { name: 'Harakhaya', englishName: 'harakhaya' },
      { name: 'Khanidh', englishName: 'khanidh' },
      { name: 'Nezumi', englishName: 'nezumi' },
      { name: 'Panthera', englishName: 'panthera' },
      { name: 'Ursid', englishName: 'ursid' },
      { name: 'Adrisya', englishName: 'adrisya' },
      { name: 'Uramantha', englishName: 'uramantha' },
      { name: 'Charaki', englishName: 'charaki' },
      { name: 'Lorel', englishName: 'lorel' },
      { name: 'Zathoqua', englishName: 'zathoqua' },
      { name: 'Accior', englishName: 'accior' },
      { name: 'Ornior', englishName: 'ornior' },
      { name: 'Mari', englishName: 'mari' },
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

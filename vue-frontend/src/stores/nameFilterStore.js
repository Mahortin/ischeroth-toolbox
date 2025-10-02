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
  }),

  getters: {},
  actions: {
    resetFilter() {
      this.genderFilter = []
    },
    addFilter(criteria) {
      if (criteria === null) window.alert('group is null!')

      !this.genderFilter.includes(criteria)
        ? this.genderFilter.push(criteria)
        : this.genderFilter.splice(this.genderFilter.indexOf(criteria), 1)
    },
  },
})

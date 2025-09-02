import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', {
  state: () => ({
    skillgroups: [
      { name: 'Grundwert' },
      { name: 'Kampf' },
      { name: 'Körper' },
      { name: 'Gesellschaft' },
      { name: 'Natur' },
      { name: 'Wissen' },
      { name: 'Handwerk' },
    ],
    groupfilter: [],
  }),

  getters: {},
  actions: {
    resetFilter() {
      this.groupfilter = []
    },
    addFilter(groupName) {
      if (groupName === null) window.alert('group is null!')

      !this.groupfilter.includes(groupName)
        ? this.groupfilter.push(groupName)
        : this.groupfilter.splice(this.groupfilter.indexOf(groupName), 1)
    },
  },
})

import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', {
  state: () => ({
    skillgroups: [
      { key: 'coreStat', name: 'Grundwert' },
      { key: 'kampf', name: 'Kampf' },
      { key: 'körper', name: 'Körper' },
      { key: 'gesellschaft', name: 'Gesellschaft' },
      { key: 'natur', name: 'Natur' },
      { key: 'wissen', name: 'Wissen' },
      { key: 'handwerk', name: 'Handwerk' },
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

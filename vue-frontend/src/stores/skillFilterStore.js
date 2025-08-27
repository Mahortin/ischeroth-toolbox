import { defineStore } from 'pinia'

export const skillFilterStore = defineStore('skillFilterStore', {
  state: () => ({
    skillgroups: [
      { key: 'coreStat', name: 'Grundwerte' },
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
    addFilter(key) {
      if (key === null) window.alert('group is null!')

      !this.groupfilter.includes(key)
        ? this.groupfilter.push(key)
        : this.groupfilter.splice(this.groupfilter.indexOf(key), 1)
    },
  },
})

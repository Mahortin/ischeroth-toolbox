import { defineStore } from 'pinia'
import { useSkillFilterStore } from './skillFilterStore'
import { useSkillStore } from './skillStore'

export const useUpdateStore = defineStore('updateStore', {
  state: () => ({
    skillStore: useSkillStore(),
    filter: useSkillFilterStore(),
  }),

  getters: {
  },
  actions: {
    updateStores(shortName) {
      this.skillStore.calcUpdatedSkills(shortName);
      return shortName
    },
    resetFilter() {
      this.groupfilter = []
    },
  },
})

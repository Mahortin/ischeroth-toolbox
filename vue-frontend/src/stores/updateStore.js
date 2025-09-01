import { defineStore } from 'pinia'
import { useFilterStore } from './filterStore'
import { useSkillStore } from './skillStore'

export const useUpdateStore = defineStore('updateStore', {
  state: () => ({
    skillStore: useSkillStore(),
    //toDo: Implement other stores
    // combatSkillsStore: useCombatSkillStore(),
    // coreStats: useCoreStatsStore(),
    //toDo: Implement filters
    filter: useFilterStore(),
  }),

  getters: {
    // getFilteredSkills: (state) => {
    //   return state.filter.groupfilter.length === 0
    //     ? state.skills
    //     : state.skills.filter((skill) =>
    //         !state.filter.groupfilter.includes('increased')
    //           ? state.filter.groupfilter.includes(skill.groupkey)
    //           : state.filter.groupfilter.length === 1
    //             ? skill.increased
    //             : skill.increased && state.filter.groupfilter.includes(skill.groupkey),
    //       )
    // },
  },
  actions: {
    updateStores(shortName) {
      // window.alert('reached updateStore')
      //ToDo: update stores
      //in future: calcUpdatedSkills()

      // this.skillStore.calcAllSkills()
      this.skillStore.calcUpdatedSkills(shortName);
      // this.combatSkills.calcUpdatedSkills(key)
      // this.coreStats.calcUpdatedCoreStats(key)
      // return id
      return shortName
    },
    resetFilter() {
      this.groupfilter = []
    },
    addFilter(key) {
      if (key === null) window.alert('group is null!')

      !this.groupfilter.includes(key)
        ? this.groupfilter.push(key)
        : this.groupfilter.splice(this.groupfilter.indexOf(key))
    },
  },
})

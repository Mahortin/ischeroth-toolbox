import { defineStore } from 'pinia'
import { useSkillFilterStore } from './skillFilterStore'
import { useSkillStore } from './skillStore'

export const useUpdateStore = defineStore('updateStore', {
  state: () => ({
    skillStore: useSkillStore(),
    //toDo: Implement other stores
    // combatSkillsStore: useCombatSkillStore(),
    // coreStats: useCoreStatsStore(),
    //toDo: Implement filters
    filter: useSkillFilterStore(),
    
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
    updateStores(id) {
      // window.alert('reached updateStore')
      //ToDo: update stores
      this.skillStore.calcAllSkills();
      //in future: calcUpdatedSkills
      // this.skillStore.calcUpdatedSkills(id);
      // this.combatSkills.calcUpdatedSkills(key)
      // this.coreStats.calcUpdatedCoreStats(key)
      return id
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

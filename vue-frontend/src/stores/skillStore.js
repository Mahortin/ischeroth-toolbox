import { defineStore } from 'pinia'
import { fetchSkills } from '@/services/skillService'
import { useAttributeStore } from './attributeStore'
import { calculateStat } from './statCalculations'
import { useSkillFilterStore } from './skillFilterStore'

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    skillDefinitions: [],
    attributeStore: useAttributeStore(),
    loading: false,
    error: null,
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null, // private: track in-flight fetch
    filter: useSkillFilterStore(),
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    calculatedStats: (state) => {
      const attributesByName = new Map(
        state.attributeStore.attributes.map((attribute) => [attribute.shortName, attribute]),
      )
      return state.skillDefinitions.map((stat) => calculateStat(stat, attributesByName))
    },
    skills() {
      return this.calculatedStats.filter((stat) => stat.group !== 'Grundwert')
    },
    grundwerte() {
      return this.calculatedStats.filter((stat) => stat.group === 'Grundwert')
    },
    getFilteredSkills() {
      return filterStats(this.skills, this.filter.groupfilter)
    },
    getFilteredGrundwerte() {
      return filterStats(this.grundwerte, this.filter.groupfilter)
    },
  },
  actions: {
    async ensureLoaded({ force = false, ttlMs = 0 } = {}) {
      // If we already have fresh data and not forcing, bail
      const freshEnough = this.loadedAt && (!ttlMs || Date.now() - this.loadedAt < ttlMs)

      if (!force && freshEnough) return

      // De-dupe parallel callers
      if (this._promise) return this._promise

      this.loading = true
      this.error = null

      this._promise = (async () => {
        try {
          this.skillDefinitions = await fetchSkills()
          this.loadedAt = Date.now()
        } catch (e) {
          this.error = e
          throw e
        } finally {
          this.loading = false
          this._promise = null
        }
      })()

      return this._promise
    },
    async refresh() {
      return this.ensureLoaded({ force: true })
    },

    invalidate() {
      this.loadedAt = null
    },
  },
})

function filterStats(stats, filters) {
  const increasedOnly = filters.includes('increased')
  const groups = filters.filter((filter) => filter !== 'increased')
  return stats.filter(
    (stat) => (!increasedOnly || stat.increased) && (!groups.length || groups.includes(stat.group)),
  )
}

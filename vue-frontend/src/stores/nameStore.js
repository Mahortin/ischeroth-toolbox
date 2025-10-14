import { defineStore } from 'pinia'
import { fetchNames } from '@/services/nameService'
import { useNameFilterStore } from './nameFilterStore'

export const useNameStore = defineStore('nameStore', {
  state: () => ({
    names: [],
    loading: false,
    error: null,
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null, // private: track in-flight fetch
    filter: useNameFilterStore(),
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    getFilteredNames: (state) => {

      if (state.filter.genderFilter == 0)
        return state.names
      return state.names.filter((name) => state.filter.genderFilter.includes(name.gender))
    },
    getFilteredDiverseNames: (state) => {
      if (state.filter.speciesFilter == 0)
        return state.names.filter((name) => name.gender === 'neutral')
      return state.names.filter(
        (name) => state.filter.speciesFilter.includes(name.group) && name.gender === 'neutral',
      )
    },
    getFilteredFemaleNames: (state) => {
      if (state.filter.speciesFilter == 0)
        return state.names.filter((name) => name.gender === 'female')
      return state.names.filter(
        (name) => state.filter.speciesFilter.includes(name.group) && name.gender === 'female',
      )
    },
    getFilteredMaleNames: (state) => {
      if (state.filter.speciesFilter == 0)
        return state.names.filter((name) => name.gender === 'male')
      return state.names.filter(
        (name) => state.filter.speciesFilter.includes(name.group) && name.gender === 'male',
      )
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
          const data = await fetchNames()
          this.names = data
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

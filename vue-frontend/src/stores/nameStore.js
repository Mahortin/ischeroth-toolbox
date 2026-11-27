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
    cultureOptions: ({ names, filter }) => {
      const relevantNames =
        filter.mode === 'species'
          ? names.filter((name) => name.speciesGroup === filter.species)
          : names
      const cultures = relevantNames.map((name) => name.cultureGroup)
      return [...new Set(cultures.filter((culture) => culture && culture !== 'placeholder'))].sort(
        (a, b) => a.localeCompare(b, 'de'),
      )
    },
    hasSelection: ({ filter }) =>
      Boolean(filter.mode === 'species' ? filter.species : filter.culture),
    getFilteredNames() {
      if (!this.hasSelection) return []
      const { mode, species, culture } = this.filter
      return this.names.filter(
        (name) =>
          (mode === 'culture' || name.speciesGroup === species) &&
          (!culture || name.cultureGroup === culture),
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

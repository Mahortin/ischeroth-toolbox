import { defineStore } from 'pinia'
import { fetchAttributes } from '@/services/attributeService'
import { effectiveAttributeValue } from './statCalculations'

export const useAttributeStore = defineStore('attributeStore', {
  state: () => ({
    attributes: [],
    loading: false,
    error: null,
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null, // private: track in-flight fetch
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    getIncreasedValue: (state) => (id) => {
      const attribute = state.attributes.find((entry) => entry.id === id)
      return attribute && effectiveAttributeValue(attribute)
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
          const data = await fetchAttributes()
          this.attributes = data
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

    increaseAttribute(id, newValue) {
      const attribute = this.attributes.find((entry) => entry.id === id)
      if (!attribute) return

      attribute.increased = attribute.increased === newValue ? 0 : newValue
    },
    adjustBaseValue(id, adjustment) {
      const attribute = this.attributes.find((entry) => entry.id === id)
      if (!attribute) return

      attribute.value = Math.min(16, Math.max(7, attribute.value + adjustment))
    },
  },
})

import { defineStore } from 'pinia'
import { fetchAttributes } from '@/services/attributeService'
import { useUpdateStore } from './updateStore'

export const useAttributeStore = defineStore('attributeStore', {
  state: () => ({
    updateStore: useUpdateStore(),
    attributes: [],
    loading: false,
    error: null,
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null, // private: track in-flight fetch
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    getValueById: (state) => {
      return (attributeId) =>
        state.attributes.find((attribute) => attribute.id === attributeId).value +
        state.attributes.find((attribute) => attribute.id === attributeId).increased
    },
    getValue: (state) => {
      return (attributeId) =>
        state.attributes.find((attribute) => attribute.id === attributeId).value
    },
    getIncreasedValue: (state) => {
      return (attributeId) =>
        state.attributes.find((attribute) => attribute.id === attributeId).value +
        state.attributes.find((attribute) => attribute.id === attributeId).increased
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
          this.attributes.forEach((attribute) => {
            attribute.valueIncreased = attribute.value
          })
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

    /* --- user interface actions --- */
    increaseAttribute(id, newValue) {
      if (id === null) window.alert('attribute is null!')

      this.attributes.forEach((attribute) => {
        if (attribute.id === id) {
          attribute.increased = attribute.increased === newValue ? 0 : newValue
          attribute.valueIncreased = attribute.value + attribute.increased
          this.updateStore.updateStores(attribute.shortName)
        }
      })
    },
    adjusteBaseValue(id, adjustment) {
      // window.confirm('reached characterStore')
      if (id === null) window.alert('attribute is null!')

      this.attributes.forEach((attribute) => {
        if (attribute.id === id) {
          attribute.value = attribute.value + adjustment
          if (attribute.value > 16 || attribute.value < 7)
            attribute.value = attribute.value > 16 ? 16 : 7

          attribute.valueIncreased = attribute.value + attribute.increased
          this.updateStore.updateStores(attribute.shortName)
        }
      })
    },
  },
})

import { defineStore } from 'pinia'
import { fetchAttributes } from '@/services/attributeService';

export const useAttributeStore = defineStore('attributeStore', {
  state: () => ({
    attributes: [], 
    loading: false,
    error: null, 
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null // private: track in-flight fetch
    
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    getValueByKey: (state) => {
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
      const freshEnough =
        this.loadedAt && (!ttlMs || (Date.now() - this.loadedAt) < ttlMs);

      if (!force && freshEnough) return;

      // De-dupe parallel callers
      if (this._promise) return this._promise;

      this.loading = true;
      this.error = null;

      this._promise = (async () => {
        try {
          const data = await fetchAttributes();
          this.attributes = data;
          this.loadedAt = Date.now();
        } catch (e) {
          this.error = e;
          throw e;
        } finally {
          this.loading = false;
          this._promise = null;
        }
      })();

      return this._promise;
    },
    async refresh() {
      return this.ensureLoaded({ force: true });
    },

    invalidate() {
      this.loadedAt = null;
    },

    // user interface actions
    increaseAttribute(id, newValue) {
      if (id === null) window.alert('attribute is null!')

      this.attributes.forEach((attribute) => {
        if (attribute.id === id) {
          attribute.increased = attribute.increased === newValue ? 0 : newValue
        }
      })
      // this.updateStores(id)
    },
    adjusteBaseValue(id, adjustment) {
      // window.confirm('reached characterStore')
      if (id === null) window.alert('attribute is null!')

      this.attributes.forEach((attribute) => {
        if (attribute.id === id) {
          attribute.value = attribute.value + adjustment
          if (attribute.value > 16 || attribute.value < 7)
            attribute.value = attribute.value > 16 ? 16 : 7
        }
      })
      this.updateStores(id)
    },


    // async addTodo(payload) {
    //   // optional: optimistic update
    //   const temp = { id: `temp_${Math.random()}`, ...payload };
    //   this.attributes.unshift(temp);
    //   try {
    //     const created = await createTodo(payload);
    //     // replace temp with real
    //     const idx = this.attributes.findIndex(t => t.id === temp.id);
    //     if (idx !== -1) this.attributes[idx] = created;
    //   } catch (e) {
    //     // rollback
    //     this.attributes = this.attributes.filter(t => t.id !== temp.id);
    //     this.error = e;
    //     throw e;
    //   }
    // },
  },
})

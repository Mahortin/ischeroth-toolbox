import { defineStore } from 'pinia'
import { fetchAttributes } from '@/services/attributeService';

export const attributeStore = defineStore('attributeStore', {
  state: () => ({
    attributes: [], 
    loading: false,
    error: null, 
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null // private: track in-flight fetch
    
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    // example derived data
    completedCount: (s) => s.attributes.filter(t => t.completed).length,
    getValueByKey: (state) => {
      return (attributeKey) =>
        state.attributes.find((attribute) => attribute.key === attributeKey).value +
        state.attributes.find((attribute) => attribute.key === attributeKey).increased
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

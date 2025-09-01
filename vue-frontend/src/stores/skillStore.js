import { defineStore } from 'pinia'
import { fetchSkills } from '@/services/skillService';

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    skills: [], 
    loading: false,
    error: null, 
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null // private: track in-flight fetch
    
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
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
          const data = await fetchSkills();
          this.skills = data;
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
  },
})

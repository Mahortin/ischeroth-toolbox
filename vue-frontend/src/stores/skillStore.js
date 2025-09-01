import { defineStore } from 'pinia'
import { fetchSkills } from '@/services/skillService';
import { useAttributeStore } from './attributeStore';

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    skills: [], 
    attributeStore: useAttributeStore(),
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

    /* --- user interface actions --- */
    increaseSkill(id) {
      // window.alert('reached sth - id:' + id)
      // window.alert('reached sth')
      if (id === null) window.alert('skill is null!')

        this.skills.forEach((skill) => {
          // window.alert('reached inner circle')
          if (skill.id === id) {
            // window.alert('skill.id ' + skill.id + " | id:" + id)
            skill.value = skill.value + 1
            if (skill.value > 18 || skill.value < 1)
              skill.value = skill.value > 18 ? 18 : 0
          }
        })
    },
    calcAllSkills() {
      // window.alert('reached calcAllSkills')
      this.skills.forEach((skill) => {
        // window.alert('calcAllSkills: calcSkill for: ' + skill.name)
        this.calcSkill(skill)
      })
      // window.alert('end of calcAllSkills')
    },
    calcUpdatedSkills(shortName) {
      // window.alert('reached calcUpdatedSkills and check for: ' + shortName)
      this.skills.forEach((skill) => {
        // window.alert('reached calcUpdatedSkills for: ' + skill.name + ':' + skill.id + " | " + skill.attributes)
        // window.alert('skill.attributes.includes(shortName): ' + skill.attributes.includes(shortName))
        if (!skill.attributes.includes(shortName)) return
        this.calcSkill(skill)
      })
    },
    calcSkill(skill) {
      // window.alert('reached calcSkill for: ' + skill.name)
      // window.alert('reached milestone 0')

      var firstAttribute = this.attributeStore.attributes.find(
        (attribute) => attribute.shortName === skill.attributes[0],
      )
      // window.alert('reached milestone 0.3')
      var secondAttribute = this.attributeStore.attributes.find(
        (attribute) => attribute.shortName === skill.attributes[1],
      )
      // window.alert('reached milestone 0.6')
      var thirdAttribute = this.attributeStore.attributes.find(
        (attribute) => attribute.shortName === skill.attributes[2],
      )
      // window.alert('reached milestone 1')
      if (
        firstAttribute.increased === 0 &&
        secondAttribute.increased === 0 &&
        thirdAttribute.increased === 0
      ) {
        skill.value = Math.round(
          (firstAttribute.value + secondAttribute.value + thirdAttribute.value) / skill.divisor,
        )
        skill.increased = false
      } else {
        var baseValue = Math.round(
          (firstAttribute.value + secondAttribute.value + thirdAttribute.value) / skill.divisor,
        )
        var value = Math.round(
          (firstAttribute.value +
            secondAttribute.value +
            thirdAttribute.value +
            firstAttribute.increased +
            secondAttribute.increased +
            thirdAttribute.increased) /
            skill.divisor,
        )
        skill.value = value
        skill.increased = value > baseValue ? true : false
      }
    },
  },
})

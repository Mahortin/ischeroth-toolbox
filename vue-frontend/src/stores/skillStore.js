import { defineStore } from 'pinia'
import { fetchSkills } from '@/services/skillService'
import { useAttributeStore } from './attributeStore'
import { useSkillFilterStore } from './skillFilterStore'

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    skills: [],
    grundwerte: [],
    attributeStore: useAttributeStore(),
    loading: false,
    error: null,
    loadedAt: null, // Date or timestamp for caching / staleness
    _promise: null, // private: track in-flight fetch
    filter: useSkillFilterStore(),
  }),

  getters: {
    isLoaded: (s) => !!s.loadedAt && !s.loading,
    getFilteredSkills: (state) => {
      if (state.filter.groupfilter.length === 0) return state.skills
      return state.skills.filter((skill) =>
        !state.filter.groupfilter.includes('increased')
          ? state.filter.groupfilter.includes(skill.group)
          : state.filter.groupfilter.length === 1
            ? skill.increased
            : skill.increased && state.filter.groupfilter.includes(skill.group),
      )
    },
    getFilteredGrundwerte: (state) => {
      if (state.filter.groupfilter.length === 0) return state.grundwerte
      return state.grundwerte.filter((grundwert) =>
        !state.filter.groupfilter.includes('increased')
          ? state.filter.groupfilter.includes(grundwert.group)
          : state.filter.groupfilter.length === 1
            ? grundwert.increased
            : grundwert.increased && state.filter.groupfilter.includes(grundwert.group),
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
          const data = await fetchSkills()
          this.skills = data.filter((entry) => entry.group !== 'Grundwert')
          this.grundwerte = data.filter((entry) => entry.group === 'Grundwert')
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
    increaseSkill(id) {
      // window.alert('reached sth - id:' + id)
      // window.alert('reached sth')
      if (id === null) window.alert('skill is null!')

      this.skills.forEach((skill) => {
        // window.alert('reached inner circle')
        if (skill.id === id) {
          // window.alert('skill.id ' + skill.id + " | id:" + id)
          skill.value = skill.value + 1
          if (skill.value > 18 || skill.value < 1) skill.value = skill.value > 18 ? 18 : 0
        }
      })
    },
    calcAllStats() {
      // window.alert('reached calcAllSkills')
      this.grundwerte.forEach((grundwert) => {
        this.calcNonCombatSkill(grundwert)
      })
      this.skills.forEach((skill) => {
        // window.alert('calcAllSkills: calcSkill for: ' + skill.name)
        skill.group === 'Kampf' ? this.calcCombatSkill(skill) : this.calcNonCombatStat(skill)
      })
      // window.alert('end of calcAllSkills')
    },
    calcUpdatedSkills(id) {
      this.grundwerte.forEach((grundwert) => {
        // window.alert('reached grundwert:' + grundwert.name)
        if (!grundwert.attributes.includes(id)) return
        this.calcNonCombatStat(grundwert)
        // window.alert('reached end ')
      })
      this.skills.forEach((skill) => {
        if (!skill.attributes.includes(id)) return
        skill.group === 'Kampf' ? this.calcCombatSkill(skill) : this.calcNonCombatStat(skill)
      })
    },
    calcNonCombatStat(stat) {
      // window.alert('reached calcSkill for: ' + stat.name)
      // window.alert('reached milestone 0')

      var firstAttribute = this.attributeStore.attributes.find(
        (attribute) => attribute.shortName === stat.attributes[0],
      )
      // window.alert('reached milestone 0.3')
      var secondAttribute = this.attributeStore.attributes.find(
        (attribute) => attribute.shortName === stat.attributes[1],
      )
      // window.alert('reached milestone 0.6')
      var thirdAttribute = this.attributeStore.attributes.find(
        (attribute) => attribute.shortName === stat.attributes[2],
      )
      // window.alert('reached milestone 1')
      if (
        firstAttribute.increased === 0 &&
        secondAttribute.increased === 0 &&
        thirdAttribute.increased === 0
      ) {
        stat.value = Math.round(
          (firstAttribute.value + secondAttribute.value + thirdAttribute.value) / stat.divisor,
        )
        stat.increased = false
      } else {
        var baseValue = Math.round(
          (firstAttribute.value + secondAttribute.value + thirdAttribute.value) / stat.divisor,
        )
        var value = Math.round(
          (firstAttribute.value +
            secondAttribute.value +
            thirdAttribute.value +
            firstAttribute.increased +
            secondAttribute.increased +
            thirdAttribute.increased) /
            stat.divisor,
        )
        stat.value = value
        stat.increased = value > baseValue ? true : false
      }
    },
    calcCombatSkill(skill) {
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
      // window.alert('firstAttribute -> ' + firstAttribute.shortName + ":" + firstAttribute.valueIncreased + "(" + firstAttribute.value + ")")
      // window.alert('secondAttribute -> ' + secondAttribute.shortName + ":" + secondAttribute.valueIncreased + "(" + secondAttribute.value + ")")
      // window.alert('thirdAttribute -> ' + thirdAttribute.shortName + ":" + thirdAttribute.valueIncreased + "(" + thirdAttribute.value + ")")
      var highestAttributes = []
      if (
        firstAttribute.valueIncreased > secondAttribute.valueIncreased ||
        firstAttribute.valueIncreased > thirdAttribute.valueIncreased
      )
        highestAttributes.push(firstAttribute)
      if (highestAttributes.length === 0) {
        highestAttributes.push(secondAttribute)
        highestAttributes.push(thirdAttribute)
      } else {
        highestAttributes.push(
          secondAttribute.valueIncreased >= thirdAttribute.valueIncreased
            ? secondAttribute
            : thirdAttribute,
        )
      }
      // window.alert('reached milestone 2')
      if (highestAttributes.some((attribute) => attribute.increased)) {
        // window.alert('milestone 2.3: spotted increased value')
        var base = 0
        var increasedBase = 0
        // window.alert('milestone 2.4')
        highestAttributes.forEach((attribute) => {
          base += attribute.value
          increasedBase += attribute.valueIncreased
          // window.alert(
          //   'attribute:' +
          //     attribute.shortName +
          //     ' value:' +
          //     attribute.value +
          //     ' increasedValue:' +
          //     attribute.valueIncreased +
          //     ' base:' +
          //     base +
          //     ' increasedBase:' +
          //     increasedBase,
          // )
        })
        base = Math.round(base / skill.divisor)
        increasedBase = Math.round(increasedBase / skill.divisor)
        skill.value = increasedBase > base ? increasedBase : base
        skill.increased = increasedBase > base ? true : false
      } else {
        // window.alert('milestone 2.6: spotted increased value')
        var baseSum = 0
        // window.confirm('base:startBase -> ' + skill.base + ':' + baseSum)
        highestAttributes.forEach((attribute) => {
          baseSum += attribute.value
          // window.alert(attribute.name + ":" + attribute.value)
        })
        skill.value = Math.round(baseSum / skill.divisor)
        // window.confirm('base:baseSum -> ' + skill.base + ':' + baseSum)
        skill.increased = false
      }
      // window.alert('reached milestone 3')
    },
  },
})

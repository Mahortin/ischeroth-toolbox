import { defineStore } from 'pinia'
import { characterStore } from './characterStore'
import { skillFilterStore } from './skillFilterStore'

export const coreStatsStore = defineStore('coreStatsStore', {
  state: () => ({
    characterStore: characterStore(),
    filter: skillFilterStore(),
    coreStats: [
      {
        key: 'robustheit',
        name: 'Robustheit',
        value: 12,
        attributes: ['St', 'Ko', 'Ko'],
        divide: 3,
        increased: false,
        group: 'Grundwert',
        groupkey: 'coreStat',
      },
      {
        key: 'bewegung',
        name: 'Bewegung',
        value: 7,
        attributes: ['Au', 'Ge', 'Ge'],
        divide: 5,
        increased: false,
        group: 'Grundwert',
        groupkey: 'coreStat',
      },
      {
        key: 'mumm',
        name: 'Mumm',
        value: 7,
        attributes: ['Mu', 'Mu', 'Ve'],
        divide: 5,
        increased: false,
        group: 'Grundwert',
        groupkey: 'coreStat',
      },
      {
        key: 'reflexe',
        name: 'Reflexe',
        value: 12,
        attributes: ['Ve', 'Au', 'Ge'],
        divide: 3,
        increased: false,
        group: 'Grundwert',
        groupkey: 'coreStat',
      },
      {
        key: 'sprachbegabung',
        name: 'Sprachbegabung',
        value: 12,
        attributes: ['Ve', 'Au', 'Ch'],
        divide: 3,
        increased: false,
        group: 'Grundwert',
        groupkey: 'coreStat',
      },
    ],
  }),

  getters: {
    getValueByKey: (state) => {
      return (attributeKey) =>
        state.attributes.find((attribute) => attribute.key === attributeKey).value +
        state.attributes.find((attribute) => attribute.key === attributeKey).increased
    },
    getFilteredCoreStats: (state) => {
      return state.filter.groupfilter.length === 0
        ? state.coreStats
        : state.coreStats.filter((coreStat) =>
            !state.filter.groupfilter.includes('increased')
              ? state.filter.groupfilter.includes(coreStat.groupkey)
              : state.filter.groupfilter.length === 1
                ? coreStat.increased
                : coreStat.increased && state.filter.groupfilter.includes(coreStat.groupkey),
          )
    },
  },
  actions: {
    calcAllCoreStats() {
      this.coreStats.forEach((coreStat) => {
        this.calcCoreStat(coreStat)
      })
    },
    calcUpdatedCoreStats(key) {
      // window.confirm('reached calcUpdatedCoreStats')
      this.coreStats.forEach((coreStat) => {
        if (!coreStat.attributes.includes(key)) return
        this.calcCoreStat(coreStat)
      })
    },
    calcCoreStat(coreStat) {
      // window.confirm('reached calcCoreStat')
      var firstAttribute = this.characterStore.attributes.find(
        (attribute) => attribute.key === coreStat.attributes[0],
      )
      var secondAttribute = this.characterStore.attributes.find(
        (attribute) => attribute.key === coreStat.attributes[1],
      )
      var thirdAttribute = this.characterStore.attributes.find(
        (attribute) => attribute.key === coreStat.attributes[2],
      )

      if (
        firstAttribute.increased === 0 &&
        secondAttribute.increased === 0 &&
        thirdAttribute.increased === 0
      ) {
        coreStat.value = Math.round(
          (firstAttribute.value + secondAttribute.value + thirdAttribute.value) / coreStat.divide,
        )
        coreStat.increased = false
      } else {
        var baseValue = Math.round(
          (firstAttribute.value + secondAttribute.value + thirdAttribute.value) / coreStat.divide,
        )
        var value = Math.round(
          (firstAttribute.value +
            secondAttribute.value +
            thirdAttribute.value +
            firstAttribute.increased +
            secondAttribute.increased +
            thirdAttribute.increased) /
            coreStat.divide,
        )
        coreStat.value = value
        coreStat.increased = value > baseValue ? true : false
      }
      // window.confirm('end of calcCoreStat')
    },
  },
})

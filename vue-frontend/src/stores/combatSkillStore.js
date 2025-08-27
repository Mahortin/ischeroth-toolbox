import { defineStore } from 'pinia'
import { characterStore } from './characterStore'
import { skillFilterStore } from './skillFilterStore'

export const combatSkillStore = defineStore('combatSkillStore', {
  state: () => ({
    characterStore: characterStore(),
    filter: skillFilterStore(),
    skills: [
      {
        key: 'dolchFechtwaffen',
        name: 'Dolch & Fechtwaffen',
        base: 12,
        attributes: ['Mu', 'Fi', 'Ge'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'hiebKettenwaffen',
        name: 'Hieb- & Kettenwaffen',
        base: 12,
        attributes: ['Mu', 'St', 'Ko'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'raufenRingen',
        name: 'Raufen & Ringen',
        base: 12,
        attributes: ['Mu', 'Ge', 'St'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'saebelSchwerter',
        name: 'Säbel & Schwerter',
        base: 12,
        attributes: ['Mu', 'Ge', 'St'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'speereStaebe',
        name: 'Speere & Stäbe',
        base: 12,
        attributes: ['Mu', 'Fi', 'St'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'schilde',
        name: 'Schilde',
        base: 12,
        attributes: ['Au', 'St', 'Ko'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'armbrust',
        name: 'Armbrust',
        base: 12,
        attributes: ['Au', 'Fi', 'St'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'bogen',
        name: 'Bogen',
        base: 12,
        attributes: ['Au', 'Ge', 'St'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'feuerrohre',
        name: 'Feuerrohre',
        base: 12,
        attributes: ['Au', 'Ve', 'Fi'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
      {
        key: 'wurfSchleuderwaffen',
        name: 'Wurf & Schleuderwaffen',
        base: 12,
        attributes: ['Au', 'Fi', 'Ge'],
        divide: 2,
        increased: false,
        group: 'Kampf',
        groupkey: 'kampf',
      },
    ],
  }),

  getters: {
    getValueByKey: (state) => {
      return (attributeKey) =>
        state.attributes.find((attribute) => attribute.key === attributeKey).value +
        state.attributes.find((attribute) => attribute.key === attributeKey).increased
    },
    getFilteredSkills: (state) => {
      return state.filter.groupfilter.length === 0
        ? state.skills
        : state.skills.filter((skill) =>
            !state.filter.groupfilter.includes('increased')
              ? state.filter.groupfilter.includes(skill.groupkey)
              : state.filter.groupfilter.length === 1
                ? skill.increased
                : skill.increased && state.filter.groupfilter.includes(skill.groupkey),
          )
    },
  },
  actions: {
    calcAllSkills() {
      this.skills.forEach((skill) => {
        this.calcSkill(skill)
      })
    },
    calcUpdatedSkills(key) {
      // window.confirm('reached combatSkillStore')
      this.skills.forEach((skill) => {
        if (!skill.attributes.includes(key)) return
        this.calcSkill(skill)
      })
    },
    calcSkill(skill) {
      // window.confirm('reached calcSkill with: ' + skill.name)
      var firstAttribute = this.characterStore.attributes.find(
        (attribute) => attribute.key === skill.attributes[0],
      )
      var secondAttribute = this.characterStore.attributes.find(
        (attribute) => attribute.key === skill.attributes[1],
      )
      var thirdAttribute = this.characterStore.attributes.find(
        (attribute) => attribute.key === skill.attributes[2],
      )

      var currentFirstAttr = firstAttribute.value + firstAttribute.increased
      var currentSecondAttr = secondAttribute.value + secondAttribute.increased
      var currentThirdAttr = thirdAttribute.value + thirdAttribute.increased

      var attackAttributes = []
      if (currentThirdAttr > currentFirstAttr || currentThirdAttr > currentSecondAttr) {
        attackAttributes.push(thirdAttribute)
      }
      if (attackAttributes.length === 0) {
        attackAttributes.push(firstAttribute)
        attackAttributes.push(secondAttribute)
      } else
        attackAttributes.push(
          currentFirstAttr > currentSecondAttr ? firstAttribute : secondAttribute,
        )

      // window.confirm('reached calcSkill after all attributes: ')

      /* calculate base value */
      if (attackAttributes.some((attribute) => attribute.increased)) {
        // window.confirm('enter calcBase increased')
        var startBase = 0
        var baseIncreased = 0
        attackAttributes.forEach((attribute) => {
          startBase += attribute.value
          baseIncreased += attribute.value + attribute.increased
        })
        startBase = Math.round(startBase / skill.divide)
        baseIncreased = Math.round(baseIncreased / skill.divide)
        skill.base = baseIncreased
        skill.increased = baseIncreased > startBase ? true : false
      } else {
        // window.confirm('enter calcBase')
        var baseSum = 0
        // window.confirm('base:startBase -> ' + skill.base + ':' + baseSum)
        attackAttributes.forEach((attribute) => {
          baseSum += attribute.value
        })
        skill.base = Math.round(baseSum / skill.divide)
        // window.confirm('base:baseSum -> ' + skill.base + ':' + baseSum)
        skill.increased = false
      }
    },
  },
})

import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAttributeStore } from '../attributeStore'
import { useSkillStore } from '../skillStore'

describe('combat skill calculations', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function addCombatSkill(attributes, values, divisor = 2) {
    const skillStore = useSkillStore()
    const attributeStore = useAttributeStore()
    attributeStore.attributes = values.map(([shortName, value]) => ({
      id: shortName,
      shortName,
      value,
      increased: 0,
    }))
    skillStore.skillDefinitions = [{ group: 'Kampf', attributes, divisor }]
    return { attributeStore, skillStore }
  }

  it.each([
    ['Mu', 'Fi', 'Ge'],
    ['Fi', 'Mu', 'Ge'],
    ['Mu', 'Ge', 'Fi'],
    ['Ge', 'Fi', 'Mu'],
    ['Fi', 'Ge', 'Mu'],
    ['Ge', 'Mu', 'Fi'],
  ])('uses both tied highest values for %s, %s, %s', (first, second, third) => {
    const { skillStore } = addCombatSkill(
      [first, second, third],
      [
        ['Mu', 16],
        ['Fi', 12],
        ['Ge', 16],
      ],
    )

    expect(skillStore.getFilteredSkills[0]).toMatchObject({ value: 16, increased: false })
  })

  it('updates the score and highlight when a bonus breaks a tie', () => {
    const { attributeStore, skillStore } = addCombatSkill(
      ['Mu', 'Fi', 'Ge'],
      [
        ['Mu', 14],
        ['Fi', 15],
        ['Ge', 15],
      ],
    )

    attributeStore.increaseAttribute('Mu', 1)
    expect(skillStore.getFilteredSkills[0]).toMatchObject({ value: 15, increased: false })

    attributeStore.increaseAttribute('Mu', 2)
    expect(skillStore.getFilteredSkills[0]).toMatchObject({ value: 16, increased: true })

    attributeStore.increaseAttribute('Mu', 2)
    expect(skillStore.getFilteredSkills[0]).toMatchObject({ value: 15, increased: false })
  })

  it('derives Grundwerte and non-combat skills from base edits and repeated attributes', () => {
    const attributeStore = useAttributeStore()
    const skillStore = useSkillStore()
    skillStore.skillDefinitions = [
      { group: 'Grundwert', attributes: ['Mu', 'Mu', 'Ve'], divisor: 5, value: 7 },
      { group: 'Wissen', attributes: ['Mu', 'Mu', 'Ve'], divisor: 3, value: 12 },
    ]
    expect(skillStore.getFilteredGrundwerte[0].value).toBe(7)

    attributeStore.attributes = [
      { id: 'Mu', shortName: 'Mu', value: 12, increased: 0 },
      { id: 'Ve', shortName: 'Ve', value: 12, increased: 0 },
    ]
    attributeStore.adjustBaseValue('Mu', 4)
    expect(skillStore.getFilteredGrundwerte[0]).toMatchObject({ value: 9, increased: false })
    expect(skillStore.getFilteredSkills[0]).toMatchObject({ value: 15, increased: false })

    skillStore.filter.addFilter('increased')
    expect(skillStore.getFilteredGrundwerte).toHaveLength(0)
    expect(skillStore.getFilteredSkills).toHaveLength(0)

    attributeStore.increaseAttribute('Mu', 2)
    expect(attributeStore.getIncreasedValue('Mu')).toBe(18)
    expect(skillStore.getFilteredGrundwerte[0]).toMatchObject({ value: 10, increased: true })
    expect(skillStore.getFilteredSkills[0]).toMatchObject({ value: 16, increased: true })
    expect(skillStore.skillDefinitions.map((stat) => stat.value)).toEqual([7, 12])
  })
})

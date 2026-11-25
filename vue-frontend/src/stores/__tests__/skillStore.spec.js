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
      valueIncreased: value,
    }))
    skillStore.skills = [{ group: 'Kampf', attributes, divisor }]
    return { attributeStore, skill: skillStore.skills[0], skillStore }
  }

  it.each([
    ['Mu', 'Fi', 'Ge'],
    ['Fi', 'Mu', 'Ge'],
    ['Mu', 'Ge', 'Fi'],
    ['Ge', 'Fi', 'Mu'],
    ['Fi', 'Ge', 'Mu'],
    ['Ge', 'Mu', 'Fi'],
  ])('uses both tied highest values for %s, %s, %s', (first, second, third) => {
    const { skill, skillStore } = addCombatSkill(
      [first, second, third],
      [
        ['Mu', 16],
        ['Fi', 12],
        ['Ge', 16],
      ],
    )

    skillStore.calcUpdatedSkills('Mu')

    expect(skill).toMatchObject({ value: 16, increased: false })
  })

  it('updates the score and highlight when a bonus breaks a tie', () => {
    const { attributeStore, skill } = addCombatSkill(
      ['Mu', 'Fi', 'Ge'],
      [
        ['Mu', 14],
        ['Fi', 15],
        ['Ge', 15],
      ],
    )

    attributeStore.increaseAttribute('Mu', 1)
    expect(skill).toMatchObject({ value: 15, increased: false })

    attributeStore.increaseAttribute('Mu', 2)
    expect(skill).toMatchObject({ value: 16, increased: true })

    attributeStore.increaseAttribute('Mu', 2)
    expect(skill).toMatchObject({ value: 15, increased: false })
  })
})

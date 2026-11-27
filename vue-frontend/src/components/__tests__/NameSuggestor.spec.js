import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { expect, it, vi } from 'vitest'
import NameSuggestorView from '../nameSuggestor/NameSuggestorView.vue'

it('browses all names for a species, narrows by culture, and can browse cultures across species', async () => {
  const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, name: 'Rag', gender: 'neutral', speciesGroup: 'orc', cultureGroup: 'strigior' },
      { id: 2, name: 'Rag', gender: 'neutral', speciesGroup: 'orc', cultureGroup: 'placeholder' },
      {
        id: 3,
        name: 'Luma',
        gender: 'female',
        speciesGroup: 'new-species',
        cultureGroup: 'strigior',
      },
      { id: 4, name: 'Fal', gender: 'male', speciesGroup: 'new-species', cultureGroup: 'coastal' },
    ],
  })
  const wrapper = mount(NameSuggestorView, { global: { plugins: [createPinia()] } })
  const speciesButtons = () => wrapper.findAll('[aria-label="Spezies"] button')
  const cultureButtons = () => wrapper.findAll('[aria-label="Kulturen"] button')
  const cultureMembers = () =>
    wrapper.findAll('[aria-labelledby="culture-members-label"] li').map((item) => item.text())
  const names = () => wrapper.findAll('li span').map((row) => row.text())

  try {
    expect(speciesButtons()).toHaveLength(0)
    await flushPromises()
    expect(names()).toEqual([])
    expect(speciesButtons().map((button) => button.text())).toEqual(['Ork', 'new-species'])

    const [orc, newSpecies] = speciesButtons()
    await orc.trigger('click')
    expect(orc.attributes('aria-pressed')).toBe('true')
    expect(names()).toEqual(['Rag', 'Rag'])
    const matchingRow = wrapper.findAll('.name-columns li')[0].element

    const [allCultures, strigior] = cultureButtons()
    expect(cultureButtons().map((button) => button.text())).toEqual(['Alle Kulturen', 'strigior'])
    expect(allCultures.attributes('aria-pressed')).toBe('true')
    await strigior.trigger('click')
    expect(wrapper.get('summary').text()).toContain('Ork · strigior')
    expect(names()).toEqual(['Rag'])
    expect(wrapper.get('.name-columns li').element).toBe(matchingRow)
    expect(cultureMembers()).toEqual(['Ork', 'new-species'])

    await newSpecies.trigger('click')
    expect(names()).toEqual(['Luma', 'Fal'])
    expect(cultureButtons().map((button) => button.text())).toEqual([
      'Alle Kulturen',
      'coastal',
      'strigior',
    ])
    expect(cultureButtons()[0].attributes('aria-pressed')).toBe('true')
    expect(cultureMembers()).toEqual([])

    const [, byCulture] = wrapper.findAll('[aria-label="Suchmodus"] button')
    await byCulture.trigger('click')
    expect(names()).toEqual([])
    expect(cultureButtons().map((button) => button.text())).toEqual(['coastal', 'strigior'])
    await cultureButtons()[1].trigger('click')
    expect(names()).toEqual(['Rag', 'Luma'])
    expect(wrapper.findAll('li small').map((row) => row.text())).toEqual(['Ork', 'new-species'])
    expect(cultureMembers()).toEqual(['Ork', 'new-species'])
    await cultureButtons()[0].trigger('click')
    expect(cultureMembers()).toEqual(['new-species'])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('/api/names', expect.any(Object))
  } finally {
    wrapper.unmount()
    fetch.mockRestore()
  }
})

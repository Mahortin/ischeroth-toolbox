import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useNameFilterStore } from '@/stores/nameFilterStore'
import { useNameStore } from '@/stores/nameStore'
import NameSuggestor from '../nameSuggestor/NameSuggestor.vue'
import NameSuggestorView from '../nameSuggestor/NameSuggestorView.vue'

it('builds species buttons from the names response and filters without fetching again', async () => {
  const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, name: 'Rag', gender: 'neutral', speciesGroup: 'orc', cultureGroup: 'strigior' },
      { id: 2, name: 'Grom', gender: 'male', speciesGroup: 'orc' },
      { id: 3, name: 'Luma', gender: 'female', speciesGroup: 'new-species' },
    ],
  })
  const wrapper = mount(NameSuggestorView, { global: { plugins: [createPinia()] } })

  try {
    expect(wrapper.findAll('button[aria-pressed]')).toHaveLength(0)
    await flushPromises()

    const buttons = wrapper.findAll('button[aria-pressed]')
    expect(buttons.map((button) => button.text())).toEqual(['Ork', 'new-species'])

    const [orcButton] = buttons
    await orcButton.trigger('click')
    expect(orcButton.attributes('aria-pressed')).toBe('true')
    expect(wrapper.findAll('li').map((row) => row.text())).toEqual(['Rag', 'Grom'])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('/api/names', expect.any(Object))
  } finally {
    wrapper.unmount()
    fetch.mockRestore()
  }
})

it('keeps the correct row when a filter removes one of two names with the same text', async () => {
  const pinia = createPinia()
  const nameStore = useNameStore(pinia)
  nameStore.names = [
    { id: 1, name: 'Rag', gender: 'neutral', speciesGroup: 'goblin', cultureGroup: 'placeholder' },
    { id: 2, name: 'Rag', gender: 'neutral', speciesGroup: 'orc', cultureGroup: 'human' },
  ]
  nameStore.loadedAt = Date.now()

  const wrapper = mount(NameSuggestor, { global: { plugins: [pinia] } })
  const rows = wrapper.findAll('li')
  expect(rows.map((row) => row.text())).toEqual(['Rag', 'Rag'])
  const orcRow = rows[1].element

  const filters = useNameFilterStore(pinia)
  filters.addSpeciesFilter('orc')
  await nextTick()

  expect(wrapper.findAll('li')).toHaveLength(1)
  expect(wrapper.get('li').element).toBe(orcRow)

  filters.resetSpeciesFilter()
  filters.addSpeciesFilter('human')
  await nextTick()

  expect(wrapper.findAll('li')).toHaveLength(1)
  expect(wrapper.get('li').element).toBe(orcRow)
})

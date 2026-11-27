import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useNameFilterStore } from '@/stores/nameFilterStore'
import { useNameStore } from '@/stores/nameStore'
import NameSuggestor from '../nameSuggestor/NameSuggestor.vue'

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

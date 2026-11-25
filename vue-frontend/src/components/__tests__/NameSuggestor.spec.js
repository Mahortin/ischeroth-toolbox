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
    { id: 1, name: 'Rag', gender: 'neutral', group: 'goblin' },
    { id: 2, name: 'Rag', gender: 'neutral', group: 'orc' },
  ]
  nameStore.loadedAt = Date.now()

  const wrapper = mount(NameSuggestor, { global: { plugins: [pinia] } })
  const rows = wrapper.findAll('li')
  expect(rows.map((row) => row.text())).toEqual(['Rag', 'Rag'])
  const orcRow = rows[1].element

  useNameFilterStore(pinia).addSpeciesFilter('orc')
  await nextTick()

  expect(wrapper.findAll('li')).toHaveLength(1)
  expect(wrapper.get('li').element).toBe(orcRow)
})

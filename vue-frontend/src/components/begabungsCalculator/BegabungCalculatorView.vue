<script setup>
import { computed, onMounted } from 'vue'
import { useAttributeStore } from '@/stores/attributeStore'
import { useSkillStore } from '@/stores/skillStore'
import SingleAttributeView from '@/components/begabungsCalculator/SingleAttributeView.vue'
import SkillsView from './SkillsView.vue'
import GrundwerteView from './GrundwerteView.vue'
import FilterView from './SkillFilterView.vue'

const attributeStore = useAttributeStore()
const skillStore = useSkillStore()
const loadFailed = computed(() => Boolean(attributeStore.error || skillStore.error))
const ready = computed(() => Boolean(attributeStore.loadedAt && skillStore.loadedAt))

onMounted(() => {
  attributeStore.ensureLoaded().catch(() => {})
  skillStore.ensureLoaded().catch(() => {})
})
function doNothing() {
  window.confirm(attributeStore)
}
</script>

<template>
  <p v-if="loadFailed" role="alert">Der Begabungsrechner konnte nicht geladen werden.</p>
  <p v-else-if="!ready" role="status">Begabungsrechner wird geladen …</p>
  <div v-else class="split-section">
    <section aria-label="Attribute">
      <h2>Attribute</h2>
      <div
        v-for="attribute in attributeStore.attributes"
        :key="attribute.id"
        :value="attribute.value"
      >
        <SingleAttributeView
          :key="attribute.id"
          :attributeId="attribute.id"
          :attributeShortName="attribute.shortName"
          :attributeName="attribute.name"
          :attributeValue="attribute.value"
          :increased="attribute.increased"
          @attribute-changed="doNothing"
        ></SingleAttributeView>
      </div>
    </section>
    <section aria-label="Grundwerte und Talente">
      <FilterView />
      <GrundwerteView />
      <SkillsView />
    </section>
  </div>
</template>

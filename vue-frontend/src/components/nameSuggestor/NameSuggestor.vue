<script setup>
import { onMounted } from 'vue'
import { useAttributeStore } from '@/stores/attributeStore'
import { useSkillStore } from '@/stores/skillStore'
import SimpleSingleAttribute from '@/components/begabungsCalculator/SingleAttributeView.vue'
import NewSkillsView from './SkillsView.vue'
import NewGrundwerteView from './GrundwerteView.vue'
import FilterView from './FilterView.vue'



const attributeStore = useAttributeStore()
const skillStore = useSkillStore()

onMounted(() => {
  attributeStore.ensureLoaded().catch(() => {}) 
  skillStore.ensureLoaded().catch(() => {}) 
  
})
function doNothing() {
  window.confirm(attributeStore)
}
</script>

<template>

  <div class="column">
    <h2>Attribute</h2>
    <div v-for="attribute in attributeStore.attributes" :key="attribute.id" :value="attribute.value">
      <SimpleSingleAttribute
        :key="attribute.id"
        :attributeId="attribute.id"
        :attributeShortName="attribute.shortName"
        :attributeName="attribute.name"
        :attributeValue="attribute.value"
        :increased="attribute.increased"
        @attribute-changed="doNothing"
      ></SimpleSingleAttribute>
    </div>
  </div>
  <div class="column">
  <FilterView></FilterView>
  <NewGrundwerteView></NewGrundwerteView>
  <NewSkillsView></NewSkillsView>
</div>
</template>

<style scoped></style>

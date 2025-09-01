<script setup>
import { onMounted } from 'vue'
import { useAttributeStore } from '@/stores/attributeStore'
import SimpleSingleAttribute from '@/components/begabungsCalculator/attributeComponents/SimpleSingleAttribute.vue'
import { useSkillStore } from '@/stores/skillStore'
import NewSkillsView from '../begabungsCalculator/skillComponents/NewSkillsView.vue'
import NewGrundwerteView from '../begabungsCalculator/skillComponents/NewGrundwerteView.vue'
import FilterView from '../begabungsCalculator/skillComponents/FilterView.vue'



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
  <FilterView></FilterView>
  <div class="column">
    <h2>Attributes from newStore</h2>

  <div>
   <h1 class="green">Attribute List</h1>
    
    <div v-if="attributeStore.error">
      <p style="color: red;">Error: {{ attributeStore.error }}</p>
    </div>

    <div v-else-if="attributeStore.loading">
      <p>Loading attributes...</p>
    </div>

    <ul v-else>
      <li v-for="attribute in attributeStore.attributes" :key="attribute.id">
        {{ attribute.shortName }} — {{ attribute.name }} — {{ attribute.value }} — {{ attribute.increased }} 
      </li>
    </ul>
  </div>

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

  <NewGrundwerteView></NewGrundwerteView>
  <NewSkillsView></NewSkillsView>
  </div>
</template>

<style scoped></style>

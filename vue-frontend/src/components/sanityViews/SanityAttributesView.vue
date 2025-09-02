<script setup>
import { onMounted } from 'vue'
import { useAttributeStore } from '@/stores/attributeStore'
import SimpleSingleAttribute from '@/components/begabungsCalculator/SingleAttributeView.vue'

const store = useAttributeStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) // optional: swallow to avoid console noise
})
function doNothing() {
  window.confirm(store)
}
</script>

<template>
  <div class="column">
    <h2>Attributes from newStore</h2>

  <div>
   <h1 class="green">Attribute List</h1>
    
    <div v-if="store.error">
      <p style="color: red;">Error: {{ store.error }}</p>
    </div>

    <div v-else-if="store.loading">
      <p>Loading attributes...</p>
    </div>

    <ul v-else>
      <li v-for="attribute in store.attributes" :key="attribute.id">
        {{ attribute.shortName }} — {{ attribute.name }} — {{ attribute.value }} — {{ attribute.increased }} 
      </li>
    </ul>
    <div>TEST2</div>
  </div>

  <div class="column">
    <h2>Attribute</h2>
    <div v-for="attribute in store.attributes" :key="attribute.id" :value="attribute.value">
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



    <!-- <div v-for="attribute in store.attributes" :key="attribute.key" :value="attribute.value">
      <AttributeComponent
        :key="attribute.key"
        :attributeKey="attribute.key"
        :attributeName="attribute.name"
        :attributeValue="attribute.value"
        :increased="attribute.increased"
        @attribute-changed="doNothing"
      ></AttributeComponent>
    </div> -->
  </div>
</template>

<style scoped></style>

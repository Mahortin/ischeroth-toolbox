<script setup>
import { onMounted } from 'vue'
import { attributeStore } from '@/stores/attributeStore'
// import AttributeComponent from './SingleAttribute.vue'

const store = attributeStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) // optional: swallow to avoid console noise
})
// function doNothing() {
//   window.confirm(store)
// }
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
        {{ attribute.name }} — {{ attribute.value }} 
      </li>
    </ul>
    <div>TEST2</div>
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

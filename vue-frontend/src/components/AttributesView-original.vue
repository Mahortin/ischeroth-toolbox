<script setup>
import AttributeComponent from './toolbox/SingleAttribute.vue'
import { useCharacterStore } from '@/stores/characterStore'

const store = useCharacterStore()

function doNothing() {
  window.confirm(store)
}
</script>

<template>
  <div class="column">
    <h2>Attribute</h2>
    <div v-for="attribute in store.attributes" :key="attribute.key" :value="attribute.value">
      <AttributeComponent
        :key="attribute.key"
        :attributeKey="attribute.key"
        :attributeName="attribute.name"
        :attributeValue="attribute.value"
        :increased="attribute.increased"
        @attribute-changed="doNothing"
      ></AttributeComponent>
    </div>
  </div>
</template>

<style scoped></style>

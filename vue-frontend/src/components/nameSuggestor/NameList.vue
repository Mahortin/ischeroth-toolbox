<script setup>
import { onMounted } from 'vue'
import { useNameStore } from '@/stores/nameStore'



const store = useNameStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) 
})
</script>

<template>

  <div class="column">
    <h2>Names</h2>
    <div v-for="name in store.name" :key="name.id" :value="name.value">
      <SimpleSingleAttribute
        :key="name.id"
        :attributeId="attribute.id"
        :attributeShortName="attribute.shortName"
        :attributeName="attribute.name"
        :attributeValue="attribute.value"
        :increased="attribute.increased"
        @attribute-changed="doNothing"
      ></SimpleSingleAttribute>
    </div>
  </div>
</template>

<style scoped></style>

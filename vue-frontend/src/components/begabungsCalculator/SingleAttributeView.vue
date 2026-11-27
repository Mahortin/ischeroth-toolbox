<script setup>
import { useAttributeStore } from '@/stores/attributeStore'
import { storeToRefs } from 'pinia'

defineProps({
  attributeId: String,
  attributeShortName: String,
  attributeName: String,
  attributeValue: Number,
  increased: Number,
})

const store = useAttributeStore()
const { getIncreasedValue } = storeToRefs(store)
</script>

<template>
  <div class="attribute-info">
    <span class="attribute-name item1"> {{ attributeName }} ({{ attributeShortName }})</span>
    <label class="item2" :class="{ 'increased-value': increased > 0 }">{{
      getIncreasedValue(attributeId)
    }}</label>
    <div class="item3 attribute-actions">
      <button type="button" class="app-button" @click="store.adjustBaseValue(attributeId, 1)">
        +1
      </button>
      <button type="button" class="app-button" @click="store.adjustBaseValue(attributeId, 4)">
        +4
      </button>
      <button type="button" class="app-button" @click="store.adjustBaseValue(attributeId, -1)">
        -1
      </button>
      <button type="button" class="app-button" @click="store.adjustBaseValue(attributeId, -4)">
        -4
      </button>
    </div>

    <div class="item4 attribute-actions">
      <button
        type="button"
        class="app-button"
        :aria-pressed="increased === 1"
        @click="store.increaseAttribute(attributeId, 1)"
      >
        +
      </button>
      <button
        type="button"
        class="app-button"
        :aria-pressed="increased === 2"
        @click="store.increaseAttribute(attributeId, 2)"
      >
        ++
      </button>
    </div>
  </div>
</template>

<style scoped>
.attribute-info {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'a b'
    'c d';
  align-items: start;
  gap: 10px;
  width: 100%;
  padding: 2px;
}

.item1 {
  grid-area: a;
}
.item2 {
  grid-area: b;
}
.item3 {
  grid-area: c;
}
.item4 {
  grid-area: d;
}

.two-rows {
  grid-row: span 2;
}

.arrange-horizontally > * {
  display: inline-block;
  text-align: center;
}
.arrange-vertically > * {
  display: block;
}

label {
  /* background-color: #2c3e50;  */
  /* border: 1px solid #34495e; */
  padding: 0px 20px;
  font-size: 16px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transitions */
}

label:not(.increased-value) {
  color: #ecf0f1;
}

label.increased-value {
  flex-shrink: 0;
  border-radius: 8px;
}

.attribute-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>

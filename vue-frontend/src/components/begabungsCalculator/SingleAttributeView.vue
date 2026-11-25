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
  <div class="attribute-info wrapper">
    <span class="attribute-name item1"> {{ attributeName }} ({{ attributeShortName }})</span>
    <label :class="increased > 0 ? 'highlight item2' : 'item2'">{{
      getIncreasedValue(attributeId)
    }}</label>
    <div class="item3">
      <button
        type="button"
        class="adjust-attribute add"
        @click="store.adjusteBaseValue(attributeId, 1)"
      >
        +1
      </button>
      <button
        type="button"
        class="adjust-attribute add"
        @click="store.adjusteBaseValue(attributeId, 4)"
      >
        +4
      </button>
      <button
        type="button"
        class="adjust-attribute reduce"
        @click="store.adjusteBaseValue(attributeId, -1)"
      >
        -1
      </button>
      <button
        type="button"
        class="adjust-attribute reduce"
        @click="store.adjusteBaseValue(attributeId, -4)"
      >
        -4
      </button>
    </div>

    <div>
      <button
        type="button"
        class="increase item4"
        :aria-pressed="increased === 1"
        @click="store.increaseAttribute(attributeId, 1)"
      >
        +
      </button>
      <button
        type="button"
        class="increase"
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  justify-content: center;
  align-content: center;
  width: 100%;
  /* max-width: 500px; */
  margin: auto;
  padding: 2px;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-auto-rows: 20%;
  grid-template-areas:
    'a a a a b b b b'
    'a a a a b b b b'
    'c c c c d d d d'
    'c c c c d d d d';
  align-items: start;
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
  color: #ecf0f1; /* Light text for contrast */
  /* border: 1px solid #34495e; */
  padding: 0px 20px;
  font-size: 16px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transitions */
}

.highlight {
  flex-shrink: 0;
  color: #93d800;
  font-weight: bold;
}

button {
  padding: 5px 10px;
  margin: 3px;
  border: none;
  border-radius: 8px; /* Softer edges with rounded corners */
  font-size: 16px;
}

button.adjust-attribute {
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transition effects */
}

button.add:not(:active) {
  background-color: #4500d8;
  color: white;
}
button.reduce:not(:active) {
  background-color: #d80027;
  color: white;
}

button.increase {
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transition effects */
}

button.increase[aria-pressed='false'] {
  background-color: #f8f2e8;
  color: #333;
}

/* Hover effects if hover is supported */
@media (hover: hover) {
  button:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>

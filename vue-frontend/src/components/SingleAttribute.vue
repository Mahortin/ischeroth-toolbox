<script setup>
// import { ref, reactive, computed } from 'vue'
// import { ref, reactive } from "vue";
import { characterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

defineProps({
  attributeKey: String,
  attributeName: String,
  attributeValue: Number,
  increased: Number,
})

const store = characterStore()
const { getValueByKey } = storeToRefs(store)
</script>

<template>
  <div class="attribute-info wrapper">
    <span class="attribute-name item1">{{ attributeName }}</span>
    <label :class="increased > 0 ? 'highlight item2' : 'item2'">{{
      getValueByKey(attributeKey)
    }}</label>
    <div class="item3">
      <button class="adjust-attribute add" @click="store.addToAttribute(attributeKey, 1)">
        +1
      </button>
      <button class="adjust-attribute add" @click="store.addToAttribute(attributeKey, 4)">
        +4
      </button>
      <button class="adjust-attribute reduce" @click="store.addToAttribute(attributeKey, -1)">
        -1
      </button>
      <button class="adjust-attribute reduce" @click="store.addToAttribute(attributeKey, -4)">
        -4
      </button>
    </div>
    <div>
      <button
        :class="increased === 1 ? 'increase highlight item4' : 'increase item4'"
        @click="store.increaseAttribute(attributeKey, 1)"
      >
        +
      </button>
      <button
        :class="increased === 2 ? 'increase highlight' : 'increase'"
        @click="store.increaseAttribute(attributeKey, 2)"
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
  background-color: #f8f2e8; /* Light gray background */
  color: #333; /* Darker font color */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transition effects */
}

button.add {
  background-color: #4500d8;
  color: white;
}
button.reduce {
  background-color: #d80027;
  color: white;
}

button.increase {
  background-color: #f8f2e8; /* Light gray background */
  color: #333; /* Darker font color */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* Smooth transition effects */
}
/* Active state: Change only the background color */
button.highlight {
  background-color: #93d800; /* Modern blue background for active state */
  color: #422002; /* Change the font color to white when active */
}

/* Hover effects if hover is supported */
@media (hover: hover) {
  button:hover {
    background-color: #00d8b1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  button.highlight:hover {
    background-color: #7fbb00ff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>

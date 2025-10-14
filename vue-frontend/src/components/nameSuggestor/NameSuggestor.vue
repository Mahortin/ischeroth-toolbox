<script setup>
import { onMounted } from 'vue'
import { useNameStore } from '@/stores/nameStore'

const store = useNameStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) // optional: swallow to avoid console noise
})
</script>

<template>
  <div class="column">
    <div>
      <div v-if="store.error">
        <p style="color: red">Error: {{ store.error }}</p>
      </div>

      <div v-else-if="store.loading">
        <p>Loading names...</p>
      </div>

      <ul v-else>
        <div class="row">
          <div class="custom-column">
            <img
              alt="Ischeroth logo"
              class="logo"
              src="../../assets/gender-transgender.svg"
              width="75"
              height="75"
            />
            <h2>Diverse</h2>
            <li v-for="name in store.getFilteredDiverseNames" :key="name.name">
              {{ name.name }}
            </li>
          </div>
          <div class="custom-column">
            <img
              alt="Ischeroth logo"
              class="logo"
              src="../../assets/gender-female.svg"
              width="75"
              height="75"
            />
            <h2>Female</h2>
            <li v-for="name in store.getFilteredFemaleNames" :key="name.name">
              {{ name.name }}
            </li>
          </div>
          <div class="custom-column">
            <img
              alt="Ischeroth logo"
              class="logo"
              src="../../assets/gender-male.svg"
              width="75"
              height="75"
            />
            <h2>Male</h2>
            <li v-for="name in store.getFilteredMaleNames" :key="name.name">
              {{ name.name }}
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

/* Create four equal columns that floats next to each other */
.logo {
  fill: bisque;
}

.custom-column {
  float: left;
  width: 25%;
  padding: 10px;
  margin: 10px;
}

/* Clear floats after the columns */
.row:after {
  content: '';
  display: table;
  clear: both;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 900px) {
  .column {
    width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>

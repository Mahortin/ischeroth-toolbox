<script setup>
import { computed, onMounted } from 'vue'
import diverseIcon from '@/assets/icons/gender-transgender.svg'
import femaleIcon from '@/assets/icons/gender-female.svg'
import maleIcon from '@/assets/icons/gender-male.svg'
import { useNameStore } from '@/stores/nameStore'
import { speciesDisplay } from './speciesDisplay'

const store = useNameStore()

const sections = computed(() =>
  [
    { gender: 'neutral', label: 'Divers', icon: diverseIcon },
    { gender: 'female', label: 'Weiblich', icon: femaleIcon },
    { gender: 'male', label: 'Männlich', icon: maleIcon },
  ]
    .map((section) => ({
      ...section,
      names: store.getFilteredNames.filter((name) => name.gender === section.gender),
    }))
    .filter((section) => section.names.length),
)

onMounted(() => {
  store.ensureLoaded().catch(() => {})
})
</script>

<template>
  <div>
    <p v-if="store.error" role="alert">Die Namen konnten nicht geladen werden.</p>
    <p v-else-if="!store.isLoaded" role="status">Namen werden geladen …</p>
    <p v-else-if="!store.hasSelection" class="status" role="status">
      {{
        store.filter.mode === 'species'
          ? 'Wähle eine Spezies, um Namen zu sehen.'
          : 'Wähle eine Kultur, um Namen zu sehen.'
      }}
    </p>
    <p v-else-if="!sections.length" class="status" role="status">
      Für diese Auswahl gibt es keine Namen.
    </p>
    <div v-else class="name-columns">
      <section
        v-for="section in sections"
        :key="section.gender"
        :aria-labelledby="'names-' + section.gender"
      >
        <h2 :id="'names-' + section.gender" class="font-display">
          <img :src="section.icon" alt="" width="24" height="24" />
          {{ section.label }}
        </h2>
        <ul>
          <li v-for="name in section.names" :key="name.id">
            <span>{{ name.name }}</span>
            <small v-if="store.filter.mode === 'culture'">
              {{ speciesDisplay.get(name.speciesGroup)?.label ?? name.speciesGroup }}
            </small>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.status {
  padding: 1.5rem 1rem;
  text-align: center;
}

.name-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  align-items: start;
  gap: 1rem;
}

section {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.75rem 1rem;
}

h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-heading);
  font-size: 1.1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

li {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.75rem;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  padding: 0.35rem 0;
}
</style>

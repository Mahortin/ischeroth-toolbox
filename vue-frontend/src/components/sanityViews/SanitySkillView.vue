<script setup>
import { onMounted } from 'vue'
import { useSkillStore } from '@/stores/skillStore'
import SkillsView from '../begabungsCalculator/SkillsView.vue'

const store = useSkillStore()

onMounted(() => {
  store.ensureLoaded().catch(() => {}) // optional: swallow to avoid console noise
})
</script>

<template>
  <div class="column">
    <h2>Skills from newStore</h2>
    <div>{{ store.skills }}</div>

    <div>
      <h1 class="green">Skill List</h1>

      <div v-if="store.error">
        <p style="color: red">Error: {{ store.error }}</p>
      </div>

      <div v-else-if="store.loading">
        <p>Loading skills...</p>
      </div>

      <ul v-else>
        <li v-for="skill in store.skills" :key="skill.id">
          {{ skill.name }} — {{ skill.value }} — {{ skill.group }} — {{ skill.attributes }}
        </li>
      </ul>
      <div>TEST2</div>
    </div>

    <SkillsView></SkillsView>
  </div>
</template>

<style scoped></style>

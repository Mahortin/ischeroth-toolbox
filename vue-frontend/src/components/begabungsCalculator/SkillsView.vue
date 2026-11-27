<script setup>
import { useSkillStore } from '@/stores/skillStore'

const store = useSkillStore()
</script>

<template>
  <section v-if="store.getFilteredSkills.length" aria-label="Talente">
    <h3 class="font-display">Talente</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Talent</th>
          <th scope="col">Gruppe</th>
          <th scope="col" class="numeric">Begabung</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="skill in store.getFilteredSkills"
          :key="skill.id"
          :class="{ 'increased-value': skill.increased }"
        >
          <th scope="row">{{ skill.name }}</th>
          <td>{{ skill.group }}</td>
          <td class="numeric">
            <span class="result-value">{{ skill.value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  margin-block-start: 0.5rem;
  border-collapse: collapse;
  text-align: start;
}

th,
td {
  border-block-end: 1px solid var(--color-border);
  padding: 0.35rem 0.5rem;
}

thead th {
  color: var(--color-heading);
  font-size: 0.85rem;
  font-weight: 600;
}

.numeric {
  text-align: end;
}
</style>

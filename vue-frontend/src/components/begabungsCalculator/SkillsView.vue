<script setup>
import { useSkillStore } from '@/stores/skillStore'

const store = useSkillStore()
</script>

<template>
  <div v-if="store.getFilteredSkills.length !== 0">
    <table>
      <tr>
        <th>Talent</th>
        <th>Begabung</th>
        <th>Gruppe</th>
      </tr>
      <tr
        v-for="skill in store.getFilteredSkills"
        class="skill-info"
        :class="{ 'increased-value': skill.increased }"
        :key="skill.id"
        :value="skill.value"
      >
        <td>{{ skill.name }}</td>
        <td>{{ skill.value }}</td>
        <td>{{ skill.group }}</td>
      </tr>
    </table>
  </div>
</template>

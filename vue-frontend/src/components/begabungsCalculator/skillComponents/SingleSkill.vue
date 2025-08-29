<script setup>
// import { ref, reactive, computed } from 'vue'
// import { ref, reactive } from "vue";
// import { oldStore } from '../stores/oldStore'

defineProps({
  talentKey: String,
  talentName: String,
  talentValue: Number,
})

function listTalente() {
  window.alert(this.talentKey + ' ' + this.talentName + ' ' + this.talentValue)
}
</script>

<template>
  <button @click="listTalente()">SingleTalent</button>

  <div :class="[skill.increased ? 'skill-info-highlighted' : 'skill-info']">
    <span>{{ talentKey }}</span>
    <span>{{ talentName }}</span>
    <span>{{ talentValue }}</span>
  </div>
</template>

<style scoped></style>

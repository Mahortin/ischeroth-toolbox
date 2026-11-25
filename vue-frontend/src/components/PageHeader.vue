<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="green font-display">{{ msg }}</h1>
</template>

<style scoped>
h1 {
  font-size: clamp(1.25rem, 5vw, 2.6rem);
  line-height: 1.2;
}
</style>

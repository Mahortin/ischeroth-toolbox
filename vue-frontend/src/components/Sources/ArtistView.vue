<script setup>
import IconView from './IconView.vue'

defineProps({
  artist: { type: Object, required: true },
})
</script>

<template>
  <section class="artist">
    <header class="artist-heading">
      <h3>{{ artist.name }}</h3>
      <a v-if="artist.website" :href="artist.website.url">{{ artist.website.label }}</a>
    </header>

    <IconView v-for="icon in artist.icons" :key="icon.name" :icon="icon" />
  </section>
</template>

<style scoped>
.artist {
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.artist-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.75rem 1rem;
}

h3 {
  font-weight: 600;
  color: var(--color-heading);
}

a {
  padding: 0;
  color: var(--color-heading);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
</style>

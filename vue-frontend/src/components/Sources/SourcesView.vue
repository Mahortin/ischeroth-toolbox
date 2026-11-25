<script setup>
import ArtistView from './ArtistView.vue'
import { artists } from './artworkCredits.js'
</script>

<template>
  <section class="sources" aria-labelledby="sources-heading">
    <h2 id="sources-heading">Quellen der Vektorgrafiken</h2>

    <ArtistView v-for="artist in artists" :key="artist.name" :artist="artist" />
  </section>
</template>

<style scoped>
.sources {
  width: min(100%, 44rem);
  margin-inline: auto;
}

h2 {
  font-weight: 600;
  color: var(--color-heading);
}
</style>

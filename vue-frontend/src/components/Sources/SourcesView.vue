<script setup>
import metamorphousLicenseUrl from '../../assets/fonts/OFL.txt?url'
import ArtistView from './ArtistView.vue'
import { artists } from './artworkCredits.js'
</script>

<template>
  <div class="sources">
    <section aria-labelledby="sources-heading">
      <h2 id="sources-heading">Quellen der Vektorgrafiken</h2>

      <ArtistView v-for="artist in artists" :key="artist.name" :artist="artist" />
    </section>

    <section aria-labelledby="fonts-heading">
      <h2 id="fonts-heading">Verwendete Schriftarten</h2>
      <ul>
        <li>
          <a href="https://fonts.google.com/specimen/Metamorphous">Metamorphous</a>
          von Sorkin Type Co (© 2011–2012), lizenziert unter der
          <a :href="metamorphousLicenseUrl">SIL Open Font License 1.1</a>.
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.sources {
  width: min(100%, 44rem);
  margin-inline: auto;
}

.sources section + section {
  margin-top: 1.5rem;
}

h2 {
  font-weight: 600;
  color: var(--color-heading);
}

li a {
  padding: 0;
  color: var(--color-heading);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
</style>

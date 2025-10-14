<script setup>
import PageHeader from './components/PageHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img
      alt="Ischeroth logo"
      class="logo"
      src="./assets/phoenix-ico-180px.svg"
      width="125"
      height="125"
    />
    <div class="wrapper">
      <PageHeader msg="Ischeroth Werterechner" />
    </div>
  </header>

  <nav>
    <RouterLink class="routerlink" to="/">Begabungsrechner</RouterLink>
    <!-- <RouterLink class="routerlink" to="/sanityNames">Go to SanityNames</RouterLink> -->
    <RouterLink class="routerlink" to="/nameSuggestor">Namen Vorschläge</RouterLink>
  </nav>
  <main class="splitSection">
    <RouterView />
  </main>
  <footer>
    <img
      alt="Ischeroth ruleset logo"
      class="logo-footer"
      src="./assets/ruleicon-180px.svg"
      width="125"
      height="125"
    />
    <label>Beta Version</label><br />
    <label>Web Version v0.3</label><br />
    <label>Ruleset v2.15.2</label><br />
    <label>Feedback-Gebete an Makofu</label>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  background-color: #00261f;
}

.routerlink {
  padding: 5px 5px;
  border: none;
  font-size: 16px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.logo-footer {
  display: block;
  left: 50%;
  margin: 1rem auto 1rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
    color: white;
  }

  header .wrapper {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
  }
}
</style>

<script setup>
import PageHeader from './components/PageHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img
      alt="Ischeroth logo"
      class="logo"
      src="./assets/enlightenment.svg"
      width="125"
      height="125"
    />
    <PageHeader msg="Ischeroth Toolbox" />
  </header>

  <nav aria-label="Hauptnavigation">
    <RouterLink class="routerlink" to="/">Begabungsrechner</RouterLink>
    <RouterLink class="routerlink" to="/nameSuggestor">Namensvorschläge</RouterLink>
    <RouterLink class="routerlink" to="/quellen">Quellen</RouterLink>
  </nav>
  <main class="page-content">
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
    <label>Web Version v0.4.3</label><br />
    <label>Ruleset v2.15.2</label><br />
    <label>Feedback-Gebete an Makofu</label>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 3vw, 2rem);
  background-color: #00261f;
}

nav {
  display: flex;
  flex-wrap: wrap;
}

.routerlink {
  display: inline-block;
  padding: 5px 5px;
  border: none;
  font-size: 16px;
}

.routerlink[aria-current='page'] {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.logo {
  display: block;
  width: clamp(3.5rem, 15vw, 125px);
  height: auto;
  flex-shrink: 0;
}

.logo-footer {
  display: block;
  left: 50%;
  margin: 1rem auto 1rem;
}

</style>

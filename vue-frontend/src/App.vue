<script setup>
import HelloWorld from './components/PageHeader.vue'
import AttributesView from './components/AttributesView.vue'
import AllSkillsView from './components/AllSkillsView.vue'
</script>

<template>
  <header>
    <img alt="Ischeroth logo" class="logo" src="./assets/phoenix.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Ischeroth Werterechner" />
    </div>
  </header>

  <main class="splitSection">
    <AttributesView />
    <AllSkillsView />
  </main>
  <footer>
    <img
      alt="Ischeroth ruleset logo"
      class="logo-footer"
      src="./assets/rule-icon-colored.svg"
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

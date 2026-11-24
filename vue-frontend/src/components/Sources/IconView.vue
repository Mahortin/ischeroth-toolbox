<script setup>
defineProps({
  icon: { type: Object, required: true },
})
</script>

<template>
  <details>
    <summary>
      <img :src="icon.image" alt="" width="24" height="24" />
      <span class="icon-name">{{ icon.name }}</span>
      <span class="license">{{ icon.license.label }}</span>
    </summary>
    <dl class="icon-details">
      <dt>Quelle</dt>
      <dd>
        <a :href="icon.source.url">{{ icon.source.label }}</a>
      </dd>
      <dt>Lizenz</dt>
      <dd>
        <a :href="icon.license.url">{{ icon.license.label }}</a>
      </dd>
      <dt>Verwendung</dt>
      <dd>{{ icon.usage }}</dd>
      <dt>Änderungen</dt>
      <dd>{{ icon.changes }}</dd>
    </dl>
  </details>
</template>

<style scoped>
.icon-name,
dt {
  font-weight: 600;
  color: var(--color-heading);
}

details {
  border-top: 1px solid var(--color-border);
}

summary {
  padding: 0.75rem 1rem;
  cursor: pointer;
  overflow-wrap: anywhere;
}

summary:hover {
  background: var(--color-background-mute);
}

summary img {
  margin-inline: 0.25rem 0.5rem;
  vertical-align: middle;
  object-fit: contain;
}

.license {
  margin-inline-start: 0.75rem;
  font-size: 0.85rem;
}

.icon-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 0.75rem;
  padding: 0 1rem 1rem;
  overflow-wrap: anywhere;
}

a {
  padding: 0;
  color: var(--color-heading);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

@media (max-width: 420px) {
  .icon-details {
    grid-template-columns: 1fr;
  }

  dd + dt {
    margin-top: 0.25rem;
  }
}
</style>

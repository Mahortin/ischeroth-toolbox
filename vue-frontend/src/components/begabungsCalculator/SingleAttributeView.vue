<script setup>
import { computed } from 'vue'
import { useAttributeStore } from '@/stores/attributeStore'

const props = defineProps({
  attributeId: [String, Number],
  attributeShortName: String,
  attributeName: String,
  attributeValue: Number,
  increased: Number,
})

const store = useAttributeStore()
const currentValue = computed(() => store.getIncreasedValue(props.attributeId))
const adjustments = [-4, -1, 1, 4]
</script>

<template>
  <div class="app-panel attribute-info">
    <div class="attribute-header">
      <span class="attribute-name">{{ attributeName }} ({{ attributeShortName }})</span>
      <div class="attribute-values">
        <output
          class="current-value"
          :class="{ 'increased-value': increased > 0 }"
          :aria-label="`Aktueller Wert für ${attributeName}`"
          >{{ currentValue }}</output
        >
        <span
          class="base-value"
          :class="{ 'base-value-hidden': currentValue == null || currentValue === attributeValue }"
        >
          Basis {{ attributeValue }}
        </span>
      </div>
    </div>

    <div class="attribute-actions">
      <div class="action-group base-actions" role="group" aria-label="Basiswert">
        <span class="action-label" aria-hidden="true">Basiswert</span>
        <div class="action-buttons">
          <button
            v-for="adjustment in adjustments"
            :key="adjustment"
            type="button"
            class="app-button"
            @click="store.adjustBaseValue(attributeId, adjustment)"
          >
            {{ adjustment < 0 ? '−' : '+' }}{{ Math.abs(adjustment) }}
          </button>
        </div>
      </div>

      <div class="action-group talent-actions" role="group" aria-label="Begabung">
        <span class="action-label" aria-hidden="true">Begabung</span>
        <div class="action-buttons">
          <button
            type="button"
            class="app-button"
            :aria-pressed="increased === 1"
            @click="store.increaseAttribute(attributeId, 1)"
          >
            +
          </button>
          <button
            type="button"
            class="app-button"
            :aria-pressed="increased === 2"
            @click="store.increaseAttribute(attributeId, 2)"
          >
            ++
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.attribute-info {
  display: grid;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
}

.attribute-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.75rem;
}

.attribute-name {
  color: var(--color-heading);
  font-weight: 600;
}

.attribute-values {
  display: grid;
  justify-items: end;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.current-value {
  min-inline-size: 2ch;
  border-radius: 8px;
  padding-inline: 0.35rem;
  color: var(--color-heading);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: end;
}

.current-value.increased-value {
  color: var(--color-selection-accent);
}

.base-value,
.action-label {
  font-size: 0.85rem;
}

.base-value-hidden {
  visibility: hidden;
}

.attribute-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.action-group {
  display: grid;
  gap: 0.25rem;
}

.base-actions {
  flex: 1 1 11.75rem;
  min-inline-size: 0;
}

.action-buttons {
  display: grid;
  gap: 0.25rem;
}

.base-actions .action-buttons {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.talent-actions .action-buttons {
  grid-template-columns: repeat(2, 2.75rem);
}

.action-buttons .app-button {
  justify-content: center;
  padding-inline: 0.15rem;
}
</style>

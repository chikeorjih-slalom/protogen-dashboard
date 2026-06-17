<script setup lang="ts">
import { METRICS, type MetricKey } from '@/types/metrics'
import type { RangeOption } from '@/composables/useMetrics'

defineProps<{
  range: RangeOption
  visibleMetrics: Record<MetricKey, boolean>
}>()

const emit = defineEmits<{
  (e: 'update:range', value: RangeOption): void
  (e: 'toggle', key: MetricKey): void
}>()

const rangeOptions: { value: RangeOption; label: string }[] = [
  { value: 3, label: '3M' },
  { value: 6, label: '6M' },
  { value: 12, label: '12M' },
]
</script>

<template>
  <div class="controls d-flex flex-wrap align-center justify-space-between ga-4">
    <div class="d-flex align-center ga-3 flex-wrap">
      <span class="controls-label">Time range</span>
      <v-btn-toggle
        :model-value="range"
        density="comfortable"
        color="primary"
        variant="outlined"
        divided
        mandatory
        @update:model-value="emit('update:range', $event)"
      >
        <v-btn
          v-for="opt in rangeOptions"
          :key="opt.value"
          :value="opt.value"
          size="small"
        >
          {{ opt.label }}
        </v-btn>
      </v-btn-toggle>
    </div>

    <div class="d-flex align-center ga-2 flex-wrap">
      <span class="controls-label">Show</span>
      <v-chip
        v-for="meta in METRICS"
        :key="meta.key"
        :variant="visibleMetrics[meta.key] ? 'flat' : 'outlined'"
        size="small"
        class="filter-chip"
        :style="{
          '--accent': meta.color,
          backgroundColor: visibleMetrics[meta.key] ? meta.color : 'transparent',
          color: visibleMetrics[meta.key] ? '#fff' : meta.color,
          borderColor: meta.color,
        }"
        @click="emit('toggle', meta.key)"
      >
        <v-icon start size="14" :icon="meta.icon" />
        {{ meta.label }}
      </v-chip>
    </div>
  </div>
</template>

<style scoped>
.controls-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.55;
}

.filter-chip {
  cursor: pointer;
  font-weight: 600;
}
</style>

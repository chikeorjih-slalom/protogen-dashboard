<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import { registerCharts } from '@/plugins/charts'
import { METRIC_MAP, type MetricKey } from '@/types/metrics'
import { formatChange, formatMetric } from '@/utils/format'
import type { MetricSummary } from '@/composables/useMetrics'

registerCharts()

const props = defineProps<{
  metricKey: MetricKey
  summary: MetricSummary
  active: boolean
}>()

const emit = defineEmits<{ (e: 'select', key: MetricKey): void }>()

const meta = computed(() => METRIC_MAP[props.metricKey])

const value = computed(() => formatMetric(props.summary.latest, meta.value))

const change = computed(() => props.summary.change)
const changeLabel = computed(() => formatChange(change.value))
const trendUp = computed(() => (change.value ?? 0) >= 0)
/** Whether the change is favorable (accounts for metrics where up is bad). */
const favorable = computed(() =>
  meta.value.invertTrend ? !trendUp.value : trendUp.value,
)

const sparkData = computed<ChartData<'line'>>(() => ({
  labels: props.summary.series.map((_, i) => i),
  datasets: [
    {
      data: props.summary.series,
      borderColor: meta.value.color,
      backgroundColor: `${meta.value.color}22`,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
}))

const sparkOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  animation: { duration: 600 },
}
</script>

<template>
  <v-card
    class="metric-card pa-5"
    :class="{ 'metric-card--active': active }"
    :style="{ '--accent': meta.color }"
    @click="emit('select', metricKey)"
  >
    <div class="d-flex align-center justify-space-between mb-2">
      <div class="d-flex align-center ga-2">
        <span class="metric-icon">
          <v-icon :icon="meta.icon" size="18" />
        </span>
        <span class="metric-label">{{ meta.label }}</span>
      </div>
      <v-chip
        size="x-small"
        variant="tonal"
        :color="favorable ? 'green' : 'red'"
        class="font-weight-medium"
      >
        <v-icon
          start
          size="14"
          :icon="trendUp ? 'mdi-arrow-up' : 'mdi-arrow-down'"
        />
        {{ changeLabel }}
      </v-chip>
    </div>

    <div class="metric-value">{{ value }}</div>
    <div class="metric-sub">vs. previous month</div>

    <div class="spark">
      <Line :data="sparkData" :options="sparkOptions" />
    </div>
  </v-card>
</template>

<style scoped>
.metric-card {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
}

.metric-card--active {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 12px 28px rgba(15, 23, 42, 0.12);
}

.metric-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}

.metric-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.metric-value {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.metric-sub {
  font-size: 0.72rem;
  opacity: 0.5;
  margin-top: 2px;
}

.spark {
  height: 48px;
  margin-top: 14px;
}
</style>

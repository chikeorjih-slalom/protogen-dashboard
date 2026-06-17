<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js'
import { registerCharts } from '@/plugins/charts'
import { METRIC_MAP, type MetricKey } from '@/types/metrics'
import { formatAxis, formatMetric } from '@/utils/format'

registerCharts()

const props = defineProps<{
  labels: string[]
  data: number[]
  metricKey: MetricKey
}>()

const meta = computed(() => METRIC_MAP[props.metricKey])

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.labels,
  datasets: [
    {
      label: meta.value.label,
      data: props.data,
      backgroundColor: `${meta.value.color}cc`,
      hoverBackgroundColor: meta.value.color,
      borderRadius: 6,
      maxBarThickness: 34,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(17,24,39,0.95)',
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: (ctx: TooltipItem<'bar'>) =>
          `  ${meta.value.label}: ${formatMetric(Number(ctx.parsed.y), meta.value)}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(100,116,139,0.9)', font: { size: 12 } },
    },
    y: {
      grid: { color: 'rgba(148,163,184,0.15)' },
      ticks: {
        color: 'rgba(100,116,139,0.9)',
        font: { size: 11 },
        callback: (value) => formatAxis(Number(value), meta.value.format),
      },
    },
  },
  animation: { duration: 800 },
}))
</script>

<template>
  <div class="bar-chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.bar-chart {
  position: relative;
  height: 300px;
  width: 100%;
}

@media (max-width: 600px) {
  .bar-chart {
    height: 240px;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js'
import { registerCharts } from '@/plugins/charts'
import { METRIC_MAP, METRICS, type MetricKey } from '@/types/metrics'
import { formatAxis, formatMetric } from '@/utils/format'

registerCharts()

const props = defineProps<{
  labels: string[]
  series: Record<MetricKey, number[]>
  activeMetric: MetricKey
  visibleMetrics: Record<MetricKey, boolean>
}>()

const shownMetrics = computed(() =>
  METRICS.filter((m) => props.visibleMetrics[m.key]),
)

const activeMeta = computed(() => METRIC_MAP[props.activeMetric])

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.labels,
  datasets: shownMetrics.value.map((meta) => {
    const isActive = meta.key === props.activeMetric
    return {
      label: meta.label,
      data: props.series[meta.key],
      borderColor: meta.color,
      backgroundColor: `${meta.color}22`,
      borderWidth: isActive ? 3 : 1.5,
      fill: isActive,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: meta.color,
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
      yAxisID: meta.key === props.activeMetric ? 'y' : 'yHidden',
      order: isActive ? 0 : 1,
    }
  }),
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(17,24,39,0.95)',
      padding: 12,
      cornerRadius: 8,
      titleFont: { weight: 'bold', size: 13 },
      bodyFont: { size: 12 },
      callbacks: {
        label: (ctx: TooltipItem<'line'>) => {
          const meta = METRICS.find((m) => m.label === ctx.dataset.label)
          if (!meta) return ctx.formattedValue
          return `  ${meta.label}: ${formatMetric(Number(ctx.parsed.y), meta)}`
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(100,116,139,0.9)', font: { size: 12 } },
    },
    y: {
      position: 'left',
      grid: { color: 'rgba(148,163,184,0.15)' },
      ticks: {
        color: 'rgba(100,116,139,0.9)',
        font: { size: 11 },
        callback: (value) =>
          formatAxis(Number(value), activeMeta.value.format),
      },
    },
    yHidden: { display: false },
  },
  animation: { duration: 800 },
}))
</script>

<template>
  <div class="trend-chart">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.trend-chart {
  position: relative;
  height: 360px;
  width: 100%;
}

@media (max-width: 600px) {
  .trend-chart {
    height: 280px;
  }
}
</style>

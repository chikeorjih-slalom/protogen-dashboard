<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js'
import { registerCharts } from '@/plugins/charts'
import { REGIONS, type RegionKey } from '@/types/metrics'

registerCharts()

const props = defineProps<{
  labels: string[]
  series: Record<RegionKey, number[]>
}>()

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.labels,
  datasets: REGIONS.map((region) => ({
    label: region.label,
    data: props.series[region.key],
    borderColor: region.color,
    backgroundColor: `${region.color}22`,
    borderWidth: 2.5,
    fill: false,
    tension: 0.4,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: region.color,
    pointHoverBorderColor: '#fff',
    pointHoverBorderWidth: 2,
  })),
}))

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: { usePointStyle: true, boxWidth: 8, font: { size: 12 } },
    },
    tooltip: {
      backgroundColor: 'rgba(17,24,39,0.95)',
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: (ctx: TooltipItem<'line'>) =>
          `  ${ctx.dataset.label}: ${Number(ctx.parsed.y).toFixed(0)}%`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(100,116,139,0.9)', font: { size: 12 } },
    },
    y: {
      suggestedMin: 82,
      suggestedMax: 100,
      grid: { color: 'rgba(148,163,184,0.15)' },
      ticks: {
        color: 'rgba(100,116,139,0.9)',
        font: { size: 11 },
        callback: (value) => `${value}%`,
      },
    },
  },
  animation: { duration: 800 },
}
</script>

<template>
  <div class="regional-chart">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.regional-chart {
  position: relative;
  height: 320px;
  width: 100%;
}

@media (max-width: 600px) {
  .regional-chart {
    height: 260px;
  }
}
</style>

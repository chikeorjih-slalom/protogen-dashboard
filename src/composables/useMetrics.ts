import { computed, ref } from 'vue'
import dataset from '@/data/metrics.json'
import {
  METRICS,
  type MetricKey,
  type MetricsDataset,
  type MonthMetric,
} from '@/types/metrics'
import { percentChange } from '@/utils/format'

const data = dataset as MetricsDataset

export type RangeOption = 3 | 6 | 12

export interface MetricSummary {
  key: MetricKey
  latest: number
  previous: number
  change: number | null
  total: number
  average: number
  series: number[]
}

export function useMetrics() {
  const range = ref<RangeOption>(12)
  const activeMetric = ref<MetricKey>('revenue')
  const visibleMetrics = ref<Record<MetricKey, boolean>>({
    revenue: true,
    visitors: true,
    conversions: true,
    orders: true,
  })

  const months = computed<MonthMetric[]>(() => data.months.slice(-range.value))

  const labels = computed(() => months.value.map((m) => m.month))

  const summaries = computed<Record<MetricKey, MetricSummary>>(() => {
    const result = {} as Record<MetricKey, MetricSummary>
    for (const meta of METRICS) {
      const series = months.value.map((m) => m[meta.key])
      const latest = series[series.length - 1] ?? 0
      const previous = series[series.length - 2] ?? 0
      const total = series.reduce((sum, v) => sum + v, 0)
      result[meta.key] = {
        key: meta.key,
        latest,
        previous,
        change: percentChange(latest, previous),
        total,
        average: series.length ? total / series.length : 0,
        series,
      }
    }
    return result
  })

  function toggleMetric(key: MetricKey) {
    visibleMetrics.value[key] = !visibleMetrics.value[key]
  }

  return {
    range,
    activeMetric,
    visibleMetrics,
    months,
    labels,
    summaries,
    toggleMetric,
  }
}

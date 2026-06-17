import { computed, ref } from 'vue'
import dataset from '@/data/metrics.json'
import {
  METRICS,
  REGIONS,
  type MetricKey,
  type MetricsDataset,
  type MonthMetric,
  type RegionKey,
} from '@/types/metrics'
import { formatMonthLabel, percentChange } from '@/utils/format'

const data = dataset as MetricsDataset

export type RangeOption = 3 | 6 | 12 | 36

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
  const activeMetric = ref<MetricKey>('shipmentVolume')
  const visibleMetrics = ref<Record<MetricKey, boolean>>({
    shipmentVolume: true,
    onTimeDeliveryRate: true,
    openExceptions: true,
  })

  const months = computed<MonthMetric[]>(() => data.months.slice(-range.value))

  const labels = computed(() => months.value.map((m) => formatMonthLabel(m.month)))

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

  const regionalSeries = computed<Record<RegionKey, number[]>>(() => {
    const result = {} as Record<RegionKey, number[]>
    for (const region of REGIONS) {
      result[region.key] = months.value.map(
        (m) => m.regionalPerformance[region.key],
      )
    }
    return result
  })

  const regionalLatest = computed<Record<RegionKey, number>>(() => {
    const result = {} as Record<RegionKey, number>
    for (const region of REGIONS) {
      const series = regionalSeries.value[region.key]
      result[region.key] = series[series.length - 1] ?? 0
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
    regionalSeries,
    regionalLatest,
    toggleMetric,
  }
}

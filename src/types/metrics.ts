export type MetricKey = 'revenue' | 'visitors' | 'conversions' | 'orders'

export interface MonthMetric {
  month: string
  label: string
  revenue: number
  visitors: number
  conversions: number
  orders: number
}

export interface MetricsDataset {
  year: number
  currency: string
  months: MonthMetric[]
}

export interface MetricMeta {
  key: MetricKey
  label: string
  color: string
  icon: string
  format: 'currency' | 'number' | 'percent'
}

export const METRICS: MetricMeta[] = [
  { key: 'revenue', label: 'Revenue', color: '#16a34a', icon: 'mdi-currency-usd', format: 'currency' },
  { key: 'visitors', label: 'Visitors', color: '#2563eb', icon: 'mdi-account-group', format: 'number' },
  { key: 'conversions', label: 'Conversions', color: '#9333ea', icon: 'mdi-swap-horizontal-bold', format: 'percent' },
  { key: 'orders', label: 'Orders', color: '#ea580c', icon: 'mdi-cart-outline', format: 'number' },
]

export const METRIC_MAP: Record<MetricKey, MetricMeta> = METRICS.reduce(
  (acc, m) => {
    acc[m.key] = m
    return acc
  },
  {} as Record<MetricKey, MetricMeta>,
)

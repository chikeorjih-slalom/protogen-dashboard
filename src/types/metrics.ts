export type MetricKey = 'shipmentVolume' | 'onTimeDeliveryRate' | 'openExceptions'

export type RegionKey = 'northAmerica' | 'europe' | 'asiaPacific'

export interface RegionalPerformance {
  northAmerica: number
  europe: number
  asiaPacific: number
}

export interface MonthMetric {
  month: string
  shipmentVolume: number
  onTimeDeliveryRate: number
  openExceptions: number
  regionalPerformance: RegionalPerformance
}

export interface MetricsDataset {
  company: string
  period: string
  months: MonthMetric[]
}

export interface MetricMeta {
  key: MetricKey
  label: string
  color: string
  icon: string
  format: 'number' | 'percent'
  /** When true, an increase is unfavorable (e.g. open exceptions). */
  invertTrend?: boolean
}

export interface RegionMeta {
  key: RegionKey
  label: string
  color: string
  icon: string
}

export const METRICS: MetricMeta[] = [
  { key: 'shipmentVolume', label: 'Shipment Volume', color: '#2563eb', icon: 'mdi-truck-fast-outline', format: 'number' },
  { key: 'onTimeDeliveryRate', label: 'On-Time Delivery', color: '#16a34a', icon: 'mdi-clock-check-outline', format: 'percent' },
  { key: 'openExceptions', label: 'Open Exceptions', color: '#ea580c', icon: 'mdi-alert-circle-outline', format: 'number', invertTrend: true },
]

export const REGIONS: RegionMeta[] = [
  { key: 'northAmerica', label: 'North America', color: '#2563eb', icon: 'mdi-earth' },
  { key: 'europe', label: 'Europe', color: '#9333ea', icon: 'mdi-earth' },
  { key: 'asiaPacific', label: 'Asia Pacific', color: '#0891b2', icon: 'mdi-earth' },
]

export const METRIC_MAP: Record<MetricKey, MetricMeta> = METRICS.reduce(
  (acc, m) => {
    acc[m.key] = m
    return acc
  },
  {} as Record<MetricKey, MetricMeta>,
)

export const REGION_MAP: Record<RegionKey, RegionMeta> = REGIONS.reduce(
  (acc, r) => {
    acc[r.key] = r
    return acc
  },
  {} as Record<RegionKey, RegionMeta>,
)

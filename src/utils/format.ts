import type { MetricMeta } from '@/types/metrics'

const numberFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

const compactFmt = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function formatNumber(value: number): string {
  return numberFmt.format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatCompact(value: number): string {
  return compactFmt.format(value)
}

/** Converts an ISO "YYYY-MM" string to a short label like "Jan '23". */
export function formatMonthLabel(month: string): string {
  const [year = '', mon = ''] = month.split('-')
  const idx = Number(mon) - 1
  const name = MONTH_NAMES[idx] ?? mon
  return `${name} '${year.slice(2)}`
}

export function formatMetric(value: number, meta: MetricMeta): string {
  switch (meta.format) {
    case 'percent':
      return formatPercent(value)
    default:
      return formatNumber(value)
  }
}

export function formatAxis(value: number, format: MetricMeta['format']): string {
  if (format === 'percent') return `${value}%`
  return formatCompact(value)
}

/** Month-over-month percentage change between two values. */
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0 || previous == null) return null
  return ((current - previous) / previous) * 100
}

export function formatChange(change: number | null): string {
  if (change === null) return '—'
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

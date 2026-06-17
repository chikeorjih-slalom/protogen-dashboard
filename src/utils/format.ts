import type { MetricMeta } from '@/types/metrics'

const currencyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const numberFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

const compactFmt = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatCurrency(value: number): string {
  return currencyFmt.format(value)
}

export function formatNumber(value: number): string {
  return numberFmt.format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatCompact(value: number): string {
  return compactFmt.format(value)
}

export function formatMetric(value: number, meta: MetricMeta): string {
  switch (meta.format) {
    case 'currency':
      return formatCurrency(value)
    case 'percent':
      return formatPercent(value)
    default:
      return formatNumber(value)
  }
}

export function formatAxis(value: number, format: MetricMeta['format']): string {
  if (format === 'percent') return `${value}%`
  if (format === 'currency') return `$${formatCompact(value)}`
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

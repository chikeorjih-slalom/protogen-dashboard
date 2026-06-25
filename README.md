# Meridian Freight — Supply Chain Operations Dashboard

A single-page analytics dashboard visualizing monthly operational performance for a mid-size freight & supply chain company over a 3-year period (Jan 2023 – Dec 2025). Built with Vue 3, TypeScript, Vuetify 3, and Chart.js.

## Features

- **Key operational metrics** — Shipment Volume, On-Time Delivery Rate, and Open Exceptions, each shown as a card with a sparkline and month-over-month change (exception increases are flagged as unfavorable).
- **Interactive trend chart** — switch the highlighted metric by clicking a card; hover for exact monthly values.
- **Monthly breakdown** — bar chart of the selected metric.
- **Regional performance** — multi-line chart comparing North America, Europe, and Asia Pacific.
- **Time range selector** — view the last 3, 6, 12, or all 36 months.
- **Metric filters** — show/hide individual metrics on the trend chart.
- **Responsive layout** — cards and charts reflow for tablet and mobile.
- **Dark mode by default**, with a toggle in the app bar.

## Tech Stack

- **Framework:** Vue 3 (Composition API) + TypeScript
- **Routing:** Vue Router
- **UI:** Vuetify 3 with Material Design Icons
- **Charts:** Chart.js via vue-chartjs
- **Build tool:** Vite

## Data

A static dataset lives at [`src/data/metrics.json`](src/data/metrics.json) with 36 monthly records. Each entry includes:

- `month` — ISO `YYYY-MM`
- `shipmentVolume` — total shipments handled
- `onTimeDeliveryRate` — percentage
- `openExceptions` — unresolved issues
- `regionalPerformance` — performance index by region (`northAmerica`, `europe`, `asiaPacific`)

## Project Structure

```
src/
├── components/      # MetricCard, TrendChart, MetricBarChart, RegionalChart, DashboardControls
├── views/           # DashboardView
├── composables/     # useMetrics (state, derived series, summaries)
├── data/            # metrics.json
├── plugins/         # vuetify + chart.js registration
├── types/           # metric and region definitions
└── utils/           # number/percent/date formatting helpers
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

# Project Brief
Use create-vue to scaffold a new vue project. Use typescript and vue-router. Run commands in the terminal.
Add Vuetify 3 with Material Design Icons, install chart.js and vue-chartjs for data vizualizations

## Dashboard
A single-page analytics dashboard showing monthly business metrics.
Similar to Shopify admin of Google analytics


## Fake Data (Extended Dataset)

Create an additional synthetic dataset that represents operational performance for a mid-size freight and supply chain company over a **3-year period (Jan 2023 – Dec 2025)**.

Store in: `src/data/metrics.json`

### Dataset Structure
Each entry should represent a **monthly record** and include the following fields:

- `month` (e.g., "2023-01")
- `shipmentVolume` (integer, total shipments handled)
- `onTimeDeliveryRate` (percentage, 85%–98%)
- `regionalPerformance` (object with performance by region)
  - `northAmerica`
  - `europe`
  - `asiaPacific`
- `openExceptions` (integer, number of unresolved issues)

---

### Data Modeling Guidelines

#### Shipment Volume
- Range: ~8,000 to 25,000 shipments/month
- Trend: Gradual growth year-over-year (~5–10% annually)
- Seasonality:
  - Higher in Q3–Q4 (peak shipping seasons, holidays)
  - Slight dip in January/February
- Include occasional dips/spikes due to realistic variability (weather, demand shifts)

#### On-Time Delivery Rate
- Range: 88% to 97%
- Slight upward trend over time (operational improvements)
- Minor drops during peak months (capacity strain)
- Random small fluctuations month-to-month

#### Regional Performance
- Represented as percentages or indexed scores (85–98%)
- Variation by region:
  - **North America** → Most stable, consistent high performance
  - **Europe** → Moderate variability
  - **Asia Pacific** → More fluctuation due to longer routes and complexity
- Optional: Slight seasonal or trend-based variation

Example structure:
```json
"regionalPerformance": {
  "northAmerica": 95,
  "europe": 92,
  "asiaPacific": 89
}



## Interactions
- **Time Range Selector**
  - Default view: Full year (Jan–Dec 2025)
  - Optional toggle to view last 3, 6, or 12 months
- **Metric Hover Tooltips**
  - Hovering over data points reveals exact values for that month
- **Metric Switching**
  - Allow users to toggle between key metrics (revenue, visitors, conversions, orders) in charts
- **Comparisons**
  - Month-over-month (MoM) percentage change displayed alongside each metric
- **Filtering**
  - Basic filters (e.g., show/hide specific metrics on the chart)
- **Responsive Layout**
  - Dashboard reorganizes for tablet and mobile views (stacked cards, scrollable charts)

## Style
- **Overall Look**
  - Clean, modern, minimal—similar to Shopify Admin or Google Analytics
- **Color Palette**
  - Neutral base (white/gray background)
  - Accent colors for metrics:
    - Revenue: Green  
    - Visitors: Blue  
    - Conversions: Purple  
    - Orders: Orange
- **Typography**
  - Sans-serif font (e.g., Inter, Roboto)
  - Clear hierarchy: large metric values, smaller labels
- **Components**
  - Card-based layout for each metric
  - Soft shadows, rounded corners
- **Charts**
  - Smooth line charts for trends
  - Subtle animations on load
- **Spacing**
  - Generous padding and whitespace for readability

## Tech
- **Framework**
  - Vue 3 (Composition API)
- **State Management**
  - Simple local state or Pinia (optional)
- **Data Handling**
  - Static JSON file (`src/data/metrics.json`)
  - Loaded via import or fetch
- **Charting Library**
  - Chart.js, ECharts, or a Vue-compatible wrapper
- **Styling**
  - Tailwind CSS or scoped CSS modules
- **Build Tool**
  - Vite
- **File Structure**
  - `components/` for reusable UI (MetricCard, Chart, Filters)
  - `views/` for dashboard page
  - `data/` for mock JSON dataset
- **Optional Enhancements**
  - Dark mode support
  - Number formatting utilities (currency, percentage)
  - Basic loading skeletons

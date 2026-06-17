# Project Brief
Use create-vue to scaffold a new vue project. Use typescript and vue-router. Run commands in the terminal.
Add Vuetify 3 with Material Design Icons, install chart.js and vue-chartjs for data vizualizations

## Dashboard
A single-page analytics dashboard showing monthly business metrics.
Similar to Shopify admin of Google analytics

## Data
Generate a fake JSON dataset file (src/data/metrics.json)
12 months of data (Jan-Dec 2025), each month containing:
- revenue (dollar amount, trending upward with some variation)
- visitors (number, seasonal pattern - higher in the summer)
- conversions (percentage, fluctuates between 2-5%)
- orders (number, correlates loosely with visitors)


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

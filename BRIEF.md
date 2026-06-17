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

## Layout (Vuetify)
- v-app-bar
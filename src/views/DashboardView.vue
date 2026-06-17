<script setup lang="ts">
import { computed } from 'vue'
import { useMetrics } from '@/composables/useMetrics'
import { METRICS, METRIC_MAP, type MetricKey } from '@/types/metrics'
import MetricCard from '@/components/MetricCard.vue'
import TrendChart from '@/components/TrendChart.vue'
import MetricBarChart from '@/components/MetricBarChart.vue'
import RegionalChart from '@/components/RegionalChart.vue'
import DashboardControls from '@/components/DashboardControls.vue'

const {
  range,
  activeMetric,
  visibleMetrics,
  labels,
  summaries,
  regionalSeries,
  toggleMetric,
} = useMetrics()

const series = computed(() => {
  const result = {} as Record<MetricKey, number[]>
  for (const meta of METRICS) {
    result[meta.key] = summaries.value[meta.key].series
  }
  return result
})

const activeMeta = computed(() => METRIC_MAP[activeMetric.value])

function selectMetric(key: MetricKey) {
  activeMetric.value = key
}
</script>

<template>
  <v-container class="dashboard py-6 py-md-8" max-width="1280">
    <header class="mb-6">
      <div class="d-flex align-center ga-2 mb-1">
        <v-icon icon="mdi-truck-delivery-outline" color="primary" />
        <h1 class="dashboard-title">Supply Chain Operations</h1>
      </div>
      <p class="dashboard-subtitle">
        Meridian Freight &amp; Supply Chain · monthly performance, Jan 2023 – Dec 2025
      </p>
    </header>

    <!-- Metric cards -->
    <v-row dense>
      <v-col
        v-for="meta in METRICS"
        :key="meta.key"
        cols="12"
        sm="6"
        lg="4"
      >
        <MetricCard
          :metric-key="meta.key"
          :summary="summaries[meta.key]"
          :active="activeMetric === meta.key"
          @select="selectMetric"
        />
      </v-col>
    </v-row>

    <!-- Controls -->
    <v-card class="pa-4 mt-6" border>
      <DashboardControls
        :range="range"
        :visible-metrics="visibleMetrics"
        @update:range="range = $event"
        @toggle="toggleMetric"
      />
    </v-card>

    <!-- Trend chart -->
    <v-card class="pa-5 mt-6" border>
      <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
        <div>
          <h2 class="section-title">Operational trends</h2>
          <p class="section-sub">
            Highlighting <strong :style="{ color: activeMeta.color }">{{ activeMeta.label }}</strong> · click a card to switch
          </p>
        </div>
      </div>
      <TrendChart
        :labels="labels"
        :series="series"
        :active-metric="activeMetric"
        :visible-metrics="visibleMetrics"
      />
    </v-card>

    <v-row class="mt-2">
      <!-- Breakdown bar chart -->
      <v-col cols="12" lg="6">
        <v-card class="pa-5 mt-4" border height="100%">
          <h2 class="section-title mb-1">{{ activeMeta.label }} by month</h2>
          <p class="section-sub mb-4">Monthly breakdown for the selected metric</p>
          <MetricBarChart
            :labels="labels"
            :data="series[activeMetric]"
            :metric-key="activeMetric"
          />
        </v-card>
      </v-col>

      <!-- Regional performance -->
      <v-col cols="12" lg="6">
        <v-card class="pa-5 mt-4" border height="100%">
          <h2 class="section-title mb-1">Regional performance</h2>
          <p class="section-sub mb-4">On-time performance index by region (%)</p>
          <RegionalChart :labels="labels" :series="regionalSeries" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.dashboard-title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
}

.dashboard-subtitle {
  margin: 0;
  opacity: 0.6;
  font-size: 0.92rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.section-sub {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.6;
}
</style>

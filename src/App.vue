<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = ref(true)

function toggleTheme() {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'darkTheme' : 'lightTheme'
}
</script>

<template>
  <v-app>
    <v-app-bar flat border="b" height="60">
      <v-app-bar-title class="brand">
        <v-icon icon="mdi-truck-fast-outline" color="primary" class="mr-1" />
        Meridian Freight
      </v-app-bar-title>
      <template #append>
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
          @click="toggleTheme"
        />
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.brand {
  font-weight: 700;
  letter-spacing: -0.01em;
}
</style>

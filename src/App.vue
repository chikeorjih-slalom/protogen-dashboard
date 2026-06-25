<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuth } from '@/composables/useAuth'

const theme = useTheme()
const isDark = ref(true)
const router = useRouter()
const { isAuthenticated, logout } = useAuth()

function toggleTheme() {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'darkTheme' : 'lightTheme'
}

function signOut() {
  logout()
  router.replace({ name: 'login' })
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
        <v-btn
          v-if="isAuthenticated"
          icon="mdi-logout"
          variant="text"
          @click="signOut"
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

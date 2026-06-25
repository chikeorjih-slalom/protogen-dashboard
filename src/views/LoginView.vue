<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
const router = useRouter()
const route = useRoute()

const password = ref('')
const error = ref(false)
const showPassword = ref(false)

function submit() {
  if (login(password.value)) {
    error.value = false
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } else {
    error.value = true
  }
}
</script>

<template>
  <v-container class="login-wrap d-flex align-center justify-center" fluid>
    <v-card class="login-card pa-8" max-width="400" width="100%" border>
      <div class="text-center mb-6">
        <v-icon icon="mdi-truck-fast-outline" color="primary" size="40" class="mb-2" />
        <h1 class="login-title">Meridian Freight</h1>
        <p class="login-sub">Enter the password to access the dashboard</p>
      </div>

      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          variant="outlined"
          autofocus
          :error="error"
          :error-messages="error ? 'Incorrect password' : ''"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="showPassword = !showPassword"
          @update:model-value="error = false"
        />
        <v-btn type="submit" color="primary" size="large" block class="mt-2">
          Sign in
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.login-wrap {
  min-height: calc(100vh - 60px);
}

.login-title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
}

.login-sub {
  margin: 4px 0 0;
  font-size: 0.85rem;
  opacity: 0.6;
}
</style>

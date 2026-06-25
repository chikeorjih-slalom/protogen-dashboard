import { ref } from 'vue'

const STORAGE_KEY = 'meridian-auth'
// Prototype-only gate. Not secure — the value ships in the client bundle.
const PASSWORD = 'slalom'

const isAuthenticated = ref(sessionStorage.getItem(STORAGE_KEY) === 'true')

export function useAuth() {
  function login(password: string): boolean {
    if (password === PASSWORD) {
      isAuthenticated.value = true
      sessionStorage.setItem(STORAGE_KEY, 'true')
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return { isAuthenticated, login, logout }
}

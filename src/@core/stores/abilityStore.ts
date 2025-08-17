// src/stores/abilityStore.ts
import { defineStore } from 'pinia'
import { defineAbilityFor, type AppAbility, type Actions, type Subjects } from '../ability/defineAbility'
import type { AuthUser } from '../types/auth'
import { ref, computed } from 'vue'

export const useAbilityStore = defineStore('ability', () => {
  // Reactive state
  const currentUser = ref<AuthUser | null>(null)
  const ability = ref<AppAbility>(defineAbilityFor(null))

  // Computed properties
  const isAuthenticated = computed(() => !!currentUser.value)
  const userRole = computed(() => currentUser.value?.role?.name)
  const userPermissions = computed(() => currentUser.value?.role?.permissions || [])

  // Actions
  const updateAbility = (user: AuthUser | null) => {
    console.log('Updating ability for user:', user)
    currentUser.value = user
    ability.value = defineAbilityFor(user)
    
    console.log('New ability created:', ability.value)
    
    // Update localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    }
  }

  const can = (action: Actions, subject: Subjects): boolean => {
    const result = ability.value.can(action, subject)
    console.log(`Checking permission: ${action} ${subject} = ${result}`)
    return result
  }

  const cannot = (action: Actions, subject: Subjects): boolean => {
    return ability.value.cannot(action, subject)
  }

  const initializeFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')
    
    console.log('Initializing from storage:', { storedUser, token })
    
    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser)
        console.log('Parsed user:', user)
        updateAbility(user)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        updateAbility(null)
      }
    } else {
      console.log('No user or token found in storage')
      updateAbility(null)
    }
  }

  const logout = () => {
    updateAbility(null)
  }

  return {
    // State
    currentUser,
    ability,
    
    // Computed
    isAuthenticated,
    userRole,
    userPermissions,
    
    // Actions
    updateAbility,
    can,
    cannot,
    initializeFromStorage,
    logout
  }
})

// src/stores/abilityStore.js
import { defineStore } from 'pinia'
import { defineAbilityFor } from '../ability/defineAbility'
import { ref, computed } from 'vue'

export const useAbilityStore = defineStore('ability', () => {
  // Reactive state
  const currentUser = ref(null)
  const ability = ref(defineAbilityFor(null))

  // Computed properties
  const isAuthenticated = computed(() => !!currentUser.value)
  const userRole = computed(() => currentUser.value?.role?.name)
  const userPermissions = computed(() => currentUser.value?.role?.permissions || [])

  // Actions
  const updateAbility = user => {
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

  const can = (action, subject) => {
    const result = ability.value.can(action, subject)

    console.log(`Checking permission: ${action} ${subject} = ${result}`)
    
    return result
  }

  const cannot = (action, subject) => {
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
    logout,
  }
})

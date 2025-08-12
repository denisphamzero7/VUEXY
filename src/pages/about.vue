/* stylelint-disable @stylistic/block-opening-brace-space-before */
<template>
  <VContainer>
    <VCard class="mb-6">
      <VCardTitle class="text-h4">
        About Page
      </VCardTitle>
      <VCardText>
        <p class="text-body-1">
          This is about page
        </p>
        <p class="text-body-2">
          Current theme: {{ $vuetify.theme.current.value }}
        </p>
      </VCardText>
      <VCardActions>
        <VBtn 
          :color="$vuetify.theme.current.value === 'dark' ? 'primary' : 'secondary'"
          @click="toggleTheme"
        >
          Toggle Theme
        </VBtn>
        <VBtn 
          color="success" 
          @click="setLightTheme"
        >
          Light Theme
        </VBtn>
        <VBtn 
          color="info" 
          @click="setDarkTheme"
        >
          Dark Theme
        </VBtn>
      </VCardActions>
    </VCard>

    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <VCard>
          <VCardTitle>Theme Information</VCardTitle>
          <VCardText>
            <p>Current theme: <strong>{{ $vuetify.theme.current.value }}</strong></p>
            <p>Theme global: <strong>{{ $vuetify.theme.global.current.value }}</strong></p>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard>
          <VCardTitle>Theme Colors</VCardTitle>
          <VCardText>
            <div class="d-flex flex-wrap gap-2">
              <VChip 
                v-for="color in ['primary', 'secondary', 'success', 'error', 'warning', 'info']" 
                :key="color"
                :color="color"
                class="ma-1"
              >
                {{ color }}
              </VChip>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard>
          <VCardTitle>user</VCardTitle>
          <VCardText>
            <p>
              <NuxtLink to="/users/1">
                User 1
              </NuxtLink>
            </p>
            <p>
              <NuxtLink to="/users/2">
                User 2
              </NuxtLink>
            </p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { useTheme } from 'vuetify'

const theme = useTheme()


const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value === 'light' ? 'dark' : 'light'
}

const setLightTheme = () => {
  theme.global.name.value = 'light'
}

const setDarkTheme = () => {
  theme.global.name.value = 'dark'
}
</script>

<style lang="scss">
/* stylelint-disable-next-line @stylistic/string-quotes */
@use '@layouts/styles/mixins1';

// Custom theme-aware styles
.v-card {
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 10%);
    transform: translateY(-2px);
  }
}

// Theme-specific customizations
:root[data-theme="dark"] {
  .v-card {
    background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  }
}

:root[data-theme="light"] {
  .v-card {
    background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%);
  }
}
</style>

<script setup lang="ts">
import AppPricingNew from '@/components/AppPricingNew.vue'

</script>

<template>
  <VCard>
    <VCardText class="py-16">
      <!-- 👉 App Pricing components -->
      <VRow>
        <VCol
          cols="12"
          sm="8"
          md="12"
          lg="10"
          class="mx-auto"
        >
          <AppPricingNew md="4" />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

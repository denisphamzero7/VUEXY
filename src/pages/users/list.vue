<script setup>
import { useApi } from '@/composables/useApi'
import { computed } from 'vue'

const { data: usersData } = await useApi('/apps/users')

// Extract users array from the response
const users = computed(() => {
  const data = usersData.value
  
  return data?.users || []
})

console.log('usersData', usersData.value)
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for="(user, index) in users"
        :key="user.id || index"
        cols="12"
        md="6"
        lg="4"
      >
        <VCard>
          <VCardText>
            <div class="d-flex align-center gap-3">
              <VAvatar
                size="34"
                :variant="!user.avatar ? 'tonal' : undefined"
                :color="!user.avatar ? resolveUserRoleVariant(item.role).color : undefined"
              >
                <VImg
                  v-if="user.avatar"
                  :src="user.avatar"
                />
                <span v-else>{{ avatarText(item.fullName) }}</span>
              </VAvatar>
              <div>
                <p class="text-h6 font-weight-medium mb-1">
                  {{ user?.fullName || 'Unknown User' }}
                </p>
                <p class="text-body-2 text-medium-emphasis">
                  {{ user?.email || 'No email' }}
                </p>
                <p class="text-caption">
                  {{ user?.role || 'No role' }}
                </p>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>


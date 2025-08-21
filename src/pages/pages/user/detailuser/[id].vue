<template>
  <div class="user-profile-page">
    <VCard
      class="profile-card mx-auto pa-6"
      max-width="760"
    >
      <div class="profile-top d-flex flex-column align-center">
        <VAvatar
          :size="120"
          rounded
          class="mb-4"
        >
          <template #default>
            <img
              :src="avatarSrc"
              alt="Avatar"
            >
          </template>
        </VAvatar>

        <h3 class="profile-name mb-1">
          {{ user?.name ?? '—' }}
        </h3>

        <VChip
          v-if="roleName"
          class="mb-4"
          size="small"
          outlined
        >
          {{ roleName }}
        </VChip>

        <div class="profile-stats d-flex gap-6 my-4">
          <div class="stat">
            <div class="stat-icon">
              ✔️
            </div>
            <div class="stat-value">
              {{ prettyNumber(user?.stats?.tasksDone) }}
            </div>
            <div class="stat-label">
              Task Done
            </div>
          </div>

          <div class="stat">
            <div class="stat-icon">
              📦
            </div>
            <div class="stat-value">
              {{ prettyNumber(user?.stats?.projectsDone) }}
            </div>
            <div class="stat-label">
              Project Done
            </div>
          </div>
        </div>

        <VDivider />
      </div>

      <VCardText class="pt-6">
        <h4 class="text-subtitle-1 mb-3">
          Details
        </h4>

        <div class="details-grid">
          <div class="detail-row">
            <div class="detail-key">
              Username:
            </div>
            <div class="detail-val">
              {{ user?.name ?? '—' }}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-key">
              Billing Email:
            </div>
            <div class="detail-val">
              {{ user?.email ?? '—' }}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-key">
              Status:
            </div>
            <div class="detail-val">
              <VChip
                :color="user?.status ? 'success' : 'error'"
                size="small"
                label
              >
                {{ user?.status ? 'Đang hoạt động' : 'Không hoạt động' }}
              </VChip>
            </div>
          </div>


          <div
            v-if="user?.taxId || user?.tax_id"
            class="detail-row"
          >
            <div class="detail-key">
              Tax ID:
            </div>
            <div class="detail-val">
              {{ user?.taxId ?? user?.tax_id }}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-key">
              Contact:
            </div>
            <div class="detail-val">
              {{ user?.phone ?? '—' }}
            </div>
          </div>

          <div
            v-if="user?.language"
            class="detail-row"
          >
            <div class="detail-key">
              Language:
            </div>
            <div class="detail-val">
              {{ user.language }}
            </div>
          </div>

          <div
            v-if="user?.country"
            class="detail-row"
          >
            <div class="detail-key">
              Country:
            </div>
            <div class="detail-val">
              {{ user.country }}
            </div>
          </div>

          <!-- render any additional nice-to-have fields if exist -->
          <div
            v-if="user?.address"
            class="detail-row"
          >
            <div class="detail-key">
              Address:
            </div>
            <div class="detail-val">
              {{ user.address }}
            </div>
          </div>
        </div>

        <div class="mt-6 d-flex justify-end gap-3">
          <VBtn
            text
            @click="goBack"
          >
            Quay lại
          </VBtn>
          <VBtn
            color="primary"
            :disabled="!userId"
            @click="goEdit"
          >
            Chỉnh sửa
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <div
      v-if="loadingLocal"
      class="loading-overlay"
    >
      <VProgressCircular
        indeterminate
        size="48"
      />
    </div>

    <div
      v-if="errorLocal"
      class="error-box mx-auto mt-6"
    >
      <VAlert
        type="error"
        dense
        text
      >
        {{ errorLocal }}
      </VAlert>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@core/stores/user' // path dựa trên project của bạn
import avatarDefault from '@images/avatars/avatar-1.png' // fallback avatar

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// route param có thể là `userId` hoặc `id` tuỳ route config
const userId = computed(() => route.params.userId ?? route.params.id ?? null)

const user = ref(null)
const loadingLocal = ref(false)
const errorLocal = ref(null)

const roleName = computed(() => {
  // role có thể là object hoặc id. Nếu object có name, ưu tiên hiển thị name
  if (!user.value) return ''
  if (user.value.role && typeof user.value.role === 'object') return user.value.role.name || ''

  return user.value.role || ''
})

// avatar src (user.avatar có thể là url hoặc base64)
const avatarSrc = computed(() => {
  return user.value?.avatar || user.value?.image || avatarDefault
})

// pretty number for stats
const prettyNumber = n => {
  if (n == null) return '—'
  if (typeof n !== 'number') {
    const parsed = Number(n)
    if (isNaN(parsed)) return n
    n = parsed
  }
  if (n >= 1000) return (n/1000).toFixed(2).replace(/\.?0+$/, '') + 'k'
  
  return String(n)
}

// fetch function using your store
const fetch = async id => {
  if (!id) return
  loadingLocal.value = true
  errorLocal.value = null
  try {
    const data = await userStore.fetchUserById(String(id))


    // your store.fetchUserById returns resp (unwrapped)
    user.value = data || null
  } catch (err) {
    console.error('fetch user error', err)
    errorLocal.value = userStore.error || (err && err.message) || 'Lỗi khi tải người dùng'
  } finally {
    loadingLocal.value = false
  }
  console.log('fetched user:', user.value)
  console.log('user.role raw:', user.value?.role)
}

onMounted(() => {
  if (userId.value) fetch(userId.value)
})

// watch id change (route change)
watch(userId, v => {
  if (v) fetch(v)
})

// navigation
const goBack = () => router.back()

const goEdit = () => {
  if (!userId.value) return
  router.push(`/users/${userId.value}/edit`) // chỉnh theo route edit của bạn
}
</script>

<style scoped>
.user-profile-page {
  padding: 24px;
}

.profile-card {
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(30, 41, 59, 0.06);
}

.profile-top {
  text-align: center;
}

.profile-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 110px;
}

.stat-icon {
  width: 46px;
  height: 46px;
  background: rgba(99, 102, 241, 0.12);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 20px;
}

.stat-value {
  font-weight: 600;
  font-size: 18px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.details-grid {
  margin-top: 12px;
  border-top: 1px solid rgba(0,0,0,0.06);
  padding-top: 16px;
}

.detail-row {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px dashed rgba(0,0,0,0.03);
  align-items: center;
}

.detail-key {
  width: 160px;
  color: #6b7280;
  font-size: 13px;
}

.detail-val {
  flex: 1;
  font-size: 14px;
  color: #111827;
}

.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.6);
  z-index: 50;
}

.error-box {
  max-width: 760px;
}
</style>

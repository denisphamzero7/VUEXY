<script setup>
import { ref, nextTick, onMounted } from 'vue'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRoute, useRouter } from 'vue-router'

// Pinia auth store (điều chỉnh path nếu bạn để store ở chỗ khác)
import { useAuthStore } from '@core/stores/auth'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

/* ---------- local state ---------- */
const errors = ref({
  email: undefined,
  password: undefined,
  general: undefined,
})

const refVForm = ref()
const isPasswordVisible = ref(false)

const form = ref({
  username: '',
  password: '',
})

const rememberMe = ref(false)

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

/* Khởi tạo store (nếu cần) để restore session từ localStorage khi user reload */
onMounted(() => {
  if (typeof authStore.init === 'function') {
    try {
      authStore.init()
    } catch (e) {
      // ignore
      console.warn('authStore.init() failed', e)
    }
  }
})

/* ---------- signin logic ---------- */
const signin = async () => {
  // reset lỗi
  errors.value = { email: undefined, password: undefined, general: undefined }

  // copy giá trị input vào store.credentials (store.login dùng object này)
  authStore.credentials.username = form.value.username
  authStore.credentials.password = form.value.password

  try {
    // gọi login (giữ nguyên)
    await authStore.login()

    // --- BỔ SUNG: đảm bảo lưu trên localStorage ---
    // Nguồn token/user có thể do authStore lưu, hoặc do login trả về local/session.
    // Ta thử đọc từ authStore nếu có, nếu không thì kiểm tra sessionStorage rồi localStorage.
    try {
      // access token
      const access =

        // ưu tiên thuộc tính store (nếu authStore có lưu)
        (authStore && (authStore.accessToken || authStore.token || authStore.access)) ||

        // hoặc local/session storage (nếu login đã tự lưu tạm)
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken')

      if (access) {
        localStorage.setItem('accessToken', access)
      }

      // refresh token
      const refresh =
        (authStore && (authStore.refreshToken || authStore.refresh)) ||
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken')

      if (refresh) {
        localStorage.setItem('refreshToken', refresh)
      }

      // user object: nếu authStore.user tồn tại (object), stringify; nếu không, thử session/local
      const userObj =
        (authStore && (authStore.user || authStore.currentUser)) ||
        (() => {
          const s = sessionStorage.getItem('user') || localStorage.getItem('user')
          
          return s ? JSON.parse(s) : null
        })()

      if (userObj) {
        // nếu userObj là string (đã stringify), đảm bảo lưu đúng dạng string
        if (typeof userObj === 'string') {
          localStorage.setItem('user', userObj)
        } else {
          localStorage.setItem('user', JSON.stringify(userObj))
        }
      }

      // xóa bất kỳ bản token/user nào trên sessionStorage để tránh nhầm lẫn
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('user')
    } catch (errStorage) {
      // không block nếu việc lưu thất bại — chỉ log
      console.warn('Không thể lưu token vào localStorage:', errStorage)
    }

    // redirect về `to` nếu có query, hoặc trang chủ
    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : '/')
    })
  } catch (err) {
    // Thông thường axios error có response.data.errors hoặc response._data.errors
    const resp = err?.response?.data || err?.response?._data || err

    // Map validation errors (nếu backend trả về { errors: { email: [...], password: [...] } })
    const validationErrors = resp?.errors
    if (validationErrors) {
      errors.value.email = validationErrors.email ? validationErrors.email.join(' ') : undefined
      errors.value.password = validationErrors.password ? validationErrors.password.join(' ') : undefined
      errors.value.general = resp?.message || undefined
    } else {
      // Fallback message
      errors.value.general = resp?.message || err?.message || 'Có lỗi xảy ra khi đăng nhập'
    }

    console.error('Login error:', err)
  }
}


/* submit form — validate Vuetify form trước khi gọi signin */
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) signin()
  })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-start ">
          <VCardTitle>
            <RouterLink to="/">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title">
                  {{ themeConfig.app.title }}
                </h1>
              </div>
            </RouterLink>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Chào mừng <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
          <p class="mb-0">
            Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu cuộc phiêu lưu
          </p>
        </VCardText>

        <VCardText>
          <VForm 
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.username"
                  autofocus
                  label="Email hoặc tên"
                  type="email"
                  placeholder="hau@email.com"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :error-messages="errors.password"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox label="Remember me" />

                  <RouterLink
                    class="text-primary"
                    :to="{ name: 'pages-authentication-forgot-password-v1' }"
                  >
                    Quên password?
                  </RouterLink>
                </div>

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                >
                  Đăng nhập
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <span class="d-inline-block">
                  Bạn mới tham gia nền tảng của chúng tôi?
                </span>
                <RouterLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'pages-authentication-register-v1' }"
                >
                  Tạo mới tài khoản
                </RouterLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>

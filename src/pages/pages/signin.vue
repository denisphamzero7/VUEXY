<script setup>
import { ref, nextTick, onMounted } from 'vue'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useAuthStore } from '@/@core/stores/auth'
import { useNotification } from '@/@core/composable/useNotification'
// eslint-disable-next-line import/named
import { useRoute, useRouter } from 'vue-router' // nếu cần (đảm bảo import đúng)

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const { addNotification } = useNotification()
const { credentials, login, isAuthenticated, user, tokens } = useAuthStore()

// errors từ server (nếu có)
const errors = ref({
  email: undefined,
  password: undefined,
})

// ref cho form Vuetify
const refVForm = ref()

// hiển thị mật khẩu
const isPasswordVisible = ref(false)

// route / router / ability
const route = useRoute()
const router = useRouter()
const ability = useAbility()

onMounted(() => {
  // isAuthenticated là ref => dùng .value
  if (isAuthenticated?.value && user?.value && tokens?.value?.accessToken) {
    console.log('User already authenticated, redirecting to dashboard')
    router.push({ name: 'Dashboard' })
  }
})

// login function — gọi API, lưu cookie, cập nhật ability và redirect
const signin = async () => {
  // reset lỗi trước khi gọi
  errors.value = { email: undefined, password: undefined }

  try {
    // login() trong auth store sẽ xử lý lưu user/token; ở đây ta chỉ chờ hoàn tất
    await login()

    addNotification('Đăng nhập thành công')

    // redirect (nếu có query.to thì dùng nó)
    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : '/')
    })
  } catch (err) {
    // Nếu server trả về validation errors (422 hoặc tương tự)
    const validationErrors = err?.response?.data?.errors || err?.response?._data?.errors
    if (validationErrors) {
      errors.value = validationErrors
    } else {
      // khác (network, 500, v.v.) — log hoặc show notification
      console.error('Login error', err)
      addNotification('Có lỗi xảy ra khi đăng nhập')
    }
  }
}

// submit form — validate Vuetify form trước khi gọi login
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      signin()
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
                  v-model="credentials.username"
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
                  v-model="credentials.password"
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

<script setup>
definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const route = useRoute()
const router = useRouter()
const ability = useAbility()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const signIn = async () => {
  if (isLoading.value)
    return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await $api('/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
      onResponseError({ response }) {
        // Handle validation errors from API response
        if (response._data?.errors) {
          const errors = response._data.errors
          if (errors.email) errorMessage.value = errors.email
          else if (errors.password) errorMessage.value = errors.password
          else errorMessage.value = 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin.'
        } else {
          errorMessage.value = 'Đăng nhập thất bại. Vui lòng thử lại.'
        }
      },
    })

    const { accessToken, userData, userAbilityRules } = res

    // Set cookies for authentication and authorization
    useCookie('userAbilityRules').value = userAbilityRules
    ability.update(userAbilityRules)
    useCookie('userData').value = userData
    useCookie('accessToken').value = accessToken

    // Redirect to 'to' query if exist or redirect to index route
    // nextTick is required to wait for DOM updates and later redirect
    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : '/')
    })
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Đăng nhập thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="d-flex align-center justify-center"
    style="min-block-size: 100vh;"
  >
    <VCard
      flat
      :max-width="420"
      class="w-100 mx-4 pa-6"
    >
      <h2 class="text-h5 mb-6">
        Đăng nhập
      </h2>

      <VAlert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        {{ errorMessage }}
      </VAlert>

      <VTextField
        v-model="email"
        label="Email"
        type="email"
        autofocus
        class="mb-3"
      />

      <VTextField
        v-model="password"
        label="Mật khẩu"
        type="password"
        class="mb-6"
      />

      <VBtn
        block
        color="primary"
        :loading="isLoading"
        @click="signIn"
      >
        Đăng nhập
      </VBtn>
    </VCard>
  </div>
</template>


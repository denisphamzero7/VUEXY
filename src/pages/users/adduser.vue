<script setup>
import { ref } from 'vue'

const firstName = ref('')
const userName = ref('')
const email = ref('')
const isCurrentPasswordVisible = ref(false)

const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')

const confirmPassword = ref('')
const status = ref(false)
</script>

<template>
  <VCard
    class="pa-6"
    elevation="2"
  >
    <VForm @submit.prevent="() => {}">
      <VCardTitle class="pa-0">
        <div class="d-flex flex-column">
          <span class="text-h5 ma-0">Thông tin người dùng</span>
          <span class="text-caption  font-medium mb-2 mb-0">Thông tin đăng nhập người dùng cơ bản</span>
        </div> 
      </VCardTitle>
      <VRow>
        <VCol cols="12">
          <AppTextField
            v-model="firstName"
            label="Tên người dùng"
            placeholder="Tên người dùng"
          />
        </VCol>
     
        <VCol cols="12">
          <AppTextField
            v-model="userName"
            label="Tên Đăng nhập"
            placeholder="Tên đăng nhập"
          />
        </VCol>

        <VCol cols="12">
          <AppTextField
            v-model="email"
            label="Email"
            type="email"
            placeholder="Email"
          />
        </VCol>

        <VCol cols="12">
          <AppTextField
            v-model="currentPassword"
            :type="isCurrentPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
            label="Mật khẩu"
            autocomplete="on"
            placeholder="············"
            @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
          />
        </VCol>

        <VCol cols="12">
          <!-- 👉 confirm password -->
          <AppTextField
            v-model="confirmPassword"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
            label="Xác nhận mật khẩu mới"
            autocomplete="on"
            placeholder="············"
            @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
          />
        </VCol>

        <VCol cols="12">
          <VRadioGroup 
            v-model="status"
            label="Trạng thái"
            inline
            class="d-flex flex-row align-center"
          >
            <VRadio
              label="Hoạt động"
              value="Hoạt động"
              color="success"
            />
            <VRadio
              label="Không hoạt động"
              value="Không hoạt động"
              color="secondary"
            />
          </VRadioGroup>
        </VCol>
      </VRow>
    </VForm>
  </VCard>
</template>

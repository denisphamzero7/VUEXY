<script setup>
import laptopGirl from '@images/illustrations/laptop-girl.png'

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const passwordRequirements = [
  'Tối thiểu 8 ký tự - càng dài càng tốt',
  'Ít nhất một ký tự thường',
  'Ít nhất một chữ số, ký tự đặc biệt hoặc khoảng trắng',
]

const serverKeys = [
  {
    name: 'Server Key 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Toàn quyền',
  },
  {
    name: 'Server Key 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Chỉ đọc',
  },
  {
    name: 'Server Key 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Toàn quyền',
  },
]

const recentDevicesHeaders = [
  {
    title: 'TRÌNH DUYỆT',
    key: 'browser',
  },
  {
    title: 'THIẾT BỊ',
    key: 'device',
  },
  {
    title: 'VỊ TRÍ',
    key: 'location',
  },
  {
    title: 'HOẠT ĐỘNG GẦN ĐÂY',
    key: 'recentActivity',
  },
]

const recentDevices = [
  {
    browser: 'Chrome trên Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'tabler-brand-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome trên iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'tabler-device-mobile',
      color: 'error',
    },
  },
  {
    browser: 'Chrome trên Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'tabler-brand-android',
      color: 'success',
    },
  },
  {
    browser: 'Chrome trên macOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'tabler-brand-apple',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome trên Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'tabler-brand-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome trên Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'tabler-brand-android',
      color: 'success',
    },
  },
]

const isOneTimePasswordDialogVisible = ref(false)
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Đổi mật khẩu">
        <VForm>
          <VCardText class="pt-0">
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <AppTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="Mật khẩu hiện tại"
                  autocomplete="on"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <AppTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  label="Mật khẩu mới"
                  autocomplete="on"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
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
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <h6 class="text-h6 text-medium-emphasis mb-4">
              Yêu cầu mật khẩu:
            </h6>

            <VList class="card-list">
              <VListItem
                v-for="item in passwordRequirements"
                :key="item"
                :title="item"
                class="text-medium-emphasis"
              >
                <template #prepend>
                  <VIcon
                    size="10"
                    icon="tabler-circle-filled"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Lưu thay đổi</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Đặt lại
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Two-steps verification -->
    <VCol cols="12">
      <VCard title="Xác thực hai bước">
        <VCardText>
          <h5 class="text-h5 text-medium-emphasis mb-4">
            Xác thực hai yếu tố chưa được bật.
          </h5>
          <p class="mb-6">
            Xác thực hai yếu tố thêm một lớp bảo mật cho tài khoản của bạn bằng cách yêu cầu nhiều hơn chỉ mật khẩu khi đăng nhập.
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Tìm hiểu thêm.</a>
          </p>

          <VBtn @click="isOneTimePasswordDialogVisible = true">
            Bật xác thực hai yếu tố
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <VCol cols="12">
      <!-- SECTION: Create an API key -->
      <VCard title="Tạo API key">
        <VRow no-gutters>
          <!-- 👉 Choose API Key -->
          <VCol
            cols="12"
            md="5"
            order-md="0"
            order="1"
          >
            <VCardText class="pt-1">
              <VForm @submit.prevent="() => { }">
                <VRow>
                  <!-- 👉 Choose API Key -->
                  <VCol cols="12">
                    <AppSelect
                      label="Chọn loại API key bạn muốn tạo"
                      placeholder="Chọn loại API key"
                      :items="['Full Control', 'Modify', 'Read & Execute', 'List Folder Contents', 'Read Only', 'Read & Write']"
                    />
                  </VCol>

                  <!-- 👉 Name the API Key -->
                  <VCol cols="12">
                    <AppTextField
                      label="Đặt tên cho API key"
                      placeholder="Đặt tên cho API key"
                    />
                  </VCol>

                  <!-- 👉 Create Key Button -->
                  <VCol cols="12">
                    <VBtn
                      type="submit"
                      block
                    >
                      Tạo key
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCol>

          <!-- 👉 Lady image -->
          <VCol
            cols="12"
            md="7"
            order="0"
            order-md="1"
            class="d-flex flex-column justify-center align-center"
          >
            <VImg
              :src="laptopGirl"
              :width="$vuetify.display.smAndDown ? '150' : '200'"
              :style="$vuetify.display.smAndDown ? 'margin-block-end: 24px' : 'position: absolute; bottom: 0;'"
            />
          </VCol>
        </VRow>
      </VCard>
      <!-- !SECTION -->
    </VCol>

    <VCol cols="12">
      <!-- SECTION: API Keys List -->
      <VCard>
        <VCardItem class="pb-4">
          <VCardTitle>Danh sách API Key & quyền truy cập</VCardTitle>
        </VCardItem>
        <VCardText>
          API key là một chuỗi được mã hóa đơn giản dùng để xác định ứng dụng mà không cần bất kỳ thông tin định danh. Chúng hữu ích
          để truy cập dữ liệu công khai ẩn danh, và được sử dụng để liên kết các yêu cầu API với dự án của bạn cho mục đích hạn mức và
          thanh toán.
        </VCardText>

        <!-- 👉 Server Status -->
        <VCardText class="d-flex flex-column gap-y-6">
          <VCard
            v-for="serverKey in serverKeys"
            :key="serverKey.key"
            flat
            class="pa-4"
            color="rgba(var(--v-theme-on-surface),var(--v-hover-opacity))"
          >
            <div class="d-flex flex-column gap-y-2">
              <div class="d-flex align-center flex-wrap">
                <h5 class="text-h5 me-3">
                  {{ serverKey.name }}
                </h5>
                <VChip
                  label
                  color="primary"
                  size="small"
                >
                  {{ serverKey.permission }}
                </VChip>
              </div>
              <div class="d-flex align-center text-base font-weight-medium">
                <h6 class="text-h6 text-medium-emphasis me-3">
                  {{ serverKey.key }}
                </h6>
                <div class="cursor-pointer">
                  <VIcon
                    icon="tabler-copy"
                    size="20"
                  />
                </div>
              </div>
              <div class="text-disabled">
                Tạo vào {{ serverKey.createdOn }}
              </div>
            </div>
          </VCard>
        </VCardText>
      </VCard>
      <!-- !SECTION -->
    </VCol>

    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="Thiết bị gần đây">
        <VDivider />

        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          hide-default-footer
          class="text-no-wrap"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                size="22"
                :icon="item.deviceIcon.icon"
                :color="item.deviceIcon.color"
              />
              <div class="text-high-emphasis text-body-1 font-weight-medium">
                {{ item.browser }}
              </div>
            </div>
          </template>
          <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- SECTION Enable One time password -->
  <TwoFactorAuthDialog v-model:is-dialog-visible="isOneTimePasswordDialogVisible" />
  <!-- !SECTION -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}

.server-close-btn {
  inset-inline-end: 0.5rem;
}
</style>

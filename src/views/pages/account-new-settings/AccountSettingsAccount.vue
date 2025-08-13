<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const accountData = {
  avatarImg: avatar1,
  firstName: 'Phạm',
  lastName: 'Hậu',
  email: 'phamngochau2000@gmail.com',
  org: 'Pixinvent',
  phone: '+84 33 7335747',
  address: '111, Võ Nguyên Giáp',
  state: 'Đà nẵng',
  zip: '10001',
  country: 'Việt Nam',
  language: 'Tiếng Việt',
  timezone: '(GMT-11:00) Đường Đổi Ngày Quốc tế - Tây',
  currency: 'USD',
}

const refInputEl = ref()
const isConfirmDialogOpen = ref(false)
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Vui lòng xác nhận việc hủy kích hoạt tài khoản']

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

const timezones = [
  '(GMT-11:00) Đường Đổi Ngày Quốc tế - Tây',
  '(GMT-11:00) Đảo Midway',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Giờ Thái Bình Dương (Mỹ & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Giờ Mountain (Mỹ & Canada)',
  '(GMT-06:00) Trung Mỹ',
  '(GMT-06:00) Giờ Trung tâm (Mỹ & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Thành phố Mexico',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogotá',
  '(GMT-05:00) Giờ Đông (Mỹ & Canada)',
  '(GMT-05:00) Indiana (Miền Đông)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Giờ Đại Tây Dương (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasília',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Giữa Đại Tây Dương',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Quần đảo Cape Verde',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) Luân Đôn',
]

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'HKD',
  'HUF',
  'INR',
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-4">
              <VBtn
                color="primary"
                size="small"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="tabler-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Tải ảnh mới lên</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                size="small"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Cài lại</span>
                <VIcon
                  icon="tabler-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Cho phép JPG, GIF or PNG. Lớn nhất là 800K
            </p>
          </form>
        </VCardText>

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm class="mt-3">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.firstName"
                  placeholder="John"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.lastName"
                  placeholder="Doe"
                  label="Last Name"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  placeholder="a@gmail.com"
                  type="email"
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.org"
                  label="Tổ chức"
                  placeholder="sos"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.phone"
                  label="Số điện thoại"
                  placeholder="+84 0337335747"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.address"
                  label="Địa chỉ"
                  placeholder="111, Võ Nguyên Giáp"
                />
              </VCol>

              <!-- 👉 State -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.state"
                  label="State"
                  placeholder="Việt Nam"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.zip"
                  label="Zip Code"
                  placeholder="10001"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="accountDataLocal.country"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                  placeholder="Lựa chọn đất nước"
                />
              </VCol>

              <!-- 👉 Language -->
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="accountDataLocal.language"
                  label="Ngôn ngữ"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']"
                />
              </VCol>

              <!-- 👉 Timezone -->
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="accountDataLocal.timezone"
                  label="Múi giờ"
                  placeholder="Lựa chọn múi giờ"
                  :items="timezones"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>

              <!-- 👉 Currency -->
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="accountDataLocal.currency"
                  label="Tiền tệ"
                  placeholder="Lựa chọn tiền tệ"
                  :items="currencies"
                  :menu-props="{ maxHeight: 200 }"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Lưu</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Hủy
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Delete Account -->
      <VCard title="Xóa tài khoản">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="Tôi xác nhận việc hủy kích hoạt tài khoản của tôi"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-6"
            @click="isConfirmDialogOpen = true"
          >
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirm Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDialogOpen"
    confirmation-question="Bạn có chắc chắn muốn hủy kích hoạt tài khoản của mình không?"
    confirm-title="Đã tắt!"
    confirm-msg="Tài khoản của bạn đã được hủy kích hoạt thành công."
    cancel-title="Đã hủy"
    cancel-msg="Đã hủy kích hoạt tài khoản!"
  />
</template>

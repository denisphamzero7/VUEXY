<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import { VCardText } from 'vuetify/components'

const shippingList = [
  {

    title: 'Hoạt động',
    value: 'Hoạt động',
  },
  {
    title: 'Không hoạt động',
    value: 'Không hoạt động',
  },
]

const shippingType = ref(shippingList[0].value)

const accountData = {
  avatarImg: avatar1,
  firstName: '',
  lastName: '',
  email: '',
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

// bảo mật

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
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
</script>

<template>
  <VCard
    flat
    variant="text"
    class="d-flex align-center px-1 bg-transparent shadow-none "
  >
    <!-- Nút quay lại -->
    <VBtn
      icon
      variant="text"
      color="default"
    >
      <VIcon>tabler-arrow-left</VIcon>
    </VBtn>

    <!-- Tiêu đề -->
    <VCardText
      variant="text"
      class="text-h4 "
      flat
    >
      Thêm mới người dùng
    </VCardText>
  </VCard>

  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VCard>     
        <VCardText class="pt-4 ">
          <h3 class="mt-4 py-1">
            Thông tin người dùng
          </h3>
          <p>Thông tin đăng nhập người dùng cơ bản</p>
          <!-- 👉 Form -->
          <VForm class="mt-3">
            <VRow>
              <!-- 👉 First Name -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.firstName"
                  placeholder="Tên người dùng"
                  label="Tên người dùng"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.lastName"
                  placeholder="Tên đăng nhập"
                  label="Tên đăng nhập"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="accountDataLocal.email"
                  label="Email"
                  placeholder="Email"
                  type="email"
                />
              </VCol>

             

              <!-- 👉 Address -->
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

              
              <VRadioGroup
                v-model="shippingType"
                label="Trạng thái"
                class="ms-3"
                inline
              >
                <VRadio
                  v-for="item in shippingList"
                  :key="item.value"
                  :value="item.value"
                  :color="item.value === 'Hoạt động' ? 'success' : 'secondary'"
                  class="mb-4 "
                >
                  <template #label>
                    <div>
                      <div class="text-high-emphasis font-weight-medium mb-1">
                        {{ item.title }}
                      </div>
                    </div>
                  </template>
                </VRadio>
              </VRadioGroup>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard>     
        <VCardText class="pt-4">
          <!-- 👉 Form -->
          <h3 class="mt-4 py-1">
            Vai trò và tổ chức
          </h3>
          <p>Lựa chọn vai trò và tổ chức quản lý cho người dùng</p>
          <VTable class="text-no-wrap rounded-0">
            <thead>
              <tr>
                <th>Tên vai trò</th>
                <th>Tổ chức/Đơn vị</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <VCheckbox
                    v-model="value"
                    label="Quản trị viên hệ thống"
                    value="sys_admin"
                    hide-details
                  />
                </td>
                <td>Vui lòng chọn vai trò</td>
              </tr>

              <tr>
                <td>
                  <VCheckbox
                    v-model="value"
                    label="Quản trị đơn vị A"
                    value="unit_admin"
                    hide-details
                  />
                </td>
                <td>Vui lòng chọn vai trò</td>
              </tr>

              <tr>
                <td>
                  <VCheckbox
                    v-model="value"
                    label="Thử vai trò"
                    value="test_role"
                    hide-details
                  />
                </td>
                <td>Vui lòng chọn vai trò</td>
              </tr>

              <tr>
                <td>
                  <VCheckbox
                    v-model="value"
                    label="Vai trò toàn quyền"
                    value="full_role"
                    hide-details
                  />
                </td>
                <td>Vui lòng chọn vai trò</td>
              </tr>

              <tr>
                <td>
                  <VCheckbox
                    v-model="value"
                    label="Người dùng hệ thống"
                    value="system_user"
                    hide-details
                  />
                </td>
                <td>Vui lòng chọn vai trò</td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>


    <VRow
      md="6"
      class="justify-end"
    >
      <!-- 👉 Delete Account -->
      <VBtn
        class="mr-3"
        color="primary"
      >
        Lưu & thêm
      </VBtn>
      <VBtn
        class="mr-3"
        color="primary"
      >
        Lưu & sửa
      </VBtn>
      <VBtn
        class="mr-3"
        color="primary"
      >
        Lưu & thoát
      </VBtn>
    </VRow>
  </VRow>
</template>

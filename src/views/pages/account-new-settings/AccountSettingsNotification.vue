<script setup>
const recentDevices = ref([
  {
    type: 'Mới nhất cho bạn',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'Tài khoản còn hoạt động',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'Một trình duyệt mới được sử dụng để đăng nhập',
    email: true,
    browser: true,
    app: false,
  },
  {
    type: 'Một thiết bị mới được liên kết',
    email: true,
    browser: false,
    app: false,
  },
])

const selectedNotification = ref('Chỉ khi tôi online')
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Thiết bị gần đây</VCardTitle>
      <p class="text-body-1 mb-0">
        Chúng tôi cần sự cho phép từ trình duyệt của bạn để hiển thị thông báo. <span class="text-primary cursor-pointer">Yêu cầu quyền</span>
      </p>
    </VCardItem>

    <VCardText class="px-0">
      <VDivider />
      <VTable class="text-no-wrap rounded">
        <thead>
          <tr>
            <th scope="col">
              THỂ LOẠI
            </th>
            <th scope="col">
              EMAIL
            </th>
            <th scope="col">
              TRÌNH DUYỆT
            </th>
            <th scope="col">
              ỨNG DỤNG
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="device in recentDevices"
            :key="device.type"
          >
            <td class="text-body-1 text-high-emphasis">
              {{ device.type }}
            </td>
            <td>
              <VCheckbox v-model="device.email" />
            </td>
            <td>
              <VCheckbox v-model="device.browser" />
            </td>
            <td>
              <VCheckbox v-model="device.app" />
            </td>
          </tr>
        </tbody>
      </VTable>
      <VDivider />
    </VCardText>

    <VCardText>
      <VForm @submit.prevent="() => {}">
        <h6 class="text-body-1 font-weight-medium mb-6">
          Khi nào chúng tôi sẽ gửi thông báo cho bạn?
        </h6>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <AppSelect
              v-model="selectedNotification"
              mandatory
              placeholder="Select an option"
              :items="['Chỉ khi tôi trực tuyến', 'Thỉnh thoảng']"
            />
          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-6">
          <VBtn type="submit">
            Lưu thay đổi
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            type="reset"
          >
            Loại bỏ
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>

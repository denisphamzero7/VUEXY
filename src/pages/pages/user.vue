<script setup>
import Adduser from '../users/adduser.vue'
import Selectrole from '../users/selectrole.vue'
</script>



<template>
  <VCard
    flat
    variant="text"
    class="d-flex align-center  "
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
      class="text-h4 font-weight-bold "
      flat
    >
      Thêm mới người dùng
    </VCardText>
  </VCard>

  <VRow

    align="stretch"
    class="g-6"
  >
    <VCol
      col="12"
      md="4"
    >
      <Adduser />
    </VCol>
    <VCol
      col="12"
      md="8"
    >
      <Selectrole />
    </VCol>
  </VRow>
  <VRow
    class="mt-6"
    justify="end"
  >
    <VCol cols="auto">
      <VBtn>
        Lưu & Thêm
      </VBtn>
    </VCol>
    <VCol cols="auto">
      <VBtn>
        Lưu & Sửa
      </VBtn>
    </VCol>
    <VCol cols="auto">
      <VBtn color="primary">
        Lưu & Thoát
      </VBtn>
    </VCol>
  </VRow>
</template>



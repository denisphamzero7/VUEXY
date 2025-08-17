<script setup>
import { ref } from 'vue'

const searchText = ref('')
const dateRange = ref(null)
const selectedStatus = ref(null)

const statusOptions = [
  { label: 'Hoạt Động', value: 'active' },
  { label: 'Ngừng Hoạt Động', value: 'inactive' },
]

function resetFilters() {
  searchText.value = ''
  dateRange.value = null
  selectedStatus.value = null
}
</script>

<template>
  <VCard>
    <template #title>
      <div class="d-flex justify-space-between w-100">
        <span class="text-h6">Bộ lọc</span>
        <VSpacer />
        <VBtn
          size="small"
          variant="elevated"
          color="primary"
          @click="resetFilters"
        >
          <VIcon>tabler-filter-off</VIcon>
          Đặt Lại
        </VBtn>
      </div>
    </template>

    <VCardText>
      <VRow>
        <!-- Ô tìm kiếm -->
        <VCol
          cols="12"
          sm="4"
        >
          <AppTextField
            v-model="searchText"
            label="Tìm mẫu báo cáo"
            placeholder="Tìm mẫu báo cáo"
            clearable
            clear-icon="tabler-x"
          />
        </VCol>

        <!-- Khoảng thời gian -->
        <VCol
          cols="12"
          sm="4"
        >
          <AppDateTimePicker
            v-model="dateRange"
            label="Chọn khoảng thời gian"
            placeholder="Chọn khoảng thời gian"
            clearable
          />
        </VCol>

        <!-- Trạng thái -->
        <VCol
          cols="12"
          sm="4"
        >
          <AppSelect
            v-model="selectedStatus"
            label="Trạng thái mẫu"
            placeholder="Trạng thái mẫu"
            :items="statusOptions"
            clearable
            clear-icon="tabler-x"
          />
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
  </VCard>
</template>

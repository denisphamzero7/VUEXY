<script setup>
import { ref } from 'vue'

const searchText = ref('')
const dateRange = ref(null)
const selectedStatus = ref(null)

// Các option trạng thái mới
const statusOptions = [
  { label: 'Đã hoàn thành', value: 'completed' },
  { label: 'Chưa hoàn thành', value: 'incomplete' },
  { label: 'Đang chờ', value: 'pending' },
]

const categoryOptions = [
  { label: 'Báo cáo tài chính', value: 'completed' },
  { label: 'Báo cáo nông nghiệp', value: 'incomplete' },
  { label: 'Báo cáo đường bộ', value: 'pending' },
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
          md="3"
        >
          <AppTextField
            v-model="searchText"
            label="Tìm mẫu báo cáo"
            placeholder="Tìm mẫu báo cáo"
            clearable
            clear-icon="tabler-x"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
          md="3"
        >
          <AppSelect
            v-model="selectedStatus"
            label="Danh mục Báo cáo"
            placeholder="Chọn loại báo cáo"
            :items="categoryOptions"
            item-title="label"
            item-value="value"
            clearable
            clear-icon="tabler-x"
          />
        </VCol>
        <!-- Khoảng thời gian -->
        <VCol
          cols="12"
          sm="4"
          md="3"
        >
          <AppDateTimePicker
            v-model="dateRange"
            label="Chọn khoảng thời gian"
            placeholder="Chọn khoảng thời gian"
            clearable
          />
        </VCol>

        <!-- Trạng thái (đã sửa) -->
        <VCol
          cols="12"
          sm="4"
          md="3"
        >
          <AppSelect
            v-model="selectedStatus"
            label="Trạng thái mẫu"
            placeholder="Chọn trạng thái"
            :items="statusOptions"
            item-title="label"
            item-value="value"
            clearable
            clear-icon="tabler-x"
          />
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
  </VCard>
</template>

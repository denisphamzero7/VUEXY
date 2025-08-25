<script setup>
import { computed } from "vue"
import AppSelect from "@core/components/app-form-elements/AppSelect.vue"
import AppDateTimePicker from "@core/components/app-form-elements/AppDateTimePicker.vue"
import AppTextField from "@core/components/app-form-elements/AppTextField.vue"



const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  isExportDialogVisible: {
    type: Boolean,
    required: true,
  },
  exportApi: {
    type: Function,
    required: true,
  },
  selectedTemplates: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits([
  "update:filters",
  "reset",
  "update:isExportDialogVisible",
  "addTemplate",
  "bulkAction",
])


const localFilters = computed({
  get: () => props.filters,
  set: value => {
    emit("update:filters", value)
  },
})

const reset = () => {
  emit("reset")
}

const statusOptions = [
  { title: "Đang hoạt động", value: "active" },
  { title: "Không hoạt động", value: "inactive" },
]

const categoryOptions = [
  // This will be fetched from an API later
]

const createdByOptions = [
  // This will be fetched from an API later (e.g., list of users who can create templates)
]
</script>

<template>
  <div>
    <VCardItem class="pb-4">
      <div class="d-flex align-center gap-3 mb-4">
        <span class="d-flex align-center gap-2 text-h5">
          <VIcon
            icon="tabler-filter"
            size="24"
            color="primary"
          />
          Lọc
        </span>

        <VMenu v-if="selectedTemplates.length > 0">
          <template #activator="{ props }">
            <VBtn
              color="primary"
              v-bind="props"
            >
              <span class="d-none d-sm-inline ms-2">
                Chọn trạng thái
              </span>
              <VIcon
                icon="tabler-chevron-right"
                size="20"
                class="nav-group-arrow"
                style="transform: rotate(90deg)"
              />
            </VBtn>
          </template>

          <VList>
            <VListItem
              prepend-icon="tabler-check"
              color="success"
              @click="emit('bulkAction', 'activate')"
            >
              <VListItemTitle>Hoạt động</VListItemTitle>
            </VListItem>
            <VListItem
              prepend-icon="tabler-x"
              color="warning"
              @click="emit('bulkAction', 'deactivate')"
            >
              <VListItemTitle>
                Không hoạt động
              </VListItemTitle>
            </VListItem>
            <VListItem
              prepend-icon="tabler-trash"
              color="error"
              @click="emit('bulkAction', 'delete')"
            >
              <VListItemTitle>Xóa</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>

      <template #append>
        <div class="d-flex align-center flex-wrap gap-2 mb-4">
          <VBtn
            color="secondary"
            variant="outlined"
            :flat="false"
            style="display: none"
            class="d-md-flex"
            @click="reset"
          >
            <VIcon>tabler-filter-off</VIcon>
            <span class="d-none d-sm-inline ms-2">
              Đặt lại
            </span>
          </VBtn>
          <VBtn
            color="secondary"
            variant="outlined"
            :flat="false"
            style="display: none"
            class="d-md-flex"
            @click="reset"
          >
            <VIcon>tabler-database-export</VIcon>
            <span class="d-none d-sm-inline ms-2">
              Xuất dữ liệu
            </span>
          </VBtn>
        

          <VBtn
            color="primary"
            variant="tonal"
            style="border: 1px solid rgb(var(--v-theme-primary))"
            @click="emit('addTemplate')"
          >
            <VIcon size="18">
              tabler-file-plus
            </VIcon>
            <span class="d-none d-sm-inline ms-2">
              THêm mới
            </span>
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VRow>
        <VCol
          cols="12"
          sm="4"
        >
          <AppTextField
            v-model="localFilters.name"
            label="Tìm mẫu báo cáo"
            clearable
            clear-icon="tabler-x"
            placeholder="Nhập tên mẫu báo cáo"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
        >
          <AppDateTimePicker
            v-model="localFilters.period_range"
            label="Khoảng thời gian"
            placeholder="Chọn khoảng thời gian"
            clearable
            :config="{ mode: 'range', dateFormat: 'd/m/Y' }"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
        >
          <AppSelect
            v-model="localFilters.status"
            label="Trạng thái mẫu"
            :items="statusOptions"
            clearable
            clear-icon="tabler-x"
            placeholder="Chọn trạng thái"
          />
        </VCol>
      </VRow>
    </VCardText>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { avatarText } from '@core/utils/formatters'

// Tạm thời: dùng dữ liệu cục bộ để hiển thị giao diện bảng.
// Không dùng i18n, không phát hành event / action.

const reportData = ref([
  { id: 10, title: 'Báo cáo an toàn, an ninh thông tin 6 tháng 2 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '11:37 11/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
  { id: 7, title: 'Báo cáo an toàn, an ninh thông tin 6 tháng 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '07:40 11/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
  { id: 6, title: 'Báo cáo tình hình quản lý việc làm lao động trên địa bàn 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '17:35 07/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
  { id: 5, title: 'Báo cáo giải ngân kinh phí người có công 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '17:35 07/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
  { id: 4, title: 'Báo cáo tình hình tiếp nhận hồ sơ cán bộ, công chức, viên chức', updatedBy: 'Quản trị hệ thống', updatedAt: '11:14 11/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
  { id: 2, title: 'Báo cáo rà soát việc khắc côn đầu', updatedBy: 'Quản trị hệ thống', updatedAt: '11:14 11/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
  { id: 1, title: 'Đăng ký thông tin người nhập dữ liệu giải quyết khó khăn, vướng mắc', updatedBy: 'Quản trị hệ thống', updatedAt: '17:35 07/08/2025', status: 'Hoạt Động', updated_by: { name: 'Quản trị hệ thống' } },
])

const headers = ref([
  { title: 'STT', key: 'stt', sortable: false },
  { title: 'TÊN MẪU BÁO CÁO', key: 'title' },
  { title: 'CẬP NHẬT', key: 'updated' },
  { title: 'TRẠNG THÁI', key: 'status' },
  { title: 'ID', key: 'id' },
  { title: 'HÀNH ĐỘNG', key: 'actions', sortable: false },
])

const itemsPerPage = ref(10)
const page = ref(1)
const selectedTemplates = ref([])

const calculateRowNumber = index => (page.value - 1) * itemsPerPage.value + index + 1

const resolveStatusVariant = status => {
  const s = (status || '').toString().toLowerCase()
  if (s.includes('hoạt') || s === 'active') return { color: 'success', text: 'Hoạt Động' }
  
  return { color: 'secondary', text: 'Không hoạt động' }
}
</script>

<template>
  <VCard>
    <VCardText>
      <VDataTable
        v-model:selected-rows="selectedTemplates"
        v-model:page="page"
        :items-per-page="itemsPerPage"
        :items="reportData"
        :headers="headers"
        :items-length="reportData.length"
        class="text-no-wrap"
        show-select
        item-value="id"
      >
        <template #item.stt="{ index }">
          {{ calculateRowNumber(index) }}
        </template>

        <template #item.title="{ item }">
          <div
            class="text-body-1 font-weight-medium text-truncate"
            style="max-width: 320px"
          >
            {{ item.title }}
          </div>
        </template>

        <template #item.updated="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar
              size="34"
              :variant="!item?.updated_by?.avatar && !item?.updatedBy ? 'tonal' : undefined"
              color="warning"
            >
              <VImg
                v-if="item?.updated_by?.avatar"
                :src="item?.updated_by?.avatar"
              />
              <span v-else>{{ avatarText(item.updatedBy || item.updated_by?.name) }}</span>
            </VAvatar>
            <div>
              <div class="text-body-2 font-weight-medium">
                {{ item.updatedBy || item.updated_by?.name || '-' }}
              </div>
              <div class="text-caption text-disabled">
                <div>{{ item.updatedAt }}</div>
              </div>
            </div>
          </div>
        </template>

        <template #item.status="{ item }">
          <VChip
            :color="resolveStatusVariant(item.status).color"
            size="small"
            label
            class="text-capitalize"
          >
            {{ resolveStatusVariant(item.status).text }}
          </VChip>
        </template>

        <template #item.id="{ item }">
          {{ item.id }}
        </template>

        <template #item.actions="{ item }">
          <!-- Tạm thời chưa có action thực thi, chỉ hiển thị icon disabled -->
          <div class="d-flex gap-2">
            <VBtn
              size="20"
              variant="text"
              color="primary"
              disabled
            >
              <VIcon icon="tabler-pencil" />
            </VBtn>
             <VBtn
              size="20"
              variant="text"
              color="warning"
              disabled
            >
              <VIcon icon="tabler-user-off" />
            </VBtn>
            <VBtn
              size="20"
              variant="text"
              color="warning"
              disabled
            >
              <VIcon icon="tabler-copy" />
            </VBtn>
            <VBtn
              size="20"
              variant="text"
              color="error"
              disabled
            >
              <VIcon icon="tabler-trash" />
            </VBtn>
          </div>
        </template>

        <template #bottom>
          <VDivider />
          <VCardText class="pt-1 pb-1">
            <div class="d-flex flex-column flex-sm-row align-center justify-sm-space-between gap-3 mt-1">
              <AppSelect
                :model-value="itemsPerPage"
                :items="[
                  { value: 10, title: '10' },
                  { value: 25, title: '25' },
                  { value: 50, title: '50' },
                  { value: 100, title: '100' },
                ]"
                style="max-inline-size: 6rem; min-inline-size: 4rem"
                @update:model-value="val => itemsPerPage = val"
              />

              <div class="d-flex align-center gap-4">
                <p class="text-disabled mb-0 d-none d-md-block text-sm">
                  {{ (page - 1) * itemsPerPage + 1 }} - {{ Math.min(page * itemsPerPage, reportData.length) }} / {{ reportData.length }}
                </p>

                <VPagination
                  :model-value="page"
                  :length="Math.ceil(reportData.length / itemsPerPage)"
                  @update:model-value="val => page = val"
                />
              </div>
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
.v-data-table .v-table__wrapper { &::-webkit-scrollbar { display: none; } -ms-overflow-style: none; scrollbar-width: none; }
:deep(.v-data-table__header) { height: auto !important; th { white-space: normal !important; font-size: 0.875rem !important; hyphens: auto; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; line-height: 1.2; padding: 8px 16px !important; vertical-align: middle !important; height: auto !important; } .v-data-table-header__content { white-space: normal !important; display: inline-block !important; width: 100% !important; } }
.v-data-table { td { vertical-align: middle !important; } }
</style>

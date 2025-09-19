<template>
  <VCard>
    <VDivider />

    <div class="report-table">
      <VDataTable
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="reportData"
        item-value="id"
        show-select
        class="text-no-wrap"
      >
        <!-- STT -->
        <template #item.stt="{ index }">
          <div>{{ (page - 1) * itemsPerPage + index + 1 }}</div>
        </template>

        <template #item.title="{ item }">
          <div class="d-flex align-items-center">
            <div
              :title="item.title"
              class="text-body-1"
            >
              {{ item.title }}
            </div>

            <VChip
              v-if="item.tag"
              :label="false"
              color="secondary"
              variant="elevated"
              size="small"
              :title="item.tag"
            >
              {{ item.tag }}
            </VChip>
          </div>
        </template>

        <!-- TỈ LỆ HOÀN THÀNH -->
        <template #item.completion="{ item }">
          <div class="d-flex gap-2">
            <div
              class="d-flex flex-column gap-1"
              style="inline-size: 200px;"
            >
              <VTooltip top>
                <template #activator="{ props }">
                  <div
                    v-bind="props"
                    style="display: inline-block; width: 100%;"
                  >
                    <VProgressLinear
                      :model-value="getCompletion(item)"
                      :color="getProgressColor(item)"
                      height="8"
                      rounded
                      style="inline-size: 100%;"
                    />
                  </div>
                </template>

                <div style="white-space: nowrap; font-size: 13px;">
                  <div>
                    <strong>Hoàn thành:</strong>
                    <span v-if="item.goodCount !== undefined && item.pendingCount !== undefined">
                      {{ item.goodCount }} ({{ getCompletionPercentPrecise(item) }}%)
                    </span>
                    <span v-else>
                      {{ getCompletion(item) }}%
                    </span>
                  </div>
                  <div>
                    <strong>Chưa hoàn thành:</strong>
                    <span v-if="item.goodCount !== undefined && item.pendingCount !== undefined">
                      {{ item.pendingCount }} ({{ (100 - Number(getCompletionPercentPrecise(item))).toFixed(2) }}%)
                    </span>
                    <span v-else>
                      {{ (100 - getCompletion(item)) }}%
                    </span>
                  </div>
                </div>
              </VTooltip>

              <!-- Số lượng đã xong / đang chờ -->
              <div class="d-flex align-md-center align-center justify-space-between text-caption mt-1">
                <span
                  class="d-flex align-center gap-1"
                  style="color: #22a05f;"
                >
                  <VIcon
                    class="d-flex align-center"
                    size="16"
                    color="success"
                  >tabler-check</VIcon>
                  {{ item.goodCount }}
                </span>

                <span
                  class="d-flex align-center gap-1"
                  style="color: #f59e0b;"
                >
                  <VIcon
                    size="16"
                    color="warning"
                  >tabler-clock</VIcon>
                  {{ item.pendingCount }}
                </span>
              </div>
            </div>

            <div
              class="d-flex align-center"
              style="gap: 8px;"
            >
              <!-- Dialogs (giữ nguyên như trước) -->
              <VDialog
                v-model="dialogStates[item.id].done"
                width="320"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="16"
                    color="success"
                    class="status-ic success"
                    title="Hoàn thành"
                    role="button"
                    tabindex="0"
                  >
                    tabler-check
                  </VIcon>
                </template>

                <VCard>
                  <VCardTitle>Hoàn thành</VCardTitle>
                  <VCardText>{{ getLabelText('done', item) }}</VCardText>
                  <VCardActions>
                    <VSpacer />
                    <VBtn
                      text
                      @click="dialogStates[item.id].done = false"
                    >
                      Đóng
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VDialog>

              <VDialog
                v-model="dialogStates[item.id].pending"
                width="320"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="16"
                    color="warning"
                    class="status-ic warning"
                    title="Đang chờ"
                    role="button"
                    tabindex="0"
                  >
                    tabler-clock
                  </VIcon>
                </template>

                <VCard>
                  <VCardTitle>Đang chờ</VCardTitle>
                  <VCardText>{{ getLabelText('pending', item) }}</VCardText>
                  <VCardActions>
                    <VSpacer />
                    <VBtn
                      text
                      @click="dialogStates[item.id].pending = false"
                    >
                      Đóng
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VDialog>

              <VDialog
                v-model="dialogStates[item.id].blocked"
                width="360"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="16"
                    :color="item.blocked ? 'error' : 'grey'"
                    class="status-ic error"
                    :title="item.blocked ? 'Chưa hoàn thành' : 'Không bị chặn'"
                    role="button"
                    tabindex="0"
                  >
                    tabler-calendar-off
                  </VIcon>
                </template>

                <VCard>
                  <VCardTitle>{{ item.blocked ? 'Chưa hoàn thành' : 'Không bị chặn' }}</VCardTitle>
                  <VCardText>{{ getLabelText('blocked', item) }}</VCardText>
                  <VCardActions>
                    <VSpacer />
                    <VBtn
                      text
                      @click="dialogStates[item.id].blocked = false"
                    >
                      Đóng
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VDialog>
            </div>
          </div>
        </template>

        <!-- CẬP NHẬT: avatar + tên + thời gian -->
        <template #item.updated="{ item }">
          <div class="d-flex align-center gap-2">
            <VAvatar
              size="30"
              variant="tonal"
            >
              <img
                :src="avatar"
                alt="avatar"
                width="30"
                height="30"
              >
            </VAvatar>
            <div class="text-body-2">
              <div>{{ item.updatedBy }}</div>
              <div class="text-caption grey--text">
                {{ item.updatedAt }}
              </div>
            </div>
          </div>
        </template>

        <!-- TIẾN TRÌNH: hiển thị giá trị progress (số) -->
        <template #item.progress="{ item }">
          <div class="d-flex align-center gap-3">
            <VChip
              size="small"
              variant="tonal"
              :color="item.progressLabelColor ?? 'grey'"
              class="progress-chip"
            >
              {{ item.progressLabel ?? '' }}
            </VChip>
          </div>
        </template>

        <!-- ID -->
        <template #item.id="{ item }">
          <div class="col-id">
            {{ item.id }}
          </div>
        </template>

        <!-- Hành động -->
        <template #item.actions="{ item }">
          <IconBtn
            title="xem"
            variant="text"
            @click="onEdit(item)"
          >
            <VIcon
              color="primary"
              icon="tabler-eye"
              size="18"
            />
          </IconBtn>
          <IconBtn
            title="chỉnh xửa"
            variant="text"
            @click="onEdit(item)"
          >
            <VIcon
              color="warning"
              icon="tabler-pencil"
              size="18"
            />
          </IconBtn>
          <IconBtn
            title="Nhân bản"
            variant="text"
            @click="onDuplicate(item)"
          >
            <VIcon
              color="warning"
              icon="tabler-copy"
              size="18"
            />
          </IconBtn>
          <IconBtn
            title="Xóa"
            variant="text"
            @click="onDelete(item)"
          >
            <VIcon
              color="error"
              icon="tabler-trash"
              size="18"
            />
          </IconBtn>
        </template>

        

        <template #bottom>
          <VDivider />
          <VCardText class="pt-1 pb-2">
            <div class="d-flex flex-column flex-sm-row align-center justify-sm-space-between mt-1">
              <AppSelect
                v-model="itemsPerPage"
                :items="[5, 10, 15]"
                style="max-inline-size: 100px; min-inline-size: 100px;"
              />
          
              <div class="d-flex align-center gap-4">
                <TablePagination
                  v-model:page="page"
                  :items-per-page="itemsPerPage"
                  :total-items="reportData.length"
                />
              </div>
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </div>

    <ECommerceAddCategoryDrawer v-model:is-drawer-open="isAddReportDrawerOpen" />
  </VCard>
</template>

<script setup>
import ECommerceAddCategoryDrawer from '@/views/apps/ecommerce/ECommerceAddCategoryDrawer.vue'
import avatar from '@images/avatars/avatar-1.png'
import { reactive, ref } from 'vue'

// DỮ LIỆU MẪU CHO BẢNG BÁO CÁO
const reportData = ref([
  {
    stt: 1,
    title: 'Báo cáo kết quả thực hiện nhiệm...',
    subtitle: '',
    tag: null,
    progress: 78,
    progressColor: 'error',
    goodCount: 18,
    pendingCount: 76,
    blocked: true,
    updatedBy: 'Quản trị hệ thống',
    updatedAt: '10:44 16/08/2025',
    progressLabel: 'Đang Thực Hiện',
    progressLabelColor: 'success',
    id: 7,
    avatar: null,
  },
  {
    stt: 2,
    title: 'Báo cáo rà soát việc khắc con dấu',
    subtitle: '',
    tag: null,
    progress: 42,
    progressColor: 'error',
    goodCount: 55,
    pendingCount: 39,
    blocked: true,
    updatedBy: 'Quản trị hệ thống',
    updatedAt: '09:46 16/08/2025',
    progressLabel: 'Đang Thực Hiện',
    progressLabelColor: 'success',
    id: 6,
    avatar: null,
  },
  {
    stt: 3,
    title: 'Báo cáo công tác Văn thư lưu tr...',
    subtitle: '',
    tag: null,
    progress: 63,
    progressColor: 'error',
    goodCount: 55,
    pendingCount: 39,
    blocked: true,
    updatedBy: 'Quản trị hệ thống',
    updatedAt: '21:01 16/08/2025',
    progressLabel: 'Đang Thực Hiện',
    progressLabelColor: 'success',
    id: 5,
    avatar: null,
  },
])

// header tương ứng (key phải khớp với các slot item.<key> nếu custom)
const headers = [
  { title: 'STT', key: 'stt', sortable: false },
  { title: 'TÊN ĐỢT BÁO CÁO', key: 'title' },
  { title: 'TỈ LỆ HOÀN THÀNH', key: 'completion' }, // slot: item.completion
  { title: 'CẬP NHẬT', key: 'updated' }, // slot: item.updated
  { title: 'TIẾN TRÌNH', key: 'progress' }, // slot: item.progress
  { title: 'ID', key: 'id' },
  { title: 'HÀNH ĐỘNG', key: 'actions', sortable: false },
]

const itemsPerPage = ref(10)
const page = ref(1)
const isAddReportDrawerOpen = ref(false)

function onExport() {
  console.log('Xuất dữ liệu báo cáo...')
}

/**
 * Trả về % (nguyên) dùng hiển thị thanh tiến trình
 * ưu tiên dùng goodCount/pendingCount nếu có
 */
function getCompletion(item) {
  const hasCounts = item && (item.goodCount !== undefined || item.pendingCount !== undefined)
  if (hasCounts) {
    const done = Number(item.goodCount ?? 0)
    const pending = Number(item.pendingCount ?? 0)
    const total = done + pending
    if (total === 0) return 0
    
    return Math.round((done / total) * 100)
  }

  // fallback: dùng item.progress (giả sử đã là số 0-100)
  return Number(item?.progress ?? 0)
}

/**
 * Trả về % chính xác (2 chữ số) để hiển thị trong tooltip
 */
function getCompletionPercentPrecise(item) {
  const hasCounts = item && (item.goodCount !== undefined || item.pendingCount !== undefined)
  if (hasCounts) {
    const done = Number(item.goodCount ?? 0)
    const pending = Number(item.pendingCount ?? 0)
    const total = done + pending
    if (total === 0) return '0.00'
    
    return ((done / total) * 100).toFixed(2)
  }
  
  return Number(getCompletion(item)).toFixed(2)
}



/**
 * Quy tắc màu:
 *  - < 50 => 'error' (đỏ)
 *  - >= 50 && < 100 => 'warning' (cam)
 *  - == 100 => 'success' (xanh)
 */
function getProgressColor(item) {
  const val = Number(getCompletion(item) ?? 0)
  if (val >= 100) return 'success'
  if (val >= 50) return 'warning'
  
  return 'error'
}

function onEdit(item) { console.log('edit', item) }
function onDuplicate(item) { console.log('duplicate', item) }
function onDelete(item) { console.log('delete', item) }

/* dialogStates dùng cho từng icon trên mỗi hàng */
const dialogStates = reactive({})

// khởi tạo state cho mỗi hàng (id làm key)
reportData.value.forEach(r => {
  dialogStates[r.id] = { done: false, pending: false, blocked: false }
})

// helper text cho từng loại dialog
function getLabelText(kind, item) {
  if (!item) return ''
  if (kind === 'done') return `Hoàn thành: ${item.goodCount ?? 0}`
  if (kind === 'pending') return `Đang chờ: ${item.pendingCount ?? 0}`
  if (kind === 'blocked') return item.blocked ? 'Chưa hoàn thành' : 'Không bị chặn'
  
  return ''
}
</script>

<style lang="scss" scoped>
/* Nếu cần style custom cho tooltip / progress, thêm ở đây */
</style>

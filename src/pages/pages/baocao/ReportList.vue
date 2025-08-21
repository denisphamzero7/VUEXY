<script setup>
import { ref, reactive } from 'vue'
import ECommerceAddCategoryDrawer from '@/views/apps/ecommerce/ECommerceAddCategoryDrawer.vue'
import avatar from '@images/avatars/avatar-1.png'

// DỮ LIỆU MẪU CHO BẢNG BÁO CÁO
const reportData = ref([
  {
    stt: 1,
    title: 'Báo cáo rà soát khắc con dấu',
    subtitle: '',
    tag: null,
    progress: 78,
    progressColor: 'error',
    goodCount: 2,
    pendingCount: 6,
    blocked: true,
    updatedBy: 'Quản trị hệ thống',  // đổi tên cho khớp template
    updatedAt: '10:44 16/08/2025',
    progressLabel: 'Đã Kết Thúc',
    progressLabelColor: 'error',
    id: 7, // đổi sang lowercase id
    avatar: null,
  },
  {
    stt: 2,
    title: 'Báo cáo giải quyết khó khăn vượt quy trình',
    subtitle: '',
    tag: null,
    progress: 42,
    progressColor: 'error',
    goodCount: 1,
    pendingCount: 1,
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
    title: 'Báo cáo công tác vận hành hệ thống...',
    subtitle: '',
    tag: 'Danh Mục Khác',
    progress: 63,
    progressColor: 'error',
    goodCount: 3,
    pendingCount: 4,
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
  { title: 'CẬP NHẬT', key: 'updated' },            // slot: item.updated
  { title: 'TIẾN TRÌNH', key: 'progress' },         // slot: item.progress
  { title: 'ID', key: 'id' },
  { title: 'HÀNH ĐỘNG', key: 'actions', sortable: false },
]

const itemsPerPage = ref(10)
const page = ref(1)
const isAddReportDrawerOpen = ref(false)

function onExport() {
  console.log('Xuất dữ liệu báo cáo...')
}

// hàm nhận item làm tham số
const getCompletion = item => {
  // ưu tiên tính từ goodCount/pendingCount nếu có, nếu không dùng trường progress có sẵn
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

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between flex-wrap gap-4 w-100">
        <div class="d-flex align-center gap-4">
          <AppSelect
            v-model="itemsPerPage"
            :items="[5, 10, 15]"
            style="max-inline-size: 100px; min-inline-size: 100px;"
          />
        </div>

        <VSpacer />

        <div class="d-flex align-center gap-3">
          <VBtn
            class="export-btn"
            variant="tonal"
            color="warning"
            elevation="0"
            @click="onExport"
          >
            <VIcon left>
              tabler-download
            </VIcon>
            Xuất Dữ Liệu
          </VBtn>

          <VBtn
            color="primary"
            variant="elevated"
            size="small"
            prepend-icon="tabler-plus"
            @click="isAddReportDrawerOpen = !isAddReportDrawerOpen"
          >
            Thêm Mới
          </VBtn>
        </div>
      </div>
    </VCardText>

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
            <!-- Tiêu đề: chiếm không gian còn lại, có ellipsis -->
            <div
              :title="item.title"
    
              class="text-body-1"
            >
              {{ item.title }}
            </div>

            <!-- Badge "Danh Mục Khác" nếu có tag -->
            <!--
              <span
              v-if="item.tag"
              class="badge rounded-pill bg-red"
              :title="item.tag"
              color="primary"
              >
              {{ item.tag }}
              </span> 
            -->

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
              style="width: 120px;"
            >
              <!-- Thanh tiến trình -->
              <VProgressLinear
                :model-value="getCompletion(item)"
                color="error"
                height="8"
                rounded
                style="width: 100%;"
              />

              <!-- Số lượng đã xong / đang chờ -->
              <div class="d-flex align-md-center align-center justify-space-between text-caption mt-1">
                <span
                  class="d-flex align-center gap-1"
                  style="color: #22a05f;"
                >
                  <VIcon
                    class="d-flex align-center "
                    size="14"
                    color="success"
                  >tabler-check</VIcon>
                  {{ item.goodCount }}
                </span>

                <span
                  class="d-flex align-center gap-1"
                  style="color: #f59e0b;"
                >
                  <VIcon
                    size="14"
                    color="warning"
                  >tabler-clock</VIcon>
                  {{ item.pendingCount }}
                </span>
              </div>
            </div>

            <div
              class="d-flex align-center"
              style="gap:8px;"
            >
              <!-- Dialog cho Hoàn thành -->
              <VDialog
                v-model="dialogStates[item.id].done"
                width="320"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="15"
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

              <!-- Dialog cho Đang chờ -->
              <VDialog
                v-model="dialogStates[item.id].pending"
                width="320"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="15"
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

              <!-- Dialog cho Bị chặn / Không bị chặn -->
              <VDialog
                v-model="dialogStates[item.id].blocked"
                width="360"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="15"
                    :color="item.blocked ? 'error' : 'grey'"
                    class="status-ic error"
                    :title="item.blocked ? 'Chưa hoàn thành' : 'Không bị chặn'"
                    role="button"
                    tabindex="0"
                  >
                    tabler-file-off
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
            <!-- chip trạng thái (dùng progressLabel + progressLabelColor từ dữ liệu) -->
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
            title="Sửa"
            @click="onEdit(item)"
          >
            <VIcon
              color="primary"
              icon="tabler-edit"
              size="18"
            />
          </IconBtn>
          <IconBtn
            title="xem"
            @click="onEdit(item)"
          >
            <VIcon
              color="warning"
              icon="tabler-user-off"
              size="18"
            />
          </IconBtn>
          <IconBtn
            title="Nhân bản"
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
          <div class="px-6 py-4">
            <TablePagination
              v-model:page="page"
              :items-per-page="itemsPerPage"
              :total-items="reportData.length"
            />
          </div>
        </template>
      </VDataTable>
    </div>

    <ECommerceAddCategoryDrawer v-model:is-drawer-open="isAddReportDrawerOpen" />
  </VCard>
</template>

<style lang="scss" scoped>
// .report-table {
//   .v-table thead th:nth-last-child(2) .v-data-table-header__content,
//   .v-table tbody td:nth-last-child(2) {
//     justify-content: flex-end;
//   }

//   .v-table tbody td:nth-last-child(2) {
//     text-align: right;
//     /* stylelint-disable-next-line liberty/use-logical-spec */
//     padding-right: 1rem;
//   }
// }

// .status-chip {
//   display: inline-block;
//   /* stylelint-disable-next-line liberty/use-logical-spec */
//   padding: 4px 10px;
//   border-radius: 12px;
//   background-color: #e6f9ef;
//   color: #22a05f;
//   font-weight: 600;
// }

// .export-btn {
//   background-color: #fff6ea;
//   color: #d97706;
//   /* stylelint-disable-next-line order/properties-order */
//   border-radius: 8px;
//   box-shadow: none;
//   /* stylelint-disable-next-line order/properties-order */
//   border: 1px solid rgba(217, 119, 6, 0.12);
// }
</style>

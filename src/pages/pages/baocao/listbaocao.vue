/* stylelint-disable order/properties-order */
/* stylelint-disable order/properties-order */
/* stylelint-disable alpha-value-notation */
<script setup>
import { ref } from 'vue'
import ECommerceAddCategoryDrawer from '@/views/apps/ecommerce/ECommerceAddCategoryDrawer.vue'
import avatar from '@images/avatars/avatar-1.png'

// DỮ LIỆU MẪU CHO BẢNG BÁO CÁO
const reportData = ref([
  { id: 10, title: 'Báo cáo an toàn, an ninh thông tin 6 tháng 2 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '11:37 11/08/2025', status: 'Hoạt Động' },
  { id: 7, title: 'Báo cáo an toàn, an ninh thông tin 6 tháng 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '07:40 11/08/2025', status: 'Hoạt Động' },
  { id: 6, title: 'Báo cáo tình hình quản lý việc làm lao động trên địa bàn 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '17:35 07/08/2025', status: 'Hoạt Động' },
  { id: 5, title: 'Báo cáo giải ngân kinh phí người có công 2025', updatedBy: 'Quản trị hệ thống', updatedAt: '17:35 07/08/2025', status: 'Hoạt Động' },
  { id: 4, title: 'Báo cáo tình hình tiếp nhận hồ sơ cán bộ, công chức, viên chức', updatedBy: 'Quản trị hệ thống', updatedAt: '11:14 11/08/2025', status: 'Hoạt Động' },
  { id: 2, title: 'Báo cáo rà soát việc khắc côn đầu', updatedBy: 'Quản trị hệ thống', updatedAt: '11:14 11/08/2025', status: 'Hoạt Động' },
  { id: 1, title: 'Đăng ký thông tin người nhập dữ liệu giải quyết khó khăn, vướng mắc', updatedBy: 'Quản trị hệ thống', updatedAt: '17:35 07/08/2025', status: 'Hoạt Động' },
])

// header tương ứng (key phải khớp với các slot item.<key> nếu custom)
const headers = [
  { title: 'STT', key: 'stt', sortable: false },
  { title: 'TÊN MẪU BÁO CÁO', key: 'title' },
  { title: 'CẬP NHẬT', key: 'updated' },
  { title: 'TRẠNG THÁI', key: 'status' },
  { title: 'ID', key: 'id' },
  { title: 'HÀNH ĐỘNG', key: 'actions', sortable: false },
]

const itemsPerPage = ref(10)
const page = ref(1)
const isAddReportDrawerOpen = ref(false)

function onExport() {
  console.log('Xuất dữ liệu báo cáo...')
}

function onEdit(item) { console.log('edit', item) }
function onDuplicate(item) { console.log('duplicate', item) }
function onDelete(item) { console.log('delete', item) }
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between flex-wrap gap-4 w-100">
        <!-- left: items per page -->
        <div class="d-flex align-center gap-4">
          <AppSelect
            v-model="itemsPerPage"
            :items="[5, 10, 15]"
            style="max-inline-size: 100px; min-inline-size: 100px;"
          />
        </div>

        <VSpacer />

        <!-- right controls -->
        <div class="d-flex align-center gap-3">
          <!-- dùng class export-btn để style chính xác -->
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
        <!-- STT: hiển thị index (1-based theo page) -->
        <template #item.stt="{ index }">
          <div>{{ (page - 1) * itemsPerPage + index + 1 }}</div>
        </template>

        <!-- Tên mẫu báo cáo -->
        <template #item.title="{ item }">
          <div class="text-body-1">
            {{ item.title }}
          </div>
        </template>

        <!-- Cập nhật: hiển thị người + thời gian -->
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

        <!-- Trạng thái: chip nhỏ -->
        <template #item.status="{ item }">
          <div><span class="status-chip">{{ item.status }}</span></div>
        </template>

        <!-- ID: thêm class để căn phải -->
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
.report-table {

  /* căn phải cho cột số (ID) bằng cách chọn 2nd-from-last column
     (an toàn khi có checkbox làm cột đầu) */
  .v-table thead th:nth-last-child(2) .v-data-table-header__content,
  .v-table tbody td:nth-last-child(2) {
    justify-content: flex-end;
  }

  .v-table tbody td:nth-last-child(2) {
    text-align: right;
    /* stylelint-disable-next-line liberty/use-logical-spec */

    padding-right: 1rem;
  }
}

/* status chip giống ảnh (xanh nhạt) */
.status-chip {
  display: inline-block;
  /* stylelint-disable-next-line liberty/use-logical-spec */
  padding: 4px 10px;
  border-radius: 12px;
  background-color: #e6f9ef;
  color: #22a05f;
  font-weight: 600;
}

/* export button: tông warning / cam nhẹ */
.export-btn {
  background-color: #fff6ea;
  /* nền cam nhạt */
  color: #d97706;
  /* chữ cam đậm */
  /* stylelint-disable-next-line order/properties-order */
  border-radius: 8px;
  box-shadow: none;
  /* stylelint-disable-next-line order/properties-order */
  border: 1px solid rgba(217, 119, 6, 0.12);
}
</style>

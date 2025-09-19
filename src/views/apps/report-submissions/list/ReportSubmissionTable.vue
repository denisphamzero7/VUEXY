<template>
  <VDataTable
    v-model="localSelected"
    :headers="headers"
    :items="fakeReportSubmissions"
    :loading="false"
    :items-length="fakeReportSubmissions.length"
    :items-per-page="10"
    :page="1"
    show-select
    item-value="id"
    class="text-no-wrap"
  >
    <!-- Index -->
    <template #item.index="{ index }">
      <div class="text-body-1">
        {{ index + 1 }}
      </div>
    </template>

    <!-- Tên đợt báo cáo -->
    <template #item.report_batch.name="{ item }">
      <div class="d-flex align-center gap-2 mt-1">
        <VTooltip location="top">
          <template #activator="{ props }">
            <div
              v-bind="props"
              class="text-body-1 font-weight-medium text-truncate"
              style="max-width: 240px"
            >
              {{ item.report_batch?.name || "-" }}
            </div>
          </template>
          <span>{{ item.report_batch?.name }}</span>
        </VTooltip>
      </div>
    </template>

    <!-- Đơn vị báo cáo -->
    <template #item.user.name="{ item }">
      <div class="text-body-2">
        {{ item.user?.name || "-" }}
      </div>
    </template>

    <!-- Tỷ lệ hoàn thành -->
    <template #item.completion_rate="{ item }">
      <div class="d-flex align-center gap-2">
        <VProgressLinear
          :model-value="item.completion_rate"
          color="primary"
          height="8"
          rounded
          style="flex: 1; max-width: 180px"
        />
        <span class="text-sm">{{ item.completion_rate }}%</span>
      </div>
    </template>

    <!-- Cập nhật -->
    <template #item.updated_at="{ item }">
      <div class="d-flex align-center gap-x-2">
        <VAvatar
          size="34"
          variant="tonal"
          color="warning"
        >
          <span>A</span>
        </VAvatar>
        <div>
          <div class="text-body-2 font-weight-medium">
            {{ item?.updated_by?.name || "-" }}
          </div>
          <div class="text-caption text-disabled">
            <div>{{ item.updated_at }}</div>
          </div>
        </div>
      </div>
    </template>

    <!-- Trạng thái -->
    <template #item.status="{ item }">
      <VChip
        color="grey"
        size="small"
        label
        class="text-capitalize"
      >
        Đang Yêu Cầu
      </VChip>
    </template>

    <!-- ID -->
    <template #item.id="{ item }">
      {{ item.id }}
    </template>

    <!-- Hành động (chỉ UI) -->
    <template #item.actions="{ item }">
      <div class="d-flex justify-center gap-1">
        <IconBtn
          color="primary"
          variant="text"
          size="20"
        >
          <VIcon icon="tabler-pencil" />
        </IconBtn>

        <IconBtn
          color="info"
          variant="text"
          size="20"
        >
          <VIcon icon="tabler-info-circle" />
        </IconBtn>

        <IconBtn
          color="secondary"
          variant="text"
          size="20"
        >
          <VIcon icon="tabler-message-circle" />
        </IconBtn>

        <IconBtn
          color="default"
          variant="text"
          size="20"
        >
          <VIcon icon="tabler-download" />
        </IconBtn>
      </div>
    </template>

    <!-- No Data -->
    <template #no-data>
      <div class="text-center py-4">
        Không có dữ liệu
      </div>
    </template>

    <!-- Pagination (giao diện tĩnh) -->
    <template #bottom>
      <VDivider />
      <VCardText class="pt-1 pb-2">
        <div
          class="d-flex flex-column flex-sm-row align-center justify-sm-space-between mt-1"
          :class="$vuetify.display.smAndDown ? 'gap-0' : 'gap-3'"
        >
           <AppSelect
                :items="[5, 10, 15]"
                style="max-inline-size: 100px; min-inline-size: 100px;"
              />

          <div
            v-if="!$vuetify.display.smAndDown"
            class="d-flex align-center gap-4"
          >
            <p class="text-disabled mb-0 d-none d-md-block text-sm">
              Hiển thị 1 - {{ fakeReportSubmissions.length }} của {{ fakeReportSubmissions.length }}
            </p>

            <VPagination
              :length="1"
              :total-visible="5"
            />
          </div>
        </div>
      </VCardText>
    </template>
  </VDataTable>
</template>

<script setup>
import { ref } from "vue"

/* Dữ liệu giả tĩnh để hiển thị giao diện */
const fakeReportSubmissions = [
  {
    id: 603,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Phước Hiệp CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 602,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Phước Thành CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 601,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Phước Chánh CCHC" },

    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 600,
  
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Phước Năng CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 599,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Khâm Đức CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 598,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Phước Trà CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 597,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Việt An CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 595,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Hùng Sơn CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
  {
    id: 594,
    report_batch: { name: "Báo cáo kết quả thực hiện nhiệm vụ CCHC" },
    user: { name: "Xã Tây Giang CCHC" },
    completion_rate: 0,
    updated_by: { name: "A", avatar: null },
    updated_at: "19:44 26/08/2025",
    status: "pending",
  },
]

/* Header tĩnh */
const headers = [
  { title: "STT", key: "index", sortable: false, width: "30px" },
  { title: "Tên đợt báo cáo", key: "report_batch.name", sortable: false },
  { title: "Đơn vị báo cáo", key: "user.name", sortable: false },
  { title: "Tỷ lệ hoàn thành", key: "completion_rate", sortable: false },
  { title: "Cập nhật", key: "updated_at", sortable: true },
  { title: "Trạng thái", key: "status", sortable: true },
  { title: "ID", key: "id", sortable: true, width: "30px" },
  { title: "Hành động", key: "actions", sortable: false, align: "center" },
]

/* nhỏ để hiển thị checkbox (không có logic phía sau) */
const localSelected = ref([])
</script>

<style scoped>
.v-data-table table tbody tr td {
  word-break: break-all;
}

.v-data-table table tbody tr td:first-child {
  padding-inline-start: 8px !important;
}
</style>

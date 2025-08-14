<script setup>
const itemsPerPage = ref(5)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const { data: vehiclesData } = await useApi(createUrl('/apps/logistics/vehicles', {
  query: {
    page,
    itemsPerPage,
    sortBy,
    orderBy,
  },
}))

const vehicles = computed(() => vehiclesData.value.vehicles)
const totalVehicles = computed(() => vehiclesData.value.totalVehicles)

const headers = [
  {
    title: 'VỊ TRÍ',
    key: 'location',
  },
  {
    title: 'LỘ TRÌNH BẮT ĐẦU',
    key: 'startRoute',
  },
  {
    title: 'LỘ TRÌNH KẾT THÚC',
    key: 'endRoute',
  },
  {
    title: 'CẢNH BÁO',
    key: 'warnings',
  },
  {
    title: 'TIẾN ĐỘ',
    key: 'progress',
  },
]

const resolveChipColor = warning => {
  if (warning === 'No Warnings')
    return 'success'
  if (warning === 'fuel problems')
    return 'primary'
  if (warning === 'Temperature Not Optimal')
    return 'warning'
  if (warning === 'Ecu Not Responding')
    return 'error'
  if (warning === 'Oil Leakage')
    return 'info'
}

/**
 * Hiển thị nhãn tiếng Việt cho các cảnh báo đã biết.
 * Nếu API trả về giá trị mới/không xác định, sẽ hiển thị nguyên bản để tránh mismatch.
 */
const getWarningLabel = warning => {
  if (warning === 'No Warnings') return 'Không có cảnh báo'
  if (warning === 'fuel problems') return 'Sự cố nhiên liệu'
  if (warning === 'Temperature Not Optimal') return 'Nhiệt độ không tối ưu'
  if (warning === 'Ecu Not Responding') return 'ECU không phản hồi'
  if (warning === 'Oil Leakage') return 'Rò rỉ dầu'
  return warning
}
</script>

<template>
  <VCard>
    <VCardItem title="Xe đang trên đường">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>

    <VDivider />
    <VDataTableServer
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items-per-page-options="[
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 20, title: '20' },
        { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
      ]"
      :items-length="totalVehicles"
      :items="vehicles"
      item-value="location"
      :headers="headers"
      show-select
      class="text-no-wrap"
      @update:options="updateOptions"
    >
      <template #item.location="{ item }">
        <VAvatar
          variant="tonal"
          color="secondary"
          class="me-4"
          size="40"
        >
          <VIcon
            icon="tabler-car"
            size="28"
          />
        </VAvatar>
        <RouterLink :to="{ name: 'apps-logistics-fleet' }">
          <div class="text-link text-base font-weight-medium d-inline-block">
            VOL-{{ item.location }}
          </div>
        </RouterLink>
      </template>

      <template #item.startRoute="{ item }">
        {{ item.startCity }}, {{ item.startCountry }}
      </template>

      <template #item.endRoute="{ item }">
        {{ item.endCity }}, {{ item.endCountry }}
      </template>

      <template #item.warnings="{ item }">
        <VChip
          :color="resolveChipColor(item.warnings)"
          label
          size="small"
        >
          {{ getWarningLabel(item.warnings) }}
        </VChip>
      </template>

      <template #item.progress="{ item }">
        <div
          class="d-flex align-center gap-x-4"
          style="min-inline-size: 240px;"
        >
          <div class="w-100">
            <VProgressLinear
              :model-value="item.progress"
              rounded
              color="primary"
              :height="8"
            />
          </div>
          <div>
            {{ item.progress }}%
          </div>
        </div>
      </template>

      <!-- pagination -->
      <template #bottom>
        <TablePagination
          v-model:page="page"
          :items-per-page="itemsPerPage"
          :total-items="totalVehicles"
        />
      </template>
    </VDataTableServer>
  </VCard>
</template>

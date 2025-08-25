<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePermissionsStore } from '@core/stores/permissions' // path theo project của bạn

// UI headers
const headers = [
  { title: 'Tên quyền', key: 'name' },
  { title: 'Phương pháp', key: 'method', sortable: false  },
  { title: 'Đường dẫn', key: 'apiPath', sortable: false },
  { title: 'Thuộc quyền', key: 'assigned_roles', sortable: false },
  { title: 'Ngày tạo', key: 'createdAt', sortable: false },
  { title: 'Hành động', key: 'actions', sortable: false },
]

// local reactive
const isPermissionDialogVisible = ref(false)
const isAddPermissionDialogVisible = ref(false)
const permissionName = ref('') // truyền cho dialog khi edit
const search = ref('')

// store
const permissionStore = usePermissionsStore()

// map store state -> computed / two-way binding
const permissions = computed(() => permissionStore.permissions)
const loading = computed(() => permissionStore.loading)
const error = computed(() => permissionStore.error)
const totalPermissions = computed(() => permissionStore.totalItems)

// page & itemsPerPage bindings to store currentPage & limit
const page = computed({
  get: () => permissionStore.currentPage,
  set: v => {
    // đảm bảo là số
    permissionStore.currentPage = Number(v)
  },
})

const itemsPerPage = computed({
  get: () => permissionStore.limit,
  set: v => {
    // limit có thể -1 cho "All"
    permissionStore.limit = Number(v)
  },
})

// sorting placeholder (nếu cần gửi lên backend sau)
const sortBy = ref(null)
const orderBy = ref(null)

// cập nhật options từ VDataTableServer (nếu dùng)
const updateOptions = options => {
  sortBy.value = options.sortBy?.[0]?.key
  orderBy.value = options.sortBy?.[0]?.order

  // bạn có thể trigger fetch với sortBy/orderBy nếu backend hỗ trợ
  // hiện tại sẽ chỉ fetch lại page 1
  permissionStore.currentPage = 1
  fetchPermissions()
}

// debounce search
let searchTimer = null

const onSearchChange = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    // cập nhật từ khóa trong store nếu bạn muốn dùng keyWord store
    // store có keyWord nhưng fetchPermissions chấp nhận page param
    permissionStore.keyWord = search.value
    permissionStore.currentPage = 1
    fetchPermissions()
  }, 400)
}

// fetch wrapper
const fetchPermissions = async () => {
  try {
    await permissionStore.fetchPermissions(permissionStore.currentPage)
  } catch (e) {
    console.error('fetchPermissions error', e)
  }
}

// edit / add handlers
const editPermission = async name => {
  permissionName.value = name
  isPermissionDialogVisible.value = true
}

const openAddPermission = () => {
  isAddPermissionDialogVisible.value = true
}

const onPermissionCreated = async () => {
  // refresh after created
  await fetchPermissions()
}

const onPermissionUpdated = async () => {
  await fetchPermissions()
}

// delete with confirm
const removePermission = async id => {
  const confirmed = window.confirm('Bạn có chắc muốn xóa permission này?')
  if (!confirmed) return
  const ok = await permissionStore.removePermission(id)
  if (ok) {
    // optionally show toast
  } else {
    // lỗi đã lưu trong store.error
    console.warn('Xóa thất bại', permissionStore.error)
  }
}

// watch page / itemsPerPage to auto-fetch
watch(
  () => permissionStore.currentPage,
  (newVal, oldVal) => {
    if (newVal !== oldVal) fetchPermissions()
  },
)

watch(
  () => permissionStore.limit,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      // reset page to 1 khi thay đổi limit
      permissionStore.currentPage = 1
      fetchPermissions()
    }
  },
)

// initial load
onMounted(() => {
  // ensure store.keyWord sync with search initial
  permissionStore.keyWord = search.value
  fetchPermissions()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex align-center justify-space-between flex-wrap gap-4">
          <div class="d-flex gap-2 align-center">
            <p class="text-body-1 mb-0">
              Show
            </p>

            <AppSelect
              :model-value="itemsPerPage"
              :items="[
                { value: 5, title: '5' },
                { value: 10, title: '10' },
                { value: 25, title: '25' },
                { value: 50, title: '50' },
                { value: -1, title: 'All' },
              ]"
              style="inline-size: 5.5rem;"
              @update:model-value="val => itemsPerPage = parseInt(val, 10)"
            />
          </div>

          <div class="d-flex align-center gap-4 flex-wrap">
            <AppTextField
              v-model="search"
              placeholder="Search Permission"
              style="inline-size: 15.625rem;"
              @input="onSearchChange"
            />

            <VBtn
              density="default"
              prepend-icon="tabler-plus"
              @click="openAddPermission"
            >
              Add Permission
            </VBtn>
          </div>
        </VCardText>

        <VDivider />

        <!-- Data table server-side -->
        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :items-length="totalPermissions"
          :items-per-page-options="[
            { value: 5, title: '5' },
            { value: 10, title: '10' },
            { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
          ]"
          :headers="headers"
          :items="permissions"
          item-value="name"
          class="text-no-wrap"
          @update:options="updateOptions"
        >
          <!-- Name -->
          <template #item.name="{ item }">
            <div class="text-high-emphasis text-body-1">
              {{ item.name }}
            </div>
          </template>
          

          <!-- Assigned To -->
          <template #item.assignedTo="{ item }">
            <div class="d-flex gap-4">
              <VChip
                v-for="text in item.assignedTo"
                :key="text"
                label
                size="small"
                :color=" (colors[text] && colors[text].color) || 'secondary' "
                class="font-weight-medium"
              >
                {{ (colors[text] && colors[text].text) || text }}
              </VChip>
            </div>
          </template>
          <template #item.apiPath="{ item }">
            <div class="text-high-emphasis text-body-1">
              {{ item.apiPath||'deos co' }}
            </div>
          </template>

          <template #item.assigned_roles="{ item }">
            <div class="d-flex gap-2 align-center">
              <VBadge
                v-for="(role) in item.assignedRoles.slice(0,3)"
                :key="role.id"
                :content="role.name"
                color="primary"
                inline
                class="mb-1"
              />
            </div>
          </template>
          <template #item.createdAt="{ item }">
            <div class="text-high-emphasis text-body-1">
              {{ formatDate(item?.createdAt)||'deos co' }}
            </div>
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <VBtn
              icon
              size="small"
              color="medium-emphasis"
              variant="text"
              @click="editPermission(item.name)"
            >
              <VIcon
                size="22"
                icon="tabler-edit"
              />
            </VBtn>

            <IconBtn @click="removePermission(item._id || item.id)">
              <VIcon
                icon="tabler-trash"
                size="22"
              />
            </IconBtn>
          </template>

          <template #bottom>
            <TablePagination
              v-model:page="page"
              :items-per-page="itemsPerPage"
              :total-items="totalPermissions"
            />
          </template>
        </VDataTableServer>

        <!-- Loading & Error -->
        <VOverlay
          v-if="loading"
          class="align-center justify-center"
        >
          <VProgressCircular
            indeterminate
            size="48"
          />
        </VOverlay>

        <VAlert
          v-if="error"
          type="error"
          class="mt-4"
          closable
        >
          {{ error }}
        </VAlert>
      </VCard>

      <!-- Dialogs -->
      <!-- Edit dialog: dialog nội bộ nên gọi API cập nhật trong dialog và emit sự kiện khi xong -->
      <AddEditNewPermissionDialog
        v-model:is-dialog-visible="isPermissionDialogVisible"
        v-model:permission-name="permissionName"
        @permission-updated="onPermissionUpdated"
      />

      <!-- Add dialog -->
      <AddEditNewPermissionDialog
        v-model:is-dialog-visible="isAddPermissionDialogVisible"
        @permission-created="onPermissionCreated"
      />
    </VCol>
  </VRow>
</template>

<style scoped>
/* tuỳ chỉnh nhỏ cho avatar group / chips nếu cần */
</style>

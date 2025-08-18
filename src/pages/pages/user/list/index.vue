<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@core/stores/user'

const router = useRouter()
const userStore = useUserStore()

// table headers (giữ nguyên hoặc chỉnh key tuỳ backend)
const headers = [
  { title: 'ID', key: '_id' }, // backend trả _id
  { title: 'Họ tên', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// local state
const searchQuery = ref('')
const selectedRows = ref([])

let debounceTimer = null
const DEBOUNCE_MS = 400

// sync search -> store.keyWord (server expects name param handled in store.fetchUsers)
watch(
  searchQuery,
  () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      userStore.keyWord = searchQuery.value.trim()

      // reset về trang 1 khi search
      userStore.fetchUsers(1)
    }, DEBOUNCE_MS)
  },
)

// cleanup
onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

// expose store loading / error
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)

// users + pagination from store
const users = computed(() => userStore.users ?? [])
const totalUsers = computed(() => userStore.totalItems ?? users.value.length)

// page computed (two-way binding with table)
const page = computed({
  get: () => userStore.currentPage ?? 1,
  set: val => {
    // validate and delegate to store
    userStore.goToPage(val)
  },
})

// items per page mapped to store.limit
const itemsPerPage = computed({
  get: () => userStore.limit ?? 10,
  set: val => {
    userStore.limit = val

    // refetch from page 1 after change limit
    userStore.fetchUsers(1)
  },
})

// watch store.currentPage and store.limit to fetch when changed externally
watch(
  () => userStore.currentPage,
  n => {
    // ensure fetch for new page
    userStore.fetchUsers(n ?? 1)
  },
)
watch(
  () => userStore.limit,
  () => {
    userStore.fetchUsers(1)
  },
)

// initial fetch on mount
onMounted(() => {
  userStore.fetchUsers(userStore.currentPage ?? 1)
})

// navigation to edit page
const goToEdit = id => {
  router.push(`/users/${id}`)
}

// delete user (optimistic handled in store.RemoveUser)
const deleteUser = async id => {
  try {
    const ok = await userStore.RemoveUser(id)
    if (ok) {
      // refetch current page to keep data consistent
      userStore.fetchUsers(userStore.currentPage ?? 1)
    } else {
      console.warn('Xoá không thành công')
    }
  } catch (err) {
    console.error('Delete user error:', err)
  }
}
</script>

<template>
  <div>
    <VCard class="mb-6">
      <VCardText class="px-3">
        <h3 class="text-h5">
          👥 Quản lý người dùng
        </h3>
      </VCardText>
    </VCard>

    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <div class="d-flex flex-wrap gap-4">
          <AppTextField
            v-model="searchQuery"
            placeholder="Tìm kiếm user..."
            style="inline-size: 250px;"
          />
        </div>
      </VCardText>

      <VDivider />

      <VDataTable
        v-model:items-per-page="itemsPerPage"
        v-model:model-value="selectedRows"
        v-model:page="page"
        :headers="headers"
        :items="users"
        :items-length="totalUsers"
        show-select
        class="text-no-wrap"
      >
        <template #item.status="{ item }">
          <VChip
            :color="item.status ? 'success' : 'error'"
            size="small"
            label
          >
            {{ item.status ? "Hoạt động" : "Khoá" }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <IconBtn @click="$router.push(`/users/${item._id}`)">
            <VIcon icon="tabler-edit" />
          </IconBtn>

          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  value="delete"
                  prepend-icon="tabler-trash"
                  @click="deleteUser(item._id)"
                >
                  Xoá
                </VListItem>
              </VList>
            </VMenu>
          </IconBtn>
        </template>

        <template #bottom>
          <TablePagination
            v-model:page="page"
            :items-per-page="itemsPerPage"
            :total-items="totalUsers"
          />
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

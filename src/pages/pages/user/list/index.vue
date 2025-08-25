<template>
  <div>
    <VProgressLinear
      v-if="isLoading"
      color="primary"
      indeterminate
      size="64"
    />



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
            :disabled="isLoading"
          />
        </div>
      </VCardText>

      <VDivider />

      <VDataTable
      

        v-model:items-per-page="itemsPerPage"
        v-model:page="page"

        :item-key="_id"

        :headers="headers"
        :items="users"
        :items-length="totalUsers"
        show-select
        class="text-no-wrap"
      >
        <!-- Name column with avatar-like display -->
        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="32"
              :color="!item.avatar ? 'primary' : ''"
              :variant="!item.avatar ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.avatar"
                :src="item.avatar"
              />
              <span v-else>{{ initials(item.name) }}</span>
            </VAvatar>
            <div class="d-flex flex-column ms-3">
              <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.name }}</span>
              <small class="text-muted">{{ item.address || '' }}</small>
            </div>
          </div>
        </template>

        <template #item.role="{ item }">
          {{ (item?.role && item.role?.name) || item.role || '—' }}
        </template>

        <template #item.company="{ item }">
          {{ (item.company && (item.company.name || item.company.title)) || item.companyId || '—' }}
        </template>

        <template #item.status="{ item }">
          <VChip
            :color="item.status ? 'success' : 'error'"
            size="small"
            label
          >
            {{ item.status ? 'Hoạt động' : 'Khoá' }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <IconBtn
              color="primary"
              :disabled="isLoading"
              @click="editItem(item)"
            >
              <VIcon icon="tabler-edit" />
            </IconBtn>
            <IconBtn
              color="error"
              :disabled="isLoading"
              @click="confirmDeleteDialog(item._id ?? item.id)"
            >
              <VIcon icon="tabler-trash" />
            </IconBtn>
            <IconBtn
              title="Mở trang chi tiết"
              color="success"
              :to="{ name: 'pages-user-detailuser-id', params: { id: item._id ?? item.id } }"
              :disabled="isLoading"
            >
              <VIcon icon="tabler-eye" />
            </IconBtn>
          </div>
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

    <!-- Edit Dialog -->
    <VDialog
      v-model="editDialog"
      max-width="720"
      :persistent="saving"
    >
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <div>
            <h3 class="text-h6 mb-0">
              Chỉnh sửa người dùng
            </h3>
            <div class="text-caption">
              ID: {{ editedId || '—' }}
            </div>
          </div>

          <div class="d-flex gap-2">
            <VBtn
              text
              :disabled="saving"
              @click="closeEditDialog"
            >
              Đóng
            </VBtn>
          </div>
        </VCardTitle>

        <VCardText>
          <div class="max-w-lg mx-auto p-2">
            <VForm @submit.prevent="saveEdit">
              <AppTextField
                v-model="editedItem.name"
                label="Họ tên"
                placeholder="Nhập tên"
                :disabled="saving"
              />
              <AppTextField
                v-model="editedItem.email"
                label="Email"
                type="email"
                placeholder="Nhập email"
                :disabled="saving"
              />
              <AppTextField
                v-model="editedItem.password"
                label="Mật khẩu (để trống nếu không đổi)"
                type="password"
                :disabled="saving"
              />
              <AppTextField
                v-model="editedItem.phone"
                label="SĐT"
                type="text"
                :disabled="saving"
              />
              <AppTextField
                v-model="editedItem.age"
                label="Tuổi"
                type="number"
                :disabled="saving"
              />

              <div class="mb-4">
                <label class="d-block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                <select
                  v-model="editedItem.gender"
                  class="w-full border-gray-300 rounded p-2"
                  :disabled="saving"
                >
                  <option
                    disabled
                    value=""
                  >
                    Chọn giới tính
                  </option>
                  <option value="male">
                    Nam
                  </option>
                  <option value="female">
                    Nữ
                  </option>
                </select>
              </div>

              <AppTextField
                v-model="editedItem.address"
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                :disabled="saving"
              />

              <div class="mb-4">
                <label class="d-block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                <select
                  v-model="editedItem.role"
                  class="w-full border-gray-300 rounded p-2"
                  :disabled="saving || !roles.length"
                >
                  <option
                    disabled
                    value=""
                  >
                    Chọn vai trò
                  </option>
                  <option
                    v-for="r in roles"
                    :key="r._id"
                    :value="r._id"
                  >
                    {{ r.name }}
                  </option>
                </select>
              </div>

              <div class="mb-4">
                <label class="d-block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                <select
                  v-model="editedItem.companyId"
                  class="w-full border-gray-300 rounded p-2"
                  :disabled="saving || !companies.length"
                >
                  <option
                    disabled
                    value=""
                  >
                    Chọn công ty
                  </option>
                  <option
                    v-for="c in companies"
                    :key="c._id"
                    :value="c._id"
                  >
                    {{ c.name }}
                  </option>
                </select>
              </div>

              <div
                v-if="errors"
                class="text-error mb-3"
              >
                {{ errors }}
              </div>

              <div class="d-flex gap-3 mt-4">
                <VBtn
                  text
                  :disabled="saving"
                  @click="closeEditDialog"
                >
                  Huỷ
                </VBtn>
                <VSpacer />
                <VBtn
                  color="primary"
                  type="submit"
                  :loading="saving"
                >
                  Lưu thay đổi
                </VBtn>
              </div>
            </VForm>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Delete Dialog -->
    <VDialog
      v-model="deleteDialog"
      max-width="420"
      :persistent="deleting"
    >
      <VCard title="Xác nhận xoá người dùng">
        <VCardText>
          <div class="mb-4">
            Bạn có chắc muốn xoá user với ID: <strong>{{ deleteId }}</strong> ?
          </div>
          <div class="d-flex justify-center gap-4">
            <VBtn
              color="secondary"
              variant="outlined"
              :disabled="deleting"
              @click="closeDeleteDialog"
            >
              Huỷ
            </VBtn>
            <VBtn
              color="error"
              variant="elevated"
              :loading="deleting"
              @click="deleteUserConfirm"
            >
              Xoá
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import { useUserStore } from '@core/stores/user'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// Headers mapping to user fields
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Company', key: 'company' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// search
const searchQuery = ref('')
const DEBOUNCE_MS = 350
let searchTimer = null

// expose store data
const users = computed(() => userStore.users ?? [])
const totalUsers = computed(() => Number(userStore.totalItems ?? users.value.length ?? 0))

// Combine global store loading and local operation loading flags into a single source of truth
const saving = ref(false)
const deleting = ref(false)
const isLoading = computed(() => Boolean(userStore.loading) || saving.value || deleting.value)

// pagination: computed two-way bound to store
let pageLock = false

const page = computed({
  get() {
    return Number(userStore.currentPage ?? 1)
  },
  set(val) {
    const next = Number(val) || 1
    if (next === Number(userStore.currentPage ?? 1)) return
    if (pageLock) return
    pageLock = true
    userStore.fetchUsers(next).finally(() => {
      pageLock = false
    })
  },
})

let limitLock = false

const itemsPerPage = computed({
  get() {
    return Number(userStore.limit ?? 10)
  },
  set(val) {
    const next = Number(val) || 10
    if (next === Number(userStore.limit ?? 10)) return
    if (limitLock) return
    limitLock = true
    userStore.limit = next
    userStore.fetchUsers(1).finally(() => {
      limitLock = false
    })
  },
})

// debounce search watcher
watch(searchQuery, v => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    userStore.keyWord = (v || '').trim()
    userStore.fetchUsers(1).catch(e => console.error(e))
    searchTimer = null
  }, DEBOUNCE_MS)
})

// initial load
onMounted(async () => {
  if (!userStore.limit) userStore.limit = 10
  await userStore.fetchUsers(Number(userStore.currentPage ?? 1))

  // prefetch roles/companies for selects (non-blocking)
  userStore.fetchRoles().then(r => {}).catch(() => {})
  userStore.fetchCompanies().then(c => {}).catch(() => {})
})

// helpers
const initials = (name = '') => {
  if (!name) return ''
  
  return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

// navigation helper (optional)
const goToEditRoute = id => {
  if (!id) return
  router.push(`name: detailuser/${id}`)
}

/* ------------------ edit dialog ------------------ */
const editDialog = ref(false)
const editedId = ref(null)

const editedItem = reactive({
  _id: '',
  name: '',
  email: '',
  password: '',
  age: null,
  phone: '',
  gender: '',
  address: '',
  role: '',
  companyId: '',
  avatar: '',
  status: false,
})

const errors = ref(null)

const roles = ref([])
const companies = ref([])

async function editItem(item) {
  // open and populate
  editedId.value = item._id ?? item.id
  errors.value = null
  editDialog.value = true

  // ensure selects loaded
  if (!roles.value.length) {
    try { roles.value = (await userStore.fetchRoles()) || [] } catch(e){ console.warn(e) }
  }
  if (!companies.value.length) {
    try { companies.value = (await userStore.fetchCompanies()) || [] } catch(e){ console.warn(e) }
  }

  // fetch full user data (in case list lacks fields)
  try {
    const data = await userStore.fetchUserById(String(editedId.value))
    if (!data) {
      errors.value = `Không tìm thấy người dùng ${editedId.value}`

      return

    }

    // hydrate editedItem
    editedItem._id = data._id ?? data.id ?? editedId.value
    editedItem.name = data.name ?? ''
    editedItem.email = data.email ?? ''
    editedItem.password = '' // don't prefill
    editedItem.age = data.age ?? null
    editedItem.phone = data.phone ?? ''
    editedItem.gender = data.gender ?? ''
    editedItem.address = data.address ?? ''
    editedItem.role = data.role?._id ?? data.role ?? ''
    editedItem.companyId = data.company?._id ?? data.companyId ?? ''
    editedItem.avatar = data.avatar ?? ''
    editedItem.status = data.status ?? false
  } catch (e) {
    console.error('fetchUserById error', e)
    errors.value = userStore.error || (e && e.message) || 'Lỗi khi tải user'
  }
}

function closeEditDialog() {
  if (saving.value) return // prevent closing while saving
  editDialog.value = false
  editedId.value = null
  errors.value = null

  // reset editedItem
  editedItem._id = ''
  editedItem.name = ''
  editedItem.email = ''
  editedItem.password = ''
  editedItem.age = null
  editedItem.phone = ''
  editedItem.gender = ''
  editedItem.address = ''
  editedItem.role = ''
  editedItem.companyId = ''
  editedItem.avatar = ''
  editedItem.status = false
}

async function saveEdit() {
  errors.value = null
  if (!editedItem.name?.trim() || !editedItem.email?.trim()) {
    errors.value = 'Vui lòng nhập tên và email.'

    return

  }
  if (!editedId.value) {
    errors.value = 'Missing user id'

    return

  }

  saving.value = true
  try {
    const payload = {
      name: (editedItem.name || '').trim(),
      email: (editedItem.email || '').trim(),
      ...(editedItem.password ? { password: editedItem.password } : {}),
      age: editedItem.age,
      phone: editedItem.phone,
      gender: editedItem.gender,
      address: (editedItem.address || '').trim(),
      role: editedItem.role,
      company: {
        _id: editedItem.companyId,
        name: (companies.value.find(c => c._id === editedItem.companyId) || {}).name || '',
      },
      status: editedItem.status||undefined,
      avatar: editedItem.avatar || undefined,
    }

    const res = await userStore.updateUser(String(editedId.value), payload)
    if (res) {
      await userStore.fetchUsers(Number(userStore.currentPage ?? 1))
      closeEditDialog()
    } else {
      errors.value = userStore.error?.message || 'Không thể cập nhật người dùng'
    }
  } catch (e) {
    console.error('updateUser error', e)
    errors.value = userStore.error?.message || (e && e.message) || 'Lỗi khi cập nhật'
  } finally {
    saving.value = false
  }
}

/* ------------------ delete dialog ------------------ */
const deleteDialog = ref(false)
const deleteId = ref(null)

function confirmDeleteDialog(id) {
  deleteId.value = id
  deleteDialog.value = true
}

function closeDeleteDialog() {
  if (deleting.value) return
  deleteDialog.value = false
  deleteId.value = null
}

async function deleteUserConfirm() {
  if (!deleteId.value) return
  deleting.value = true
  try {
    const ok = await userStore.RemoveUser(deleteId.value)
    if (ok) {
      await userStore.fetchUsers(Number(userStore.currentPage ?? 1))
      closeDeleteDialog()
    } else {
      console.error('Không xóa được', userStore.error)
    }
  } catch (e) {
    console.error('Delete error', e)
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.text-error { color: #d32f2f; }
</style>

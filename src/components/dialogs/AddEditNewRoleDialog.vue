<script setup>
import { ref, onMounted, watch } from 'vue'
import { usePermissionsStore } from '@core/stores/permissions'
import { useRoleStore } from '@core/stores/role'

// props & emits
const props = defineProps({
  rolePermissions: {
    type: Object,
    required: false,
    default: () => ({ name: '', permissions: [], description: '', isActive: true }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'role-saved']) // emit role-saved after success

// stores
const permissionStore = usePermissionsStore()
const roleStore = useRoleStore()

// local state
const role = ref('')
const description = ref('')
const isActive = ref(true)
const permissionsList = ref([]) // [{ _id, name }]
const selectedPermissionIds = ref([]) // array of string ids
const loadingPerms = ref(false)
const errorPerms = ref('')
const errorMessage = ref('')
const refForm = ref(null)
const submitting = ref(false)

// normalize various shapes returned by permission API/store
function normalizePermissions(raw) {
  let arr = []
  if (!raw) arr = []
  else if (Array.isArray(raw)) arr = raw
  else if (raw.value && Array.isArray(raw.value)) arr = raw.value
  else if (raw.data && Array.isArray(raw.data)) arr = raw.data
  else if (raw.data && raw.data.data && Array.isArray(raw.data.data)) arr = raw.data.data
  else arr = []

  return arr.map(p => ({
    _id: p?._id ?? p?.id ?? null,
    name: p?.name ?? p?.title ?? p?.apiPath ?? 'Unknown',
  })).filter(x => x._id && x.name)
}

// helper: extract ids from rolePermissions.permissions (could be array of ids or objects)
function extractIdsFromPermissions(arr) {
  if (!Array.isArray(arr)) return []
  
  return arr
    .map(item => {
      if (!item) return null
      if (typeof item === 'string') return item
      
      return item._id ?? item.id ?? null
    })
    .filter(Boolean)
    .map(id => String(id))
}

// load permissions from store/API
async function loadPermissions() {
  loadingPerms.value = true
  errorPerms.value = ''
  try {
    if (permissionStore.fetchPermissions) await permissionStore.fetchPermissions()
    const raw = permissionStore.permissions ?? []
    const normalized = normalizePermissions(raw)

    permissionsList.value = normalized
  } catch (e) {
    console.warn('Lỗi fetch permissions', e)
    errorPerms.value = 'Không lấy được danh sách quyền'
    permissionsList.value = []
  } finally {
    loadingPerms.value = false
  }
}

// populate local fields when editing
watch(() => props.rolePermissions, newVal => {
  if (!newVal) {
    role.value = ''
    description.value = ''
    isActive.value = true
    selectedPermissionIds.value = []
    
    return
  }

  role.value = newVal.name ?? ''
  description.value = newVal.description ?? ''
  isActive.value = newVal.isActive ?? true

  // selected ids could be objects or ids
  selectedPermissionIds.value = extractIdsFromPermissions(newVal.permissions ?? [])
}, { immediate: true })

onMounted(async () => {
  await loadPermissions()
})

// helper: call create on roleStore (support multiple method names)
async function callCreateRole(payload) {
  if (!roleStore) throw new Error('roleStore not found')

  // prefer addRole, then createNewRole, then createRole
  if (typeof roleStore.addRole === 'function') return await roleStore.addRole(payload)
  if (typeof roleStore.createNewRole === 'function') return await roleStore.createNewRole(payload)
  if (typeof roleStore.createRole === 'function') return await roleStore.createRole(payload)

  // sometimes store exposes an action under name "create"
  if (typeof roleStore.create === 'function') return await roleStore.create(payload)

  throw new Error('No create role function found on roleStore')
}

// helper: call update on roleStore (support multiple names)
async function callUpdateRole(id, payload) {
  if (!roleStore) throw new Error('roleStore not found')

  if (typeof roleStore.updateExistingRole === 'function') return await roleStore.updateExistingRole(id, payload)
  if (typeof roleStore.updateRole === 'function') return await roleStore.updateRole(id, payload)
  if (typeof roleStore.editRole === 'function') return await roleStore.editRole(id, payload)
  if (typeof roleStore.update === 'function') return await roleStore.update(id, payload)

  throw new Error('No update role function found on roleStore')
}

// submit: validate and call store create/update
async function onSubmit() {
  errorMessage.value = ''
  if (!role.value || !role.value.trim()) {
    errorMessage.value = 'Tên vai trò là bắt buộc'
    
    return
  }

  if (!description.value || !description.value.trim()) {
    errorMessage.value = 'Mô tả (description) là bắt buộc'
    
    return
  }

  // validate selected ids exist in permissionsList
  const selected = selectedPermissionIds.value.map(String)
  const validIds = permissionsList.value.map(p => String(p._id))
  const invalid = selected.some(id => !validIds.includes(id))
  if (selected.length > 0 && invalid) {
    errorMessage.value = 'Một số quyền được chọn không hợp lệ. Vui lòng đồng bộ danh sách quyền từ backend.'
    
    return
  }

  const payload = {
    name: role.value.trim(),
    description: description.value.trim(),
    isActive: !!isActive.value,
    permissions: selected, // array of _id strings
  }

  submitting.value = true
  try {
    // determine create vs update
    const id = props.rolePermissions?._id ?? props.rolePermissions?.id ?? null
    let result = null
    if (id) {
      result = await callUpdateRole(id, payload)
    } else {
      result = await callCreateRole(payload)
    }

    // you can check result for success; assume success if no error thrown
    // emit an event parent can listen to refresh list / show notification
    emit('role-saved', { success: true, payload, result })
    emit('update:isDialogVisible', false)
    refForm.value?.reset?.()
  } catch (err) {
    console.error('Lỗi khi tạo/cập nhật role:', err)


    // try to use store.error if available
    const storeError = roleStore?.error ?? null

    errorMessage.value = err?.message || storeError || 'Lỗi khi lưu vai trò'
  } finally {
    submitting.value = false
  }
}

// reset / cancel
function onReset() {
  emit('update:isDialogVisible', false)
  refForm.value?.reset?.()
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 700"
    :model-value="props.isDialogVisible"
    @update:model-value="val => emit('update:isDialogVisible', val)"
  >
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-6 pa-2">
      <VCardText>
        <h4 class="text-h5 text-center mb-2">
          {{ props.rolePermissions && props.rolePermissions.name ? 'Edit' : 'Add New' }} Role
        </h4>
        <p class="text-body-1 text-center mb-4">
          Thiết lập quyền vai trò
        </p>

        <VForm ref="refForm">
          <AppTextField
            v-model="role"
            label="Tên vai trò"
            placeholder="Nhập tên"
          />

          <div class="d-flex gap-4 my-3">
            <div class="d-flex items-center">
              <input
                id="isActive"
                v-model="isActive"
                type="checkbox"
                class="mr-2"
              >
              <label for="isActive">Active</label>
            </div>

            <AppTextField
              v-model="description"
              label="Description"
              placeholder="Nhập mô tả"
            />
          </div>

          <div
            v-if="errorMessage"
            class="mb-3 text-negative"
          >
            {{ errorMessage }}
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Thêm quyền</label>

            <div v-if="loadingPerms">
              Đang tải danh sách quyền...
            </div>
            <div
              v-else-if="errorPerms"
              class="text-negative"
            >
              {{ errorPerms }}
            </div>
            <div
              v-else-if="permissionsList.length === 0"
              class="text-sm text-gray-500"
            >
              Chưa có quyền nào
            </div>

            <div v-else>
              <select
                v-model="selectedPermissionIds"
                multiple
                class="w-full border-gray-300 rounded p-2 h-40"
              >
                <option
                  v-for="perm in permissionsList"
                  :key="perm._id"
                  :value="perm._id"
                >
                  {{ perm.name }}
                </option>
              </select>
              <p class="text-xs mt-1 text-gray-500">
                Giữ Ctrl (Cmd trên Mac) để chọn nhiều mục
              </p>
            </div>
          </div>

          <div class="d-flex justify-center gap-4">
            <VBtn
              :loading="submitting"
              color="primary"
              :disabled="submitting"
              @click="onSubmit"
            >
              {{ submitting ? 'Đang lưu...' : 'Submit' }}
            </VBtn>
            <VBtn
              color="secondary"
              variant="tonal"
              :disabled="submitting"
              @click="onReset"
            >
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
select[multiple] {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  min-height: 120px;
}
</style>

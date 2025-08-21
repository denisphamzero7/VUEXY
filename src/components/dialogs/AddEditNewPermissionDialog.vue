<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/custom-event-name-casing -->
<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { usePermissionsStore } from '@core/stores/permissions'

// Props: hỗ trợ cả permissionId hoặc permissionName để edit
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  permissionId: {
    type: [String, Number],
    required: false,
    default: null,
  },
  permissionName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'permission-created',
  'permission-updated',
])

const store = usePermissionsStore()

// Local state
const loading = ref(false)
const errors = ref('')
const internalId = ref(null) // id when editing (string)
const isEditing = computed(() => !!internalId.value)

// form structure follows store.form
const form = reactive({
  name: '',
  apiPath: '',
  method: '',
  module: true,
})

// simple validation
const validate = () => {
  errors.value = ''
  if (!form.name || !form.name.trim()) {
    errors.value = 'Tên quyền là bắt buộc.'
    
    return false
  }

  // optional: validate apiPath and method if needed
  return true
}

// reset to default (based on store.form if available)
const resetForm = () => {
  const sf = store.form || { name: '', apiPath: '', method: '', module: true }

  form.name = sf.name ?? ''
  form.apiPath = sf.apiPath ?? ''
  form.method = sf.method ?? ''
  form.module = sf.module ?? true
  internalId.value = null
  errors.value = ''
}

// fill form from permission object
const fillFromPermission = p => {
  if (!p) return
  form.name = p.name ?? ''
  form.apiPath = p.apiPath ?? p.path ?? ''
  form.method = p.method ?? ''
  form.module = typeof p.module !== 'undefined' ? p.module : true
  internalId.value = p._id ?? p.id ?? null
  errors.value = ''
}

/**
 * Try to load permission to edit:
 * priority:
 * 1. props.permissionId -> fetchPermissionById
 * 2. props.permissionName -> look up in store.permissions
 */
const loadPermissionForEdit = async () => {
  errors.value = ''
  loading.value = true
  try {
    // 1) by id => fetch full
    if (props.permissionId) {
      const resp = await store.fetchPermissionById(String(props.permissionId))
      if (resp) {
        fillFromPermission(resp)
        
        return
      } else {
        errors.value = `Không tìm thấy quyền id=${props.permissionId}`
      }
    }

    // 2) by name => try to find in current store list first
    if (props.permissionName) {
      const found = (store.permissions || []).find(p => p.name === props.permissionName || p._id === props.permissionName || p.id === props.permissionName)
      if (found) {
        // If found but doesn't have full details, optionally fetch by id
        if (found._id) {
          // try fetch full details
          const resp = await store.fetchPermissionById(String(found._id))

          fillFromPermission(resp ?? found)
          
          return
        } else {
          fillFromPermission(found)
          
          return
        }
      } else {
        // fallback: maybe backend supports fetching by name via fetchPermissions search
        // call search wrapper (non-paginated)
        const results = await store.searchPermissionByQuery({ name: props.permissionName })
        if (results && results.length) {
          fillFromPermission(results[0])

          return

        }
        errors.value = `Không tìm thấy quyền có tên "${props.permissionName}"`
      }
    }

    // If nothing found -> keep create defaults
    resetForm()
  } catch (e) {
    console.error('loadPermissionForEdit error', e)
    errors.value = e?.message || 'Lỗi khi tải quyền'
  } finally {
    loading.value = false
  }
}

// submit handler: create or update
const onSubmit = async () => {
  if (!validate()) return

  loading.value = true
  errors.value = ''

  try {
    if (isEditing.value && internalId.value) {
      // update
      const updated = await store.updateExistingPermission(String(internalId.value), {
        name: form.name,
        apiPath: form.apiPath,
        method: form.method,
        module: form.module,
      })

      if (updated) {
        emit('permission-updated', updated)
        emit('update:isDialogVisible', false)

        // optionally refresh list here or parent listens to event

        return
      } else {
        errors.value = store.error || 'Cập nhật thất bại'
      }
    } else {
      // create
      const created = await store.createNewPermission({
        name: form.name,
        apiPath: form.apiPath,
        method: form.method,
        module: form.module,
      })

      if (created) {
        emit('permission-created', created)
        emit('update:isDialogVisible', false)

        // keep dialog closed and reset when reopened

        return
      } else {
        errors.value = store.error || 'Tạo quyền thất bại'
      }
    }
  } catch (e) {
    console.error('onSubmit error', e)
    errors.value = e?.message || store.error || 'Lỗi khi lưu'
  } finally {
    loading.value = false
  }
}

// watch dialog open/props -> prepare form
watch(
  () => props.isDialogVisible,
  val => {
    if (val) {
      // when opened
      if (props.permissionId || props.permissionName) {
        loadPermissionForEdit()
      } else {
        resetForm()
      }
    } else {
      // when closed, reset local state
      resetForm()
    }
  },
  { immediate: false },
)

// also watch permissionName changes while open
watch(() => props.permissionName, v => {
  if (props.isDialogVisible && v) loadPermissionForEdit()
})

// close handler
const onClose = () => {
  emit('update:isDialogVisible', false)
  resetForm()
}
</script>

<template>
  <VDialog
  
    v-model="props.isDialogVisible"

    :width="$vuetify.display.smAndDown ? 'auto' : 640"

    persistent
  >
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        <div>
          <h4 class="text-h6 mb-0">
            {{ isEditing ? 'Chỉnh sửa quyền' : 'Thêm quyền mới' }}
          </h4>
          <div class="text-caption mt-1">
            {{ isEditing ? `ID: ${internalId}` : 'Điền thông tin quyền' }}
          </div>
        </div>

        <div class="d-flex gap-2">
          <VBtn
            text
            :disabled="loading"
            @click="onClose"
          >
            Đóng
          </VBtn>
        </div>
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="onSubmit">
          <div class="d-flex flex-column gap-4">
            <AppTextField
              v-model="form.name"
              label="Tên quyền"
              placeholder="Tên quyền (ví dụ: users.read)"
            />

            <AppTextField
              v-model="form.apiPath"
              label="API Path"
              placeholder="/api/users"
            />

            <AppTextField
              v-model="form.method"
              label="HTTP Method"
              placeholder="GET/POST/PUT/DELETE"
            />

            <div class="d-flex align-center gap-3">
              <VCheckbox
                v-model="form.module"
                label="Đánh dấu là module (module = true)"
              />
            </div>

            <div
              v-if="errors"
              class="text-error"
            >
              {{ errors }}
            </div>
          </div>

          <VCardActions class="d-flex justify-end mt-4">
            <VBtn
              text
              :disabled="loading"
              @click="onClose"
            >
              Hủy
            </VBtn>
            <VBtn
              color="primary"
              :loading="loading"
              @click="onSubmit"
            >
              {{ isEditing ? 'Cập nhật' : 'Tạo' }}
            </VBtn>
          </VCardActions>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.text-error { color: #d32f2f; }
</style>

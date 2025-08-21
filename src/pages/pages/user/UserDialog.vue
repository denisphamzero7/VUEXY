<template>
  <VDialog
    v-model="open"
    max-width="720"
  >
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        <div>
          <h3 class="text-h6 mb-0">
            Chỉnh sửa người dùng
          </h3>
          <div class="text-caption">
            ID: {{ userId || '—' }}
          </div>
        </div>

        <div class="d-flex gap-2">
          <VBtn
            text
            :disabled="saving"
            @click="close"
          >
            Đóng
          </VBtn>
        </div>
      </VCardTitle>

      <VCardText>
        <div class="max-w-lg mx-auto p-2">
          <form @submit.prevent="handleEditUser">
            <!-- AppTextField assumed registered global; nếu không thì import nó -->
            <AppTextField
              v-model="localForm.name"
              label="Tên người dùng"
              placeholder="Nhập tên"
            />
            <AppTextField
              v-model="localForm.email"
              label="Email"
              type="email"
              placeholder="Nhập email"
            />
            <AppTextField
              v-model="localForm.password"
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu mới hoặc để trống"
            />
            <AppTextField
              v-model="localForm.age"
              label="Tuổi"
              type="number"
              placeholder="Nhập tuổi"
            />
            <AppTextField
              v-model="localForm.phone"
              label="SĐT"
              type="text"
              placeholder="Nhập số điện thoại"
            />

            <div class="mb-4">
              <label class="d-block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
              <select
                v-model="localForm.gender"
                class="w-full border-gray-300 rounded p-2"
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
              v-model="localForm.address"
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
            />

            <div class="mb-4">
              <label class="d-block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
              <select
                v-model="localForm.role"
                class="w-full border-gray-300 rounded p-2"
              >
                <option
                  disabled
                  value=""
                >
                  Chọn vai trò
                </option>
                <option
                  v-for="role in roles"
                  :key="role._id"
                  :value="role._id"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>

            <div class="mb-4">
              <label class="d-block text-sm font-medium text-gray-700 mb-1">Công ty</label>
              <select
                v-model="localForm.companyId"
                class="w-full border-gray-300 rounded p-2"
              >
                <option
                  disabled
                  value=""
                >
                  Chọn công ty
                </option>
                <option
                  v-for="company in companies"
                  :key="company._id"
                  :value="company._id"
                >
                  {{ company?.name }}
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
                @click="close"
              >
                Huỷ
              </VBtn>
              <VSpacer />
              <VBtn
                color="primary"
                type="submit"
                :loading="saving"
              >
                Cập nhật người dùng
              </VBtn>
            </div>
          </form>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'

import { useUserStore } from "@core/stores/user"

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  userId: { type: [String, Number, null], default: null },
})

const emit = defineEmits(['update:modelValue', 'saved'])

const userStore = useUserStore()

// control v-model
const open = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const userId = computed(() => props.userId)

// selects from store
const roles = ref([])
const companies = ref([])

// local UI state
const saving = ref(false)
const errors = ref(null)

// local form copy to avoid mutating store.form directly
const localForm = reactive({
  name: '',
  email: '',
  password: '',
  age: null,
  phone: '',
  gender: '',
  address: '',
  role: '',
  companyId: '',
})

// Guarded fetch: chỉ gọi khi dialog mở và có id hợp lệ
watch(
  () => [open.value, userId.value],
  async ([isOpen, id]) => {
    if (!isOpen) return
    errors.value = null

    // Nếu không có id: reset form và return (không gọi API)
    if (!id) {
      Object.assign(localForm, {
        name: '',
        email: '',
        password: '',
        age: null,
        phone: '',
        gender: '',
        address: '',
        role: '',
        companyId: '',
      })

      return
    }


    console.log('UserEditDialog fetching user id=', id)

    try {
      // userStore.fetchUserById trả object user hoặc null
      const userData = await userStore.fetchUserById(String(id))

      if (!userData) {
        errors.value = `Không tìm thấy người dùng với id ${id}`

        return
      }

      // hydrate form from userData (tùy backend shape)
      localForm.name = userData.name ?? ''
      localForm.email = userData.email ?? ''
      localForm.password = '' // không prefill password
      localForm.age = userData.age ?? null
      localForm.phone = userData.phone ?? ''
      localForm.gender = userData.gender ?? ''
      localForm.address = userData.address ?? ''

      // role might be id or object
      localForm.role = userData.role?._id ?? userData.role ?? ''

      // company might be object or id
      localForm.companyId = userData.company?._id ?? userData.companyId ?? (userData.company || '')
    } catch (e) {
      console.error('fetchUserById error', e)

      // prefer store.error if set, else response message
      errors.value = userStore.error || (e && e.message) || 'Lỗi khi tải user'
    }
  },
  { immediate: true },
)

// load selects when component mounted or when dialog first opened
onMounted(async () => {
  try {
    roles.value = (await userStore.fetchRoles()) || []
    companies.value = (await userStore.fetchCompanies()) || []
  } catch (e) {
    console.warn('Không load được roles/companies', e)
  }
})

const buildPayload = () => {
  return {
    name: (localForm.name || '').trim(),
    email: (localForm.email || '').trim(),
    ...(localForm.password ? { password: localForm.password } : {}),
    age: localForm.age,
    phone: localForm.phone,
    gender: localForm.gender,
    address: (localForm.address || '').trim(),
    role: localForm.role,
    company: {
      _id: localForm.companyId,
      name: (companies.value.find(c => c._id === localForm.companyId) || {}).name || '',
    },
  }
}

const handleEditUser = async () => {
  errors.value = null
  if (!localForm.name || !localForm.name.trim() || !localForm.email || !localForm.email.trim()) {
    errors.value = 'Vui lòng nhập tên và email.'
    
    return
  }

  // ensure we have a valid id to update
  const id = props.userId
  if (!id) {
    errors.value = 'Missing user id'
    
    return
  }

  saving.value = true
  try {
    const payload = buildPayload()

    // call store.updateUser
    const result = await userStore.updateUser(String(id), payload)

    // updateUser trả object updated hoặc true/false
    if (result) {
      // success
      emit('saved', id)
      open.value = false
    } else {
      errors.value = userStore.error || 'Không thể cập nhật người dùng'
    }
  } catch (e) {
    console.error('updateUser error', e)
    errors.value = userStore.error || (e && e.message) || 'Lỗi khi cập nhật'
  } finally {
    saving.value = false
  }
}

const close = () => {
  open.value = false
}
</script>

<style scoped>
.text-error { color: #d32f2f; }
</style>

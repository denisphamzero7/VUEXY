<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-semibold mb-6">
      Chỉnh sửa người dùng
    </h2>

    <form @submit.prevent="handleEditUser">
      <Input
        v-model="formRef.name"
        label="Tên người dùng"
        placeholder="Nhập tên"
      />
      <Input
        v-model="formRef.email"
        label="Email"
        type="email"
        placeholder="Nhập email"
      />
      <Input
        v-model="formRef.password"
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu mới hoặc để trống"
      />
      <Input
        v-model="formRef.age"
        label="Tuổi"
        type="number"
        placeholder="Nhập tuổi"
      />
      <Input
        v-model="formRef.phone"
        label="SĐT"
        type="number"
        placeholder="Nhập số điện thoại"
      />

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
        <select
          v-model="formRef.gender"
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

      <Input
        v-model="formRef.address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ"
      />

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
        <select
          v-model="formRef.role"
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
        <label class="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
        <select
          v-model="formRef.companyId"
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
            {{ company.name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Cập nhật người dùng
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// composables
import useUserApi from '@/@core/composable/useUrlApi'
import { useNotification } from '@/@core/composable/useNotification' // <-- sửa import ở đây

// notification
const { addNotification } = useNotification()

const route = useRoute()
const router = useRouter()

// lấy các api/func từ composable user
const {
  fetchcompanies,
  fetchRoles,
  fetchUserById,
  updateUser,
  form: apiForm, // có thể là undefined nếu composable không trả về
} = useUserApi()

// đảm bảo userId là string hoặc null
const userId = route.params && route.params.userId ? String(route.params.userId) : null

const roles = ref([])
const companies = ref([])

// an toàn: dùng formRef nội bộ nếu composable không cung cấp form
const localForm = ref({
  name: '',
  email: '',
  password: '',
  age: '',
  phone: '',
  gender: '',
  address: '',
  role: '',
  companyId: '',
})

const formRef = apiForm ?? localForm // nếu api trả về form (ref) thì dùng, không thì xài localForm

onMounted(async () => {
  try {
    // lấy roles & companies song song
    const [fetchedRoles, fetchedCompanies] = await Promise.all([
      fetchRoles().catch(() => []),
      fetchcompanies().catch(() => []),
    ])

    roles.value = fetchedRoles || []
    companies.value = fetchedCompanies || []

    if (!userId) {
      // nếu rút cục không có userId, thông báo và không fetch user
      console.warn('No userId in route params.')
      
      return
    }

    const userData = await fetchUserById(userId)
    if (!userData) {
      addNotification('Không tìm thấy người dùng.', { type: 'danger' })
      
      return
    }

    // gán dữ liệu vào formRef (đảm bảo formRef là reactive plain object hoặc ref)
    formRef.value = {
      name: userData.name ?? '',
      email: userData.email ?? '',

      // KHÔNG nên gán password thực tế từ backend (thường backend không trả)
      password: '',
      age: userData.age ?? '',
      phone: userData.phone ?? '',
      gender: userData.gender ?? '',
      address: userData.address ?? '',
      role: userData.role && userData.role._id ? userData.role._id : '',
      companyId: userData.company && userData.company._id ? userData.company._id : '',
    }
  } catch (err) {
    console.error('Error initializing edit form:', err)
    addNotification('Có lỗi khi tải dữ liệu người dùng.', { type: 'danger' })
  }
})

const handleEditUser = async () => {
  if (!userId) {
    addNotification('ID người dùng không hợp lệ.', { type: 'danger' })
    
    return 0
  }

  try {
    const payload = {
      name: (formRef.value.name || '').trim(),
      email: (formRef.value.email || '').trim(),
      ...(formRef.value.password ? { password: formRef.value.password } : {}),
      age: formRef.value.age,
      phone: formRef.value.phone,
      gender: formRef.value.gender,
      address: (formRef.value.address || '').trim(),
      role: formRef.value.role,
      company: {
        _id: formRef.value.companyId,
        name:
          (companies.value.find(c => c._id === formRef.value.companyId) || {}).name || '',
      },
    }

    const success = await updateUser(userId, payload)
    if (success) {
      addNotification('Cập nhật người dùng thành công!')

      // điều hướng sau khi cập nhật
      router.push('/dashboard')
    } else {
      addNotification('Cập nhật thất bại.', { type: 'danger' })
    }
  } catch (err) {
    console.error('Update user error:', err)


    // nếu api trả lỗi cụ thể, có thể lấy err.response.data.message
    const msg = err?.response?.data?.message || 'Có lỗi khi cập nhật người dùng.'

    addNotification(msg, { type: 'danger' })
  }
}
</script>

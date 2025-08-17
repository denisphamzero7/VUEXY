// src/composable/useUserApi.js
import { ref } from 'vue'
import { deleteUser, getUserById, getUsers, createUser, updateAUser, getCompanies, getRoles } from '@/plugins/api'

export default function useUserApi() {
  const users = ref([])
  const error = ref(null)
  const loading = ref(false)
  const keyWord = ref('')

  const form = ref({
    name: '',
    email: '',
    password: '',
    age: 0,
    phone: 0,
    gender: '',
    address: '',
    role: '',
    companyId: '',
  })

  // === pagination state ===
  const currentPage = ref(1)
  const totalPages  = ref(1)
  const totalItems  = ref(0)
  const limit       = ref(10)

  const fetchUsers = async page => {
    loading.value = true
    try {
      const { data } = await getUsers({
        page,
        limit: limit.value,
        name: keyWord.value,
      })

      const resp = data.data

      users.value    = resp.result
      currentPage.value = resp.pagination.currentPage
      totalPages.value  = resp.pagination.totalPages
      totalItems.value  = resp.pagination.totalItems
    } catch (e) {
      error.value = e.message || 'Lỗi khi tải danh sách'
    } finally {
      loading.value = false
    }
  }

  const searchUsersByQuery = async query => {
    loading.value = true
    try {
      const { data } = await getUsers(query)

      users.value = data.data.result
      error.value = null
      
      return users.value
    } catch (e) {
      error.value = e.message || 'Không thể tìm người dùng'
      
      return []
    } finally {
      loading.value = false
    }
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages.value) return
    
    return fetchUsers(page)
  }
  function nextPage() { return goToPage(currentPage.value + 1) }
  function prevPage() { return goToPage(currentPage.value - 1) }

  const findUserId = id => users.value.findIndex(u => u._id === id)

  const fetchUserById = async id => {
    try {
      const { data } = await getUserById(id)

      console.log('data đây', data.data)
      
      return data.data
    } catch (e) {
      error.value = e.message || `Lỗi khi tải user ${id}`
      
      return null
    }
  }

  const RemoveUser = async id => { 
    const index = findUserId(id)
    const orinalUser = users.value[index]

    users.value.splice(index, 1)
    try {
      const response = await deleteUser(id)

      console.log('user', response)
      if (!response) {
        throw new Error("không thể xoá")
      }
    } catch (e) {
      error.value = e.message || 'Không thể xoá user'
      users.value.splice(index, 0, orinalUser)
    }
  }

  const createNewUser = async payload => {
    loading.value = true
    try {
      console.log('Sending payload:', JSON.stringify(payload, null, 2))

      const response = await createUser(payload)

      console.log('ckkk', response)
      users.value.push(response.data)
      error.value = null
      
      return true
    } catch (e) {
      error.value = e.message || 'Không thể tạo người dùng'
      
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchcompanies = async () => {
    loading.value = true
    try {
      const { data } = await getCompanies()

      console.log('log companies:', data.data.data)
      error.value = null
      
      return data.data.data
    } catch (e) {
      error.value = e.message || 'Lỗi khi tải danh sách công ty'
      
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchRoles = async () => {
    loading.value = true
    try {
      const { data } = await getRoles()

      console.log('log role', data.data?.result)
      error.value = null
      
      return data.data?.result || []
    } catch (e) {
      error.value = e.message || 'Lỗi khi tải danh sách vai trò'
      
      return []
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, payload) => {
    loading.value = true
    try {
      console.log('Sending payload edit:', JSON.stringify(payload, null, 2))

      const response = await updateAUser(id, payload)

      users.value.push(response.data)
      error.value = null
      
      return true
    } catch (e) {
      error.value = e.message || 'Không thể cập nhật người dùng'
      
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    error,
    loading,
    form,
    keyWord,
    currentPage,
    totalPages,
    totalItems,
    limit,
    fetchUsers,
    fetchUserById,
    RemoveUser,
    createNewUser,
    fetchcompanies,
    fetchRoles,
    updateUser,
    searchUsersByQuery,
    goToPage,
    nextPage,
    prevPage,
  }
}

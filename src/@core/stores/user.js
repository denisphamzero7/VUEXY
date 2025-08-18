// src/stores/user.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  deleteUser,
  getUserById,
  getUsers,
  createUser,
  updateAUser,
  getCompanies,
  getRoles,
} from '@/composables/useMyApi'

export const useUserStore = defineStore('user', () => {
  // state
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

  // pagination
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const limit = ref(10)

  // helpers
  const _unwrapData = resp => {
    // safe unwrap: prefer resp.data.data, then resp.data, then resp
    if (!resp) return null
    
    return resp.data?.data ?? resp.data ?? resp
  }

  const findUserIndex = id =>
    users.value.findIndex(u => u._id === id || u.id === id)

  // actions
  const fetchUsers = async (page = 1) => {
    loading.value = true
    try {
      const { data } = await getUsers({
        page,
        limit: limit.value,
        name: keyWord.value,
      })


      // API shape in your TS code: data.data -> resp, resp.result, resp.pagination
      const resp = data?.data ?? data

      users.value = resp?.result ?? []
      currentPage.value = resp?.pagination?.currentPage ?? page
      totalPages.value = resp?.pagination?.totalPages ?? 1
      totalItems.value = resp?.pagination?.totalItems ?? users.value.length
      error.value = null
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách'
    } finally {
      loading.value = false
    }
  }

  const searchUsersByQuery = async (query = { name: '' }) => {
    loading.value = true
    try {
      const { data } = await getUsers(query)
      const resp = data?.data ?? data

      users.value = resp?.result ?? []
      error.value = null
      
      return users.value
    } catch (e) {
      error.value = e?.message || 'Không thể tìm người dùng'
      
      return []
    } finally {
      loading.value = false
    }
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages.value) return
    
    return fetchUsers(page)
  }
  function nextPage() {
    return goToPage(currentPage.value + 1)
  }
  function prevPage() {
    return goToPage(currentPage.value - 1)
  }

  const fetchUserById = async id => {
    loading.value = true
    try {
      const { data } = await getUserById(id)
      const resp = _unwrapData(data)

      error.value = null
      
      return resp
    } catch (e) {
      error.value = e?.message || `Lỗi khi tải user ${id}`
      
      return null
    } finally {
      loading.value = false
    }
  }

  const RemoveUser = async id => {
    const index = findUserIndex(id)
    if (index === -1) {
      error.value = 'User không tồn tại'
      
      return false
    }
    const originalUser = users.value[index]


    // optimistic remove
    users.value.splice(index, 1)
    try {
      const response = await deleteUser(id)

      // If API returns something that indicates failure, throw
      if (!response || (response.status && response.status >= 400)) {
        throw new Error('Không thể xoá')
      }
      error.value = null
      
      return true
    } catch (e) {
      // rollback
      users.value.splice(index, 0, originalUser)
      error.value = e?.message || 'Không thể xoá user'
      
      return false
    }
  }

  const createNewUser = async payload => {
    loading.value = true
    try {
      // payload should be plain object
      const response = await createUser(payload)
      const created = _unwrapData(response)

      // If created is an object (single user), push it
      if (created) users.value.push(created)
      error.value = null
      
      return created ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể tạo người dùng'
      
      return false
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, payload) => {
    loading.value = true
    try {
      const response = await updateAUser(id, payload)
      const updated = _unwrapData(response)

      // replace in users list if exists, else push
      const idx = findUserIndex(id)
      if (idx !== -1 && updated) {
        users.value.splice(idx, 1, updated)
      } else if (updated) {
        users.value.push(updated)
      }
      error.value = null
      
      return updated ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể cập nhật người dùng'
      
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchCompanies = async () => {
    loading.value = true
    try {
      const { data } = await getCompanies()

      // Some APIs wrap in data.data.data etc.
      const resp = _unwrapData(data)

      error.value = null
      
      return resp ?? []
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách công ty'
      
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchRoles = async () => {
    loading.value = true
    try {
      const { data } = await getRoles()

      // original code used data.data?.result
      const roles = data?.data?.result ?? data?.data ?? data

      error.value = null
      
      return roles ?? []
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách vai trò'
      
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    users,
    error,
    loading,
    form,
    keyWord,
    currentPage,
    totalPages,
    totalItems,
    limit,

    // actions
    fetchUsers,
    fetchUserById,
    RemoveUser,
    createNewUser,
    fetchCompanies,
    fetchRoles,
    updateUser,
    searchUsersByQuery,
    goToPage,
    nextPage,
    prevPage,
  }
})

export default useUserStore

// src/stores/user.js
import {
  createUser,
  deleteUser,
  getCompanies,
  getRoles,
  getUserById,
  getUsers,
  updateAUser,
} from '@/composables/useMyApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  const populate = ref('role')

  // helpers
  const _unwrapData = resp => {
    if (!resp) return null
    
    return resp.data?.data ?? resp.data ?? resp
  }

  const findUserIndex = id =>
    users.value.findIndex(u => u._id === id || u.id === id)

  // ========== logging helper ==========
  const _log = {
    usersFetchStart: (page, opts = {}) => {
      console.groupCollapsed(`[userStore] fetchUsers start — page=${page}, limit=${limit.value}`)
      console.log('params:', { page, limit: limit.value, keyword: keyWord.value, opts })
      console.log('store.currentPage (before):', currentPage.value)
      console.log('timestamp:', new Date().toISOString())
    },
    usersFetchEnd: (page, info = {}) => {
      console.log('fetchUsers end:', info)
      console.groupEnd()
    },
    userFetchStart: id => {
      console.groupCollapsed(`[userStore] fetchUserById start — id=${id}`)
      console.log('timestamp:', new Date().toISOString())
    },
    userFetchEnd: (id, info = {}) => {
      console.log('fetchUserById end:', info)
      console.groupEnd()
    },
    error: (where, err) => {
      console.error(`[userStore] error in ${where}:`, err)
    },
  }

  // actions
  const fetchUsers = async (page = 1) => {
    loading.value=true
    
    // logging start
    const start = performance.now()

    _log.usersFetchStart(page)

    loading.value = true
    try {
      // call API
      const { data } = await getUsers({
        page,
        limit: limit.value,
        name: keyWord.value,
        populate: populate.value,
      })

      const resp = data?.data ?? data

      console.log('resp', resp) 

      // update store
      users.value = resp?.result ?? []
      currentPage.value = resp?.pagination?.currentPage ?? page
      totalPages.value = resp?.pagination?.totalPages ?? 1
      totalItems.value = resp?.pagination?.totalItems ?? users.value.length
      error.value = null

      // logging end with details
      const duration = Math.round(performance.now() - start)

      _log.usersFetchEnd(page, {
        durationMs: duration,
        itemsReturned: Array.isArray(resp?.result) ? resp.result.length : (users.value.length || 0),
        pagination: resp?.pagination ?? null,
        storeCurrentPage: currentPage.value,
      })

      return resp
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách'
      _log.error('fetchUsers', e)
      throw e
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

      console.log('[userStore] searchUsersByQuery result count=', users.value.length, 'query=', query)
      
      return users.value
    } catch (e) {
      error.value = e?.message || 'Không thể tìm người dùng'
      _log.error('searchUsersByQuery', e)
      
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchUserById = async id => {
    if (!id) {
      const err = new Error('fetchUserById: missing id')

      _log.error('fetchUserById', err)
      
      return null
    }

    _log.userFetchStart(id)

    const start = performance.now()

    loading.value = true
    try {
      const { data } = await getUserById(id)
      const resp = _unwrapData(data)

      error.value = null

      const duration = Math.round(performance.now() - start)

      _log.userFetchEnd(id, { durationMs: duration, resultExists: !!resp, respSample: resp ? (typeof resp === 'object' ? { ...resp, password: undefined } : resp) : null })

      return resp
    } catch (e) {
      error.value = e?.message || `Lỗi khi tải user ${id}`
      _log.error('fetchUserById', e)
      
      return null
    } finally {
      loading.value = false
    }
  }

  const RemoveUser = async id => {
    const index = findUserIndex(id)
    if (index === -1) {
      error.value = 'User không tồn tại'
      console.warn('[userStore] RemoveUser: user not found id=', id)
      
      return false
    }
    const originalUser = users.value[index]

    users.value.splice(index, 1)
    try {
      const response = await deleteUser(id)

      if (!response || (response.status && response.status >= 400)) {
        throw new Error('Không thể xoá')
      }
      error.value = null
      console.log('[userStore] RemoveUser success id=', id)
      
      return true
    } catch (e) {
      users.value.splice(index, 0, originalUser)
      error.value = e?.message || 'Không thể xoá user'
      _log.error('RemoveUser', e)
      
      return false
    }
  }

  const createNewUser = async payload => {
    loading.value = true
    try {
      const response = await createUser(payload)
      const created = _unwrapData(response)

      if (created) users.value.push(created)
      error.value = null
      console.log('[userStore] createNewUser success:', created)
      
      return created ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể tạo người dùng'
      _log.error('createNewUser', e)
      
      return false
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, payload) => {
    loading.value = true
    try {
      const response = await updateAUser(id, payload)
      
      console.log(response.data)

      const updated = _unwrapData(response)

      const idx = findUserIndex(id)
      if (idx !== -1 && updated) {
        users.value.splice(idx, 1, updated)
      } else if (updated) {
        users.value.push(updated)
      }
      error.value = null
      console.log('[userStore] updateUser success id=', id)
      
      return updated ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể cập nhật người dùng'
      _log.error('updateUser', e)
      
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchCompanies = async () => {
    loading.value = true
    try {
      const { data } = await getCompanies()
      const resp = _unwrapData(data)

      error.value = null
      console.log('[userStore] fetchCompanies count=', Array.isArray(resp) ? resp.length : 0)
      
      return resp ?? []
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách công ty'
      _log.error('fetchCompanies', e)
      
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchRoles = async () => {
    loading.value = true
    try {
      const { data } = await getRoles()
      const roles = data?.data?.result ?? data?.data ?? data
      
      error.value = null
      console.log('[userStore] fetchRoles count=', Array.isArray(roles) ? roles.length : 0)
      
      return roles ?? []
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách vai trò'
      _log.error('fetchRoles', e)
      
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
  }
})

export default useUserStore

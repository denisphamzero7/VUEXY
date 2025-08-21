// src/stores/role.js
import {
  getRoles,
  getRoleById,
  createRole as apiCreateRole,
  updateRole as apiUpdateRole,
  deleteRole as apiDeleteRole,
} from '@/composables/useMyApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { _unwrapData } from '../utils/_uwrapData' // giữ nguyên path nếu bạn đã có util này

export const useRoleStore = defineStore('role', () => {
  // state
  const roles = ref([])
  const error = ref(null)
  const loading = ref(false)
  const keyWord = ref('')

  // pagination
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const limit = ref(10)

  // form (example)
  const form = ref({
    name: '',
    permissions: [],
    description: '',
    isActive: true,
  })

  // helpers
  const findRoleIndex = id => roles.value.findIndex(r => r._id === id || r.id === id)

  // logging helper
  const _log = {
    start: (name, meta = {}) => {
      console.groupCollapsed(`[roleStore] ${name} start`)
      console.log('meta:', meta)
      console.log('timestamp:', new Date().toISOString())
    },
    end: (name, info = {}) => {
      console.log(`[roleStore] ${name} end`, info)
      console.groupEnd()
    },
    error: (where, err) => {
      console.error(`[roleStore] error in ${where}:`, err)
    },
  }

  // ========== actions ==========

  /**
   * Fetch roles (supports pagination)
   * @param {number} page
   */
  const fetchRoles = async (page = 1) => {
    const start = performance.now()

    _log.start('fetchRoles', { page, limit: limit.value, keyword: keyWord.value })
    loading.value = true
    try {
      const { data } = await getRoles({
        page,
        limit: limit.value,
        name: keyWord.value,
      })

      const resp = _unwrapData(data)

      // resp might be { result: [...], pagination: {...} } or an array
      if (Array.isArray(resp)) {
        roles.value = resp
        totalItems.value = resp.length
        totalPages.value = 1
        currentPage.value = page
      } else {
        // resp could be { result, pagination }
        roles.value = resp?.result ?? resp ?? []
        currentPage.value = resp?.pagination?.currentPage ?? page
        totalPages.value = resp?.pagination?.totalPages ?? 1
        totalItems.value = resp?.pagination?.totalItems ?? roles.value.length
      }

      error.value = null

      const durationMs = Math.round(performance.now() - start)

      _log.end('fetchRoles', {
        durationMs,
        returned: roles.value.length,
        currentPage: currentPage.value,
        totalPages: totalPages.value,
        totalItems: totalItems.value,
      })

      return resp
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách vai trò'
      _log.error('fetchRoles', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Simple search wrapper (no pagination)
   */
  const searchRolesByQuery = async (query = { name: '' }) => {
    loading.value = true
    try {
      const { data } = await getRoles(query)
      const resp = _unwrapData(data)

      roles.value = Array.isArray(resp) ? resp : resp?.result ?? []
      error.value = null
      console.log('[roleStore] searchRolesByQuery count=', roles.value.length, 'query=', query)
      
      return roles.value
    } catch (e) {
      error.value = e?.message || 'Không thể tìm vai trò'
      _log.error('searchRolesByQuery', e)
      
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * fetch role by id
   */
  const fetchRoleById = async id => {
    if (!id) {
      const err = new Error('fetchRoleById: missing id')

      _log.error('fetchRoleById', err)
      
      return null
    }

    _log.start('fetchRoleById', { id })

    const start = performance.now()

    loading.value = true
    try {
      const { data } = await getRoleById(id)
      const resp = _unwrapData(data)

      error.value = null

      const durationMs = Math.round(performance.now() - start)

      _log.end('fetchRoleById', { id, durationMs, found: !!resp })

      return resp
    } catch (e) {
      error.value = e?.message || `Lỗi khi tải role ${id}`
      _log.error('fetchRoleById', e)
      
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * create role
   */
  const createNewRole = async payload => {
    loading.value = true
    try {
      const { data } = await apiCreateRole(payload)
      const created = _unwrapData(data)
      if (created) roles.value.unshift(created) // push to top
      error.value = null
      console.log('[roleStore] createNewRole success', created)
      
      return created ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể tạo vai trò'
      _log.error('createNewRole', e)
      
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * update role
   */
  const updateExistingRole = async (id, payload) => {
    loading.value = true
    try {
      const { data } = await apiUpdateRole(id, payload)
      const updated = _unwrapData(data)

      const idx = findRoleIndex(id)
      if (idx !== -1 && updated) {
        roles.value.splice(idx, 1, updated)
      } else if (updated) {
        roles.value.unshift(updated)
      }

      error.value = null
      console.log('[roleStore] updateExistingRole success id=', id)
      
      return updated ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể cập nhật vai trò'
      _log.error('updateExistingRole', e)
      
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * remove role (optimistic)
   */
  const removeRole = async id => {
    const idx = findRoleIndex(id)
    if (idx === -1) {
      error.value = 'Role không tồn tại'
      console.warn('[roleStore] removeRole: role not found id=', id)
      
      return false
    }
    const original = roles.value[idx]

    roles.value.splice(idx, 1)
    try {
      const resp = await apiDeleteRole(id)
      if (!resp || (resp.status && resp.status >= 400)) throw new Error('Không thể xoá')
      error.value = null
      console.log('[roleStore] removeRole success id=', id)
      
      return true
    } catch (e) {
      // rollback
      roles.value.splice(idx, 0, original)
      error.value = e?.message || 'Không thể xoá vai trò'
      _log.error('removeRole', e)
      
      return false
    }
  }

  return {
    // state
    roles,
    error,
    loading,
    form,
    keyWord,
    currentPage,
    totalPages,
    totalItems,
    limit,

    // actions
    fetchRoles,
    fetchRoleById,
    searchRolesByQuery,
    createNewRole,
    updateExistingRole,
    removeRole,
  }
})

export default useRoleStore

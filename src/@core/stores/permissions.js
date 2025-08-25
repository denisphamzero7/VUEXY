// src/stores/permissions.js
import {
  getPermissions,
  getPermissionId,
  createPermission as apiCreatePermission,
  updatePermission as apiUpdatePermission,
  deletePermission as apiDeletePermission,
} from '@/composables/useMyApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { _unwrapData } from '../utils/_uwrapData' // giữ nguyên path nếu bạn đã có util này

export const usePermissionsStore = defineStore('permission', () => {
  // state
  const permissions = ref([])
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
    apiPath: '',
    method: '',
    module: '',
  })

  // helpers
  const findPermissionIndex = id => permissions.value.findIndex(r => r._id === id || r.id === id)
 

  // logging helper
  const _log = {
    start: (name, meta = {}) => {
      console.groupCollapsed(`[permissionStore] ${name} start`)
      console.log('meta:', meta)
      console.log('timestamp:', new Date().toISOString())
    },
    end: (name, info = {}) => {
      console.log(`[permissionStore] ${name} end`, info)
      console.groupEnd()
    },
    error: (where, err) => {
      console.error(`[permissionStore] error in ${where}:`, err)
    },
  }

  // ========== actions ==========

  /**
   * Fetch permissions (supports pagination)
   * @param {number} page
   */
  const fetchPermissions = async (page = 1) => {
    const start = performance.now()

    _log.start('fetchPermissions', { page, limit: limit.value, keyword: keyWord.value })
    loading.value = true
    try {
      const { data } = await getPermissions({
        page,
        limit: limit.value,
        name: keyWord.value,
      })

      const resp = _unwrapData(data)

      console.log('resp: ', resp)

      // resp might be { result: [...], pagination: {...} } or an array
      if (Array.isArray(resp)) {
        permissions.value = resp
        totalItems.value = resp.length
        totalPages.value = 1
        currentPage.value = page
      } else {
        // resp could be { result, data, pagination }
        // try common fields first
        permissions.value = resp ?? []
        console.log('permission', permissions.value)
        currentPage.value = resp?.pagination?.currentPage ?? page
        totalPages.value = resp?.pagination?.totalPages ?? 1
        totalItems.value = resp?.pagination?.totalItems ?? permissions.value.length

      }

      error.value = null

      const durationMs = Math.round(performance.now() - start)

      _log.end('fetchPermissions', {
        durationMs,
        returned: permissions.value.length,
        currentPage: currentPage.value,
        totalPages: totalPages.value,
        totalItems: totalItems.value,
      })

      return resp
    } catch (e) {
      error.value = e?.message || 'Lỗi khi tải danh sách các quyền'
      _log.error('fetchPermissions', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Simple search wrapper (no pagination)
   */
  const searchPermissionByQuery = async (query = { name: '' }) => {
    loading.value = true
    try {
      const { data } = await getPermissions(query)
      const resp = _unwrapData(data)

      permissions.value = Array.isArray(resp) ? resp : resp?.result ?? resp?.data ?? []
      error.value = null
      console.log('[permissionStore] searchPermissionByQuery count=', permissions.value.length, 'query=', query)

      return permissions.value
    } catch (e) {
      error.value = e?.message || 'Không thể tìm quyền'
      _log.error('searchPermissionByQuery', e)

      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * fetch permission by id
   */
  const fetchPermissionById = async id => {
    if (!id) {
      const err = new Error('fetchPermissionById: missing id')

      _log.error('fetchPermissionById', err)

      return null
    }

    _log.start('fetchPermissionById', { id })

    const start = performance.now()

    loading.value = true
    try {
      const { data } = await getPermissionId(id)
      const resp = _unwrapData(data)

      error.value = null

      const durationMs = Math.round(performance.now() - start)

      _log.end('fetchPermissionById', { id, durationMs, found: !!resp })

      return resp
    } catch (e) {
      error.value = e?.message || `Lỗi khi tải permission ${id}`
      _log.error('fetchPermissionById', e)

      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * create permission
   */
  const createNewPermission = async payload => {
    loading.value = true
    try {
      const { data } = await apiCreatePermission(payload)
      const created = _unwrapData(data)
      if (created) permissions.value.unshift(created) // push to top
      error.value = null
      console.log('[permissionStore] createNewPermission success', created)

      return created ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể tạo quyền'
      _log.error('createNewPermission', e)

      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * update permission
   */
  const updateExistingPermission = async (id, payload) => {
    loading.value = true
    try {
      const { data } = await apiUpdatePermission(id, payload)
      const updated = _unwrapData(data)

      const idx = findPermissionIndex(id)
      if (idx !== -1 && updated) {
        permissions.value.splice(idx, 1, updated)
      } else if (updated) {
        permissions.value.unshift(updated)
      }

      error.value = null
      console.log('[permissionStore] updateExistingPermission success id=', id)

      return updated ?? true
    } catch (e) {
      error.value = e?.message || 'Không thể cập nhật quyền'
      _log.error('updateExistingPermission', e)

      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * remove permission (optimistic)
   */
  const removePermission = async id => {
    const idx = findPermissionIndex(id)
    if (idx === -1) {
      error.value = 'Permission không tồn tại'
      console.warn('[permissionStore] removePermission: permission not found id=', id)

      return false
    }
    const original = permissions.value[idx]

    permissions.value.splice(idx, 1)
    try {
      const resp = await apiDeletePermission(id)
      if (!resp || (resp.status && resp.status >= 400)) throw new Error('Không thể xoá')
      error.value = null
      console.log('[permissionStore] removePermission success id=', id)

      return true
    } catch (e) {
      // rollback
      permissions.value.splice(idx, 0, original)
      error.value = e?.message || 'Không thể xoá quyền'
      _log.error('removePermission', e)

      return false
    }
  }

  return {
    // state
    permissions,
    error,
    loading,
    form,
    keyWord,
    currentPage,
    totalPages,
    totalItems,
    limit,

    // actions
    fetchPermissions,
    fetchPermissionById,
    searchPermissionByQuery,
    createNewPermission,
    updateExistingPermission,
    removePermission,
  }
})

export default usePermissionsStore

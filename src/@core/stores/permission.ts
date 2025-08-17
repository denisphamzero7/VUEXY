// src/stores/permissionStore.js
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  getPermissions,
  deletePermission,
  getPermissionId,
  updatePermission,
  createPermission,
} from '@/plugins/api/index'

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref([])
  const loadingPerms = ref(false)
  const errorPerms = ref(null)

  const newPermission = reactive({
    name: '',
    apiPath: '',
    method: '',
    module: '',
  })

  const keyWord = ref('')

  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const limit = ref(10)

  async function fetchPermissions(page = 1, limitParam = 10) {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      const res = await getPermissions({ page, limit: limitParam })
      const list = res.data?.data?.data ?? []

      permissions.value = list

      const p = res.data?.data?.pagination

      currentPage.value = p.currentPage
      totalPages.value = p.totalPages
      totalItems.value = p.totalItems
      limit.value = limitParam
    } catch (err) {
      errorPerms.value = err.message || 'Lỗi không xác định'
      permissions.value = []
    } finally {
      loadingPerms.value = false
    }
  }

  async function fetchPermissionId(id) {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      const res = await getPermissionId(id)
      
      return res.data?.data
    } catch (err) {
      errorPerms.value = err.message || 'Lỗi không xác định'
      
      return null
    } finally {
      loadingPerms.value = false
    }
  }

  // Expanded to support page & limit
  async function searchPermissionByQuery(query) {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      const res = await getPermissions(query)
      const list = res.data?.data?.data ?? []

      permissions.value = list

      const p = res.data?.data?.pagination
      if (p) {
        currentPage.value = p.currentPage
        totalPages.value = p.totalPages
        totalItems.value = p.totalItems
        limit.value = query.limit ?? limit.value
      }
      
      return list
    } catch (e) {
      errorPerms.value = e.message || 'Không thể tìm quyền ds'
      
      return []
    } finally {
      loadingPerms.value = false
    }
  }

  async function addPermission() {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      const res = await createPermission({ ...newPermission })

      permissions.value.unshift(res.data)
      Object.assign(newPermission, { name: '', apiPath: '', method: '', module: '' })
    } catch (err) {
      errorPerms.value = err.message || 'Lỗi không xác định'
    } finally {
      loadingPerms.value = false
    }
  }

  async function updateaPermission(id, payload) {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      await updatePermission(id, payload)
      await fetchPermissions(currentPage.value, limit.value)
      
      return true
    } catch (err) {
      errorPerms.value = err.message || 'Lỗi không xác định'
      
      return false
    } finally {
      loadingPerms.value = false
    }
  }

  const findIndexById = id => permissions.value.findIndex(u => u._id === id)

  async function removePermission(id) {
    const idx = findIndexById(id)
    if (idx === -1) return
    const backup = permissions.value[idx]

    permissions.value.splice(idx, 1)
    try {
      await deletePermission(id)
    } catch (e) {
      errorPerms.value = e.message || 'Không thể xoá'
      permissions.value.splice(idx, 0, backup)
    }
  }

  return {
    permissions,
    loadingPerms,
    errorPerms,
    newPermission,
    keyWord,
    currentPage,
    totalPages,
    totalItems,
    limit,
    fetchPermissions,
    fetchPermissionId,
    searchPermissionByQuery,
    addPermission,
    updateaPermission,
    removePermission,
  }
})

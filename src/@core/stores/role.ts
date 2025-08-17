// src/stores/roleStore.js
import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { getRoles, createRole, deleteRole, updateRole, getRoleById } from "@/plugins/api/index"

export const useRoleStore = defineStore("role", () => {
  const error = ref(null)
  const loading = ref(false)
  const keyWord = ref("")

  const newRole = reactive({
    name: "",
    isActive: true,
    description: "",
    permissions: [],
  })

  const roles = ref([])

  const searchRoleByQuery = async () => {
    loading.value = true
    try {
      const res = await getRoles()
      const list = res.data?.data?.result ?? []

      roles.value = list
      
      return list
    } catch (e) {
      error.value = e?.message || "Không thể tìm quyền ds"
      
      return []
    } finally {
      loading.value = false
    }
  }

  const addRole = async () => {
    loading.value = true
    try {
      const response = await createRole({ ...newRole })
      const created = response.data?.data ?? response.data
      if (created) roles.value.push(created)
      error.value = null

      // Reset form
      Object.assign(newRole, { name: "", isActive: true, description: "", permissions: [] })
      
      return true
    } catch (err) {
      error.value = err?.message || "Lỗi khi tạo role"
      
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchRole = async () => {
    loading.value = true
    try {
      const { data } = await getRoles()

      console.log("log role", data?.data?.result)
      roles.value = data?.data?.result ?? []
      
      return roles.value
    } catch (e) {
      error.value = e?.message || "Lỗi khi tải danh sách vai trò"
      
      return []
    } finally {
      loading.value = false
    }
  }

  const findUserId = id => roles.value.findIndex(u => u._id === id)

  const removeRole = async id => {
    const index = findUserId(id)
    if (index === -1) return
    const orinalUser = roles.value[index]

    roles.value.splice(index, 1)
    try {
      const response = await deleteRole(id)

      console.log("delete response", response)
      if (!response) {
        throw new Error("không thể xoá")
      }
    } catch (e) {
      error.value = e?.message || "Không thể xoá user"
      roles.value.splice(index, 0, orinalUser)
    }
  }

  const updateaRole = async (id, payload) => {
    loading.value = true
    try {
      console.log("Sending payload edit:", JSON.stringify(payload, null, 2))

      const response = await updateRole(id, payload)
      const updated = response.data?.data ?? response.data

      // If the role exists locally replace it, otherwise push
      const idx = findUserId(id)
      if (idx !== -1) {
        roles.value.splice(idx, 1, updated)
      } else {
        roles.value.push(updated)
      }
      error.value = null
      
      return true
    } catch (e) {
      error.value = e?.message || "Không thể cập nhật vai trò"
      
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchRoleId = async id => {
    try {
      const { data } = await getRoleById(id)

      console.log(" data đây", data?.data)
      
      return data?.data ?? null
    } catch (e) {
      error.value = e?.message || `Lỗi khi tải user ${id}`
      
      return null
    }
  }

  return {
    newRole,
    roles,
    addRole,
    fetchRole,
    error,
    loading,
    keyWord,
    removeRole,
    updateaRole,
    fetchRoleId,
    searchRoleByQuery,
  }
})

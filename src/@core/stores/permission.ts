import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Permission } from '../types/permission';
import {
  getPermissions,
  deletePermission,
  getPermissionId,
  updatePermission,
  createPermission
} from '../api/index';
type NewPermission = Omit<Permission, '_id'>;

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<Permission[]>([]);
  const loadingPerms = ref(false);
  const errorPerms = ref<string | null>(null);
  const newPermission = reactive<NewPermission>({
    name: '',
    apiPath: '',
    method: '',
    module: ''
  });
  const keyWord = ref<string>('');

  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);
  const limit = ref(10);

  async function fetchPermissions(page = 1, limitParam = 10) {
    loadingPerms.value = true;
    errorPerms.value = null;
    try {
      const res = await getPermissions({ page, limit: limitParam });
      const list = res.data?.data?.data ?? [];
      permissions.value = list;
      const p = res.data?.data?.pagination;
      currentPage.value = p.currentPage;
      totalPages.value = p.totalPages;
      totalItems.value = p.totalItems;
      limit.value = limitParam;
    } catch (err: any) {
      errorPerms.value = err.message || 'Lỗi không xác định';
      permissions.value = [];
    } finally {
      loadingPerms.value = false;
    }
  }

  async function fetchPermissionId(id: string) {
    loadingPerms.value = true;
    errorPerms.value = null;
    try {
      const res = await getPermissionId(id);
      return res.data?.data;
    } catch (err: any) {
      errorPerms.value = err.message || 'Lỗi không xác định';
      return null;
    } finally {
      loadingPerms.value = false;
    }
  }

  // Expanded to support page & limit
  async function searchPermissionByQuery(
    query: { name?: string; page?: number; limit?: number }
  ) {
    loadingPerms.value = true;
    errorPerms.value = null;
    try {
      const res = await getPermissions(query);
      const list = res.data?.data?.data ?? [];
      permissions.value = list;
      const p = res.data?.data?.pagination;
      if (p) {
        currentPage.value = p.currentPage;
        totalPages.value = p.totalPages;
        totalItems.value = p.totalItems;
        limit.value = query.limit ?? limit.value;
      }
      return list;
    } catch (e: any) {
      errorPerms.value = e.message || 'Không thể tìm quyền ds';
      return [];
    } finally {
      loadingPerms.value = false;
    }
  }

  async function addPermission() {
    loadingPerms.value = true;
    errorPerms.value = null;
    try {
      const res = await createPermission({ ...newPermission });
      permissions.value.unshift(res.data);
      Object.assign(newPermission, { name: '', apiPath: '', method: '', module: '' });
    } catch (err: any) {
      errorPerms.value = err.message || 'Lỗi không xác định';
    } finally {
      loadingPerms.value = false;
    }
  }

  async function updateaPermission(id: string, payload: Partial<Permission>) {
    loadingPerms.value = true;
    errorPerms.value = null;
    try {
      await updatePermission(id, payload);
      await fetchPermissions(currentPage.value, limit.value);
      return true;
    } catch (err: any) {
      errorPerms.value = err.message || 'Lỗi không xác định';
      return false;
    } finally {
      loadingPerms.value = false;
    }
  }

  const findIndexById = (id: string) =>
    permissions.value.findIndex((u) => u._id === id);

  async function removePermission(id: string) {
    const idx = findIndexById(id);
    if (idx === -1) return;
    const backup = permissions.value[idx];
    permissions.value.splice(idx, 1);
    try {
      await deletePermission(id);
    } catch (e: any) {
      errorPerms.value = e.message || 'Không thể xoá';
      permissions.value.splice(idx, 0, backup);
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
    removePermission
  };
});

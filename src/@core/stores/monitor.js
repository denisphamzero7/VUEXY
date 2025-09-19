// src/stores/monitor.js

import { defineStore } from 'pinia'
import { ref } from 'vue'

// Import hàm createMonitor từ file API của bạn
import { createMonitor as apiCreateMonitor } from '@/composables/useMyApi'

export const useMonitorStore = defineStore('monitor', () => {
  // === STATE ===
  const loading = ref(false)
  const error = ref(null)

  // === ACTIONS ===

  /**
   * Tạo một monitor log mới
   * @param {object} payload - Dữ liệu từ form
   */
  const createNewMonitorLog = async payload => {
    loading.value = true
    error.value = null
    
    console.log('[monitorStore] Bắt đầu tạo log với payload:', payload)

    try {
      // Gọi đến hàm API đã import
      const response = await apiCreateMonitor(payload)

      // Kiểm tra response (tùy theo API của bạn trả về gì)
      if (response && response.status < 300) {
        console.log('[monitorStore] Tạo log thành công:', response.data)
        
        return response.data // Trả về dữ liệu nếu thành công
      } else {
        // Ném lỗi nếu status không thành công
        throw new Error('Phản hồi từ server không thành công.')
      }

    } catch (e) {
      console.error('[monitorStore] Lỗi khi tạo log:', e)

      // Gán lỗi để component có thể truy cập
      error.value = e.response?.data?.message || e.message || 'Đã có lỗi xảy ra khi gửi báo cáo.'
      
      // Ném lại lỗi để component có thể bắt và xử lý
      throw error.value
    } finally {
      // Luôn tắt loading sau khi hoàn tất
      loading.value = false
    }
  }

  // === RETURN ===
  return {
    // State
    loading,
    error,
    
    // Actions
    createNewMonitorLog,
  }
})

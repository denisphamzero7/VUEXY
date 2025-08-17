<script setup lang="ts">
import { ref } from "vue"

const Roles = ref([
  { name: 'Quản trị viên hệ thống', title: 'Vui lòng chọn vai trò', checked: false },
  { name: 'Quản trị đơn vị A',    title: 'Vui lòng chọn vai trò', checked: false },
  { name: 'Thử vai trò',         title: 'Vui lòng chọn vai trò', checked: false },
  { name: 'Vai trò toàn quyền',  title: 'Vui lòng chọn vai trò', checked: false },
  { name: 'Người dùng hệ thống',  title: 'Vui lòng chọn vai trò', checked: false },
])
</script>

<template>
  <VCard class="pa-6" elevation="2" height="100%">
    <VCardTitle class="pa-0">
      <div class="d-flex flex-column">
        <span class="text-h5 ma-0">Vai trò & Tổ chức</span>
        <span class="text-caption font-medium mb-2 mb-0">
          Lựa chọn vai trò và tổ chức quản lý cho người dùng
        </span>
      </div>
    </VCardTitle>

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <!-- cột checkbox trống tiêu đề -->
          <th style="width:56px;"></th>
          <th>Tên vai trò</th>
          <th>Tổ chức/Đơn vị</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in Roles" :key="index">
          <!-- cột checkbox: căn giữa, không có label -->
          <td class="d-flex align-center justify-center pa-0" style="width:56px;">
            <VCheckbox
              v-model="item.checked"
              density="compact"
              hide-details
              class="ma-0"
              :aria-label="item.name"
            />
          </td>

          <!-- cột tên vai trò (không nằm trong label của checkbox) -->
          <td class="pa-0" style="vertical-align: middle;">
            <span class="ms-2">{{ item.name }}</span>
          </td>

          <td class="text-caption pa-0" style="vertical-align: middle;">
            {{ item.title }}
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

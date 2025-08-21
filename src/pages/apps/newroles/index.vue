<script setup>
import RoleCards from '@/views/apps/newroles/RoleCards.vue'
import UserList from '@/pages/pages/user/list/index.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-1">
        Danh sách vai trò
      </h4>
      <p class="text-body-1 mb-0">
        Một vai trò cung cấp quyền truy cập vào các menu và tính năng được xác định trước để tùy thuộc vào vai trò được chỉ định, người quản trị có thể truy cập vào những gì họ cần
      </p>
    </VCol>

    <!-- 👉 Roles Cards -->
    <VCol cols="12">
      <RoleCards />
    </VCol>

    <VCol cols="12">
      <h4 class="text-h4 mb-1 mt-6">
        Tổng số người dùng với vai trò của họ
      </h4>
      <p class="text-body-1 mb-0">
        Tìm tất cả tài khoản quản trị viên của công ty bạn và vai trò liên kết của họ.
      </p>
    </VCol>

    <VCol cols="12">
      <!-- 👉 User List  -->
      <UserList />
    </VCol>
  </VRow>
</template>

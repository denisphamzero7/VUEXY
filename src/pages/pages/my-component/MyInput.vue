<script setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div>
    <!-- for phải trùng id, label cần có text -->
    <label for="dang-nhap">Đăng nhập</label>

    <VInput
      v-bind="$attrs"
      id="dang-nhap"
      class="border rounded px-3 py-1 bg-black"
      color="primary"
    />
  </div>
</template>



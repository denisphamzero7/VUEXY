<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<script lang="ts" setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    layout: 'blank',
  },
})
</script>

<template>
  <div>
    <p>
      ohhh,bạn đã saiii ạ
       <RouterLink tag="p" to="/">Go back home</RouterLink>
    </p>
  </div>
</template>

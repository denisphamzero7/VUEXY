<template>
  <div>
    <p>This is user details page.</p>
    <p>Current user id: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { id } = route.params
 
console.log(id)
</script>

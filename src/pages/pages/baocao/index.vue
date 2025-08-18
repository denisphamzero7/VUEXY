<script setup lang="ts">
import FilterPanel from './FilterPanel.vue'
import Listbaocao from './listbaocao.vue'
import StatCard from './StatCard.vue'
import ReportList from './ReportList.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <StatCard />
    </VCol>
    <VCol cols="12">
      <FilterPanel />
    </VCol>
    <VCol col="12">
      <ReportList />
    </VCol>
  </VRow>
</template>

<!-- <Listbaocao /> -->

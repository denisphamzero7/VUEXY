<script setup>
import LogisticsCardStatistics from '@/views/apps/newlogistics/LogisticsCardStatistics.vue'
import LogisticsDeliveryExpectations from '@/views/apps/newlogistics/LogisticsDeliveryExpectations.vue'
import LogisticsDeliveryPerformance from '@/views/apps/newlogistics/LogisticsDeliveryPerformance.vue'
import LogisticsOrderByCountries from '@/views/apps/newlogistics/LogisticsOrderByCountries.vue'
import LogisticsOverviewTable from '@/views/apps/newlogistics/LogisticsOverviewTable.vue'
import LogisticsShipmentStatistics from '@/views/apps/newlogistics/LogisticsShipmentStatistics.vue'
import LogisticsVehicleOverview from '@/views/apps/newlogistics/LogisticsVehicleOverview.vue'

const User= [{
  name: "hậu",
  lop: "3",
},
{
  name: "hậu",
  lop: "3",
},
{
  name: "hậu",
  lop: "3",
},
{
  name: "hậu",
  lop: "3",
},
{
  name: "hậu",
  lop: "3",
}]
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <LogisticsCardStatistics />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <LogisticsVehicleOverview />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <LogisticsShipmentStatistics />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LogisticsDeliveryPerformance />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LogisticsDeliveryExpectations />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LogisticsOrderByCountries />
    </VCol>

    <VCol cols="12">
      <LogisticsOverviewTable />
    </VCol>
  </VRow>
</template>

<script setup>
const vehicleData = [
  {
    icon: 'tabler-car',
    title: 'Đang di chuyển',
    time: '2 giờ 10 phút',
    percentage: 39.7,
  },
  {
    icon: 'tabler-circle-arrow-down',
    title: 'Dỡ hàng',
    time: '3 giờ 15 phút',
    percentage: 28.3,
  },
  {
    icon: 'tabler-circle-arrow-up',
    title: 'Xếp hàng',
    time: '1 giờ 24 phút',
    percentage: 17.4,
  },
  {
    icon: 'tabler-clock',
    title: 'Chờ',
    time: '5 giờ 19 phút',
    percentage: 14.6,
  },
]
</script>

<template>
  <VCard>
    <VCardItem title="Tổng quan phương tiện">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>
    <VCardText>
      <div class="d-flex mb-6">
        <div style="inline-size: 39.7%;">
          <div class="vehicle-progress-label position-relative mb-6 text-body-1 d-none d-sm-block">
            Đang di chuyển
          </div>
          <VProgressLinear
            color="rgba(var(--v-theme-on-surface), var(--v-hover-opacity))"
            model-value="100"
            height="46"
            class="rounded-e-0 rounded-lg"
          >
            <div class="text-start text-sm font-weight-medium">
              39.7%
            </div>
          </VProgressLinear>
        </div>
        <div style="inline-size: 28.3%;">
          <div class="vehicle-progress-label position-relative mb-6 text-body-1 d-none d-sm-block">
            Dỡ hàng
          </div>
          <VProgressLinear
            color="rgb(var(--v-theme-primary))"
            model-value="100"
            class="rounded-0"
            height="46"
          >
            <div class="text-white text-sm font-weight-medium text-start">
              28.3%
            </div>
          </VProgressLinear>
        </div>
        <div style="inline-size: 17.4%;">
          <div class="vehicle-progress-label position-relative mb-6 text-body-1 d-none d-sm-block">
            Xếp hàng
          </div>
          <VProgressLinear
            color="rgb(var(--v-theme-info))"
            model-value="100"
            height="46"
            class="rounded-0"
          >
            <div class="text-white text-sm font-weight-medium text-start">
              17.4%
            </div>
          </VProgressLinear>
        </div>
        <div style="inline-size: 14.6%;">
          <div class="vehicle-progress-label position-relative mb-6 text-body-1 d-none d-sm-block">
            Chờ
          </div>
          <VProgressLinear
            color="rgb(var(--v-tooltip-background))"
            model-value="100"
            height="46"
            class="rounded-s-0 rounded-lg"
          >
            <div class="text-sm text-surface font-weight-medium text-start">
              14.6%
            </div>
          </VProgressLinear>
        </div>
      </div>
      <VTable class="text-no-wrap">
        <tbody>
          <tr
            v-for="(vehicle, index) in vehicleData"
            :key="index"
          >
            <td
              width="70%"
              style="padding-inline-start: 0 !important;"
            >
              <div class="d-flex align-center gap-x-2">
                <VIcon
                  :icon="vehicle.icon"
                  size="24"
                  class="text-high-emphasis"
                />
                <div class="text-body-1 text-high-emphasis">
                  {{ vehicle.title }}
                </div>
              </div>
            </td>
            <td>
              <h6 class="text-h6">
                {{ vehicle.time }}
              </h6>
            </td>
            <td>
              <div class="text-body-1">
                {{ vehicle.percentage }}%
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.vehicle-progress-label {
  padding-block-end: 1rem;

  &::after {
    position: absolute;
    display: inline-block;
    background-color: rgba(var(--v-theme-on-surface), var(--v-border-opacity));
    block-size: 10px;
    content: "";
    inline-size: 2px;
    inset-block-end: 0;
    inset-inline-start: 0;

    [dir="rtl"] & {
      inset-inline: unset 0;
    }
  }
}
</style>

<style lang="scss">
.v-progress-linear__content {
  justify-content: start;
  padding-inline-start: 1rem;
}

#shipment-statistics .apexcharts-legend-series {
  padding-inline: 16px;
}

@media (max-width: 1080px) {
  #shipment-statistics .apexcharts-legend-series {
    padding-inline: 12px;
  }

  .v-progress-linear__content {
    padding-inline-start: 0.75rem !important;
  }
}

@media (max-width: 576px) {
  #shipment-statistics .apexcharts-legend-series {
    padding-inline: 8px;
  }

  .v-progress-linear__content {
    padding-inline-start: 0.125rem !important;
  }
}
</style>

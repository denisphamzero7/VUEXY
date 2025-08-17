<script setup>
const logisticData = ref([
  {
    icon: 'tabler-file',
    color: 'primary',
    title: 'Tổng số mẫu',
    subtitle: 'Tổng số đợt báo cáo',
    value: 3,
    change: 18.2,
    isHover: false,
  },
  {
    icon: 'tabler-check',
    color: 'success',
    title: 'Số mẫu hoạt động',
    subtitle: 'Các mẫu báo cáo đang hoạt động',
    value: 0,
    change: -8.7,
    isHover: false,
  },
  {
    icon: 'tabler-file-off',
    color: 'error',
    title: 'Số mẫu ngưng hoạt động',
    subtitle: 'Các mẫu báo cáo đang hoạt động',
    value: 3,
    change: 4.3,
    isHover: false,
  },

])
</script>

<template>
  <VRow>
    <VCol
      v-for="(data, index) in logisticData"
      :key="index"
      cols="12"
      md="4"
      sm="4"
    >
      <div>
        <VCard class="logistics-card-statistics cursor-pointer">
          <VCardText>
            <div class="d-flex justify-space-between">
              <div class="align-center gap-x-4 mb-1">
                <div class="text-body-1 mb-1">
                  {{ data.title }}
                </div>
                <h4 class="text-h4">
                  {{ data.value }}
                </h4>
                <div class="d-flex gap-x-2 align-center">
                  <div class="text-sm text-disabled">
                    {{ data.subtitle }}
                  </div>
                </div>
              </div>
              <div>
                <VAvatar
                  variant="tonal"
                  :color="data.color"
                  rounded
                >
                  <VIcon
                    :icon="data.icon"
                    size="28"
                  />
                </VAvatar>
              </div>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

.logistics-card-statistics {
  border-block-end-style: solid;
  border-block-end-width: 2px;

  &:hover {
    border-block-end-width: 3px;
    margin-block-end: -1px;

    @include mixins.elevation(8);

    transition: all 0.1s ease-out;
  }
}

.skin--bordered {
  .logistics-card-statistics {
    border-block-end-width: 2px;

    &:hover {
      border-block-end-width: 3px;
      margin-block-end: -2px;
      transition: all 0.1s ease-out;
    }
  }
}
</style>

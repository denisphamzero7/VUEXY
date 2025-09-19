<script setup>
import { computed } from "vue"

const props = defineProps({
  statistics: {
    type: Object,
    required: true,
  },
})

const formtemplateSats = computed(()=>[
  { title: 'Tổng số Báo cáo', value: props.statistics.total??0, icon: "tabler-files", desc: "Tất cả báo cáo đã nộp", iconColor: "primary" },
  { title: 'Đã nhận', value: props.statistics.isactive??0, icon: "tabler-file-check", desc: "Báo cáo đã được tiếp nhận", iconColor: "success" },
   { title: 'Chờ tiếp nhận', value: props.statistics.pendin??0, icon: "tabler-file-time", desc: "Các mẫu báo cáo đang hoạt động", iconColor: "success" },
  { title: 'Thu hồi chỉnh sửa', value: props.statistics.anactive??0, icon: "tabler-calendar-off",  desc: "Các mẫu báo cáo không hoạt động", iconColor: "error" },
])
</script>

<template>
  <div class="d-flex mb-6">
    <VRow>
      <template
        v-for="(stat,id) in formtemplateSats"
        :key="id"
      >
        <VCol
          cols="12"
          md="3"
        >
          <VCard>
            <VCardText>
              <div class="d-flex justify-space-between  ">
                <div class="d-flex flex-column gap-y-1">
                  <div class="text-body-2 text-high-emphasis">
                    {{ stat.title }}
                  </div>
                  <div class="d-flex gap-x-2 align-center">
                    <h4 class="text-h4">
                      {{ stat.value }}
                    </h4>
                  </div>
                  <div class="text-body-2">
                    {{ stat.desc }}
                  </div>
                </div>
                <div>
                  <VAvatar
                    :color="stat.iconColor"
                    variant="tonal"
                    rounded
                    size="42"
                  >
                    <VIcon
                      :icon="stat.icon"
                      size="26"
                    />
                  </VAvatar>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </template>
    </VRow>
  </div>
</template>



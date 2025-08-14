<script setup>
const router = useRoute('pages-user-profile-tab')
const projectData = ref([])

const fetchProjectData = async () => {
  if (router.params.tab === 'projects') {
    const data = await $api('/pages/myprofile', { query: { tab: router.params.tab } }).catch(err => console.log(err))

    projectData.value = data
  }
}

watch(router, fetchProjectData, { immediate: true })

const moreList = [
  {
    title: 'Sửa lại tên dự án',
    value: 'Rename Project',
  },
  {
    title: 'Xem chi tiết',
    value: 'View Details',
  },
  {
    title: 'Thêm vào mục yêu thích',
    value: 'Add to favorites',
  },
  {
    type: 'dải phân cáchr',
    class: 'my-2',
  },
  {
    title: 'Rời khỏi dự án',
    value: 'Leave Project',
    class: 'text-error',
  },
]
</script>

<template>
  <VRow v-if="projectData">
    <VCol
      v-for="data in projectData"
      :key="data.title"
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard>
        <VCardItem class="pb-4">
          <template #prepend>
            <VAvatar
              :image="data.avatar"
              size="38"
              class="me-2"
            />
          </template>

          <VCardTitle>{{ data.title }}</VCardTitle>
          <span class="mb-0 text-body-1 d-flex align-center">
            <div class="font-weight-medium me-1">
              Client:
            </div>
            <div>{{ data.client }}</div>
          </span>

          <template #append>
            <div class="mt-n2">
              <MoreBtn
                item-props
                :menu-list="moreList"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <div class="d-flex align-center justify-space-between flex-wrap gap-x-2 gap-y-4">
            <div class="px-3 py-2 bg-var-theme-background rounded">
              <h6 class="text-base font-weight-medium">
                {{ data.budgetSpent }} <span class="text-body-1">/ {{ data.budget }}</span>
              </h6>
              <div>Tổng ngân sách</div>
            </div>

            <div>
              <h6 class="text-base font-weight-medium">
                Ngày bắt đầu: <span class="text-body-1">{{ data.startDate }}</span>
              </h6>
              <h6 class="text-base font-weight-medium">
                Thời hạn: <span class="text-body-1">{{ data.deadline }}</span>
              </h6>
            </div>
          </div>

          <p class="mt-4 mb-0 clamp-text">
            {{ data.description }}
          </p>
        </VCardText>

        <VDivider />

        <VCardText>
          <div class="d-flex align-center justify-space-between flex-wrap gap-2">
            <h6 class="text-base font-weight-medium">
              Tất cả giờ: <span class="text-body-1">
                {{ data.hours }}
              </span>
            </h6>

            <VChip
              label
              :color="data.chipColor"
              size="small"
            >
              {{ data.daysLeft }} Days left
            </VChip>
          </div>

          <div class="d-flex align-center justify-space-between flex-wrap text-caption text-medium-emphasis mt-4 mb-2">
            <span>Nhiệm vụ: {{ data.tasks }}</span>
            <span>{{ Math.round((data.completedTask / data.totalTask) * 100) }}% Completed</span>
          </div>
          <VProgressLinear
            rounded
            rounded-bar
            height="8"
            :model-value="data.completedTask"
            :max="data.totalTask"
            color="primary"
          />

          <div class="d-flex align-center justify-space-between flex-wrap gap-2 mt-4">
            <div class="d-flex align-center">
              <div class="v-avatar-group me-3">
                <VAvatar
                  v-for="avatar in data.avatarGroup"
                  :key="avatar.name"
                  :image="avatar.avatar"
                  :size="32"
                />
              </div>
              <span class="text-body-2 text-disabled">
                {{ data.members }}
              </span>
            </div>

            <span class="d-flex align-center">
              <VIcon
                icon="tabler-message-dots"
                class="me-1 text-disabled"
                size="24"
              />
              <div class="text-disabled text-body-1">{{ data.comments }}</div>
            </span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import bootstrapLogo from '@images/icons/brands/bootstrap-logo.png'
import figmaLogo from '@images/icons/brands/figma-logo.png'
import laravelLogo from '@images/icons/brands/laravel-logo.png'
import reactLogo from '@images/icons/brands/react-logo.png'
import sketchLogo from '@images/icons/brands/sketch-logo.png'
import vuejsLogo from '@images/icons/brands/vuejs-logo.png'

const activeProjects = [
  {
    avatarImg: laravelLogo,
    title: 'Laravel',
    subtitle: 'Thương mại điện tử',
    stats: '65',
    progressColor: 'error',
  },
  {
    avatarImg: figmaLogo,
    title: 'Figma',
    subtitle: 'Bộ giao diện App',
    stats: '86',
    progressColor: 'primary',
  },
  {
    avatarImg: vuejsLogo,
    title: 'VueJs',
    subtitle: 'Ứng dụng lịch',
    stats: '90',
    progressColor: 'success',
  },
  {
    avatarImg: reactLogo,
    title: 'React',
    subtitle: 'Bảng điều khiển',
    stats: '37',
    progressColor: 'info',
  },
  {
    avatarImg: bootstrapLogo,
    title: 'Bootstrap',
    subtitle: 'Trang web',
    stats: '22',
    progressColor: 'primary',
  },
  {
    avatarImg: sketchLogo,
    title: 'Sketch',
    subtitle: 'Thiết kế trang web',
    stats: '29',
    progressColor: 'warning',
  },
]

const moreList = [
  {
    title: 'Làm mới',
    value: 'refresh',
  },
  {
    title: 'Tải xuống',
    value: 'Download',
  },
  {
    title: 'Xem tất cả',
    value: 'View All',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Dự án đang hoạt động</VCardTitle>
      <VCardSubtitle>
        Trung bình hoàn thành 72%
      </VCardSubtitle>
      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn
            size="small"
            :menu-list="moreList"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="project in activeProjects"
          :key="project.title"
        >
          <template #prepend>
            <VAvatar
              size="34"
              rounded
              class="me-1"
            >
              <img :src="project.avatarImg">
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ project.title }}
          </VListItemTitle>
          <VListItemSubtitle class="me-4">
            {{ project.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center gap-x-4">
              <div style="inline-size: 4.875rem;">
                <VProgressLinear
                  :model-value="project.stats"
                  :color="project.progressColor"
                  height="8"
                  rounded-bar
                  rounded
                />
              </div>
              <span class="text-disabled">{{ project.stats }}%</span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
</style>

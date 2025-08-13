<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import pdf from '@images/icons/project-icons/pdf.png'

const moreList = [
  {
    title: 'Xem thêm',
    value: 'View More',
  },
  {
    title: 'Xóa',
    value: 'Delete',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <template #prepend>
        <VIcon
          icon="tabler-list-details"
          size="20"
          color="high-emphasis"
          class="me-1"
        />
      </template>
      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn
            size="small"
            :menu-list="moreList"
          />
        </div>
      </template>

      <VCardTitle>Dòng thời gian hoạt động</VCardTitle>
    </VCardItem>

    <VCardText>
      <VTimeline
        side="end"
        align="start"
        line-inset="8"
        truncate-line="start"
        density="compact"
      >
        <!-- SECTION Timeline Item: Flight -->
        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2">
            <span class="app-timeline-title">
              12 hóa đơn đã được thanh toán
            </span>
            <span class="app-timeline-meta">12 phút trước</span>
          </div>

          <!-- 👉 Content -->
          <div class="app-timeline-text mt-1">
            Các hóa đơn đã được thanh toán cho công ty
          </div>

          <div class="d-inline-flex align-center timeline-chip mt-2">
            <img
              :src="pdf"
              height="20"
              class="me-2"
              alt="img"
            >
            <span class="app-timeline-text font-weight-medium">
              invoice.pdf
            </span>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->

        <!-- SECTION Timeline Item: Interview Schedule -->
        <VTimelineItem
          size="x-small"
          dot-color="success"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between align-center flex-wrap mb-2">
            <div class="app-timeline-title">
              Cuộc họp với khách hàng
            </div>
            <span class="app-timeline-meta">45 phút trước</span>
          </div>

          <div class="app-timeline-text mt-1">
            Họp dự án với John lúc 10:15
          </div>

          <!-- 👉 Person -->
          <div class="d-flex justify-space-between align-center flex-wrap">
            <!-- 👉 Avatar & Personal Info -->
            <div class="d-flex align-center mt-2">
              <VAvatar
                size="32"
                class="me-2"
                :image="avatar1"
              />
              <div class="d-flex flex-column">
                <p class="text-sm font-weight-medium text-medium-emphasis mb-0">
                  Lester McCarthy (Client)
                </p>
                <span class="text-sm">CEO của Pixinvent</span>
              </div>
            </div>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->

        <!-- SECTION Design Review -->
        <VTimelineItem
          size="x-small"
          dot-color="info"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between align-center flex-wrap mb-2">
            <span class="app-timeline-title">
              Tạo dự án mới cho khách hàng
            </span>
            <span class="app-timeline-meta">2 ngày trước</span>
          </div>

          <!-- 👉 Content -->
          <p class="app-timeline-text mt-1 mb-2">
            6 thành viên trong dự án
          </p>

          <div class="v-avatar-group demo-avatar-group">
            <VAvatar :size="40">
              <VImg :src="avatar1" />
              <VTooltip
                activator="parent"
                location="top"
              >
                John Doe
              </VTooltip>
            </VAvatar>

            <VAvatar :size="40">
              <VImg :src="avatar2" />
              <VTooltip
                activator="parent"
                location="top"
              >
                Jennie Obrien
              </VTooltip>
            </VAvatar>

            <VAvatar :size="40">
              <VImg :src="avatar3" />
              <VTooltip
                activator="parent"
                location="top"
              >
                Peter Harper
              </VTooltip>
            </VAvatar>

            <VAvatar
              :size="40"
              :color="$vuetify.theme.current.dark ? '#3A3B59' : '#F0EFF0'"
            >
              +3
            </VAvatar>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->
      </VTimeline>
    </VCardText>
  </VCard>
</template>

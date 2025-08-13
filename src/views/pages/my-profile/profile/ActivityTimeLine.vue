<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import pdf from '@images/icons/project-icons/pdf.png'
</script>

<template>
  <VCard>
    <VCardItem>
      <template #prepend>
        <VIcon
          icon="tabler-chart-bar"
          size="24"
          class="me-2"
        />
      </template>

      <VCardTitle>
        Dòng thời gian hoạt động
      </VCardTitle>
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
            Hóa đơn đã được thanh toán cho công ty
          </div>

          <div class="d-inline-flex align-center timeline-chip mt-2">
            <img
              :src="pdf"
              height="20"
              class="me-2"
              alt="img"
            >
            <span class="app-timeline-text font-weight-medium">
              hóa đơn.pdf
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
              Cuộc họp khách hàng
            </div>
            <span class="app-timeline-meta">45 phút trước</span>
          </div>

          <div class="app-timeline-text mt-1">
            Họp dự án với John lúc 10:15 sáng
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
                  Lester McCarthy (Khách hàng)
                </p>
                <span class="text-sm">CEO of Pixinvent</span>
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
              Tạo một dự án mới cho khách hàng
            </span>
            <span class="app-timeline-meta">2 Ngày trước</span>
          </div>

          <!-- 👉 Content -->
          <p class="app-timeline-text mt-1 mb-2">
            6 đội trong 1 dự án mới
          </p>

          <div class="v-avatar-group demo-avatar-group">
            <VAvatar :size="40">
              <VImg :src="avatar1" />
              <VTooltip
                activator="parent"
                location="top"
              >
                thương
              </VTooltip>
            </VAvatar>

            <VAvatar :size="40">
              <VImg :src="avatar2" />
              <VTooltip
                activator="parent"
                location="top"
              >
                quỳnh
              </VTooltip>
            </VAvatar>

            <VAvatar :size="40">
              <VImg :src="avatar3" />
              <VTooltip
                activator="parent"
                location="top"
              >
                tú anh
              </VTooltip>
            </VAvatar>

            <VAvatar
              :size="40"
              :color="$vuetify.theme.current.dark ? '#373b50' : '#eeedf0'"
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

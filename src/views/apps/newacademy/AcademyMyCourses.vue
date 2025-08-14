<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})


// Data table options
const itemsPerPage = ref(6)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const hideCompleted = ref(true)
const label = ref('All Courses')

const { data: coursesData } = await useApi(createUrl('/apps/newacademy/courses', {
  query: {
    q: () => props.searchQuery,
    hideCompleted,
    label,
    itemsPerPage,
    page,
    sortBy,
    orderBy,
  },
}))

const courses = computed(() => coursesData.value.courses)
const totalCourse = computed(() => coursesData.value.total)

watch([
  hideCompleted,
  label,
  () => props.searchQuery,
], () => {
  page.value = 1
})

const resolveChipColor = tags => {
  if (tags === 'Web')
    return 'primary'
  if (tags === 'Art')
    return 'success'
  if (tags === 'UI/UX')
    return 'error'
  if (tags === 'Psychology')
    return 'warning'
  if (tags === 'Design')
    return 'info'
}
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between align-center flex-wrap gap-4 mb-6">
        <div>
          <h5 class="text-h5">
            Khóa học của tôi
          </h5>
          <div class="text-body-1">
            Tổng cộng 6 khóa bạn đã mua
          </div>
        </div>

        <div class="d-flex flex-wrap gap-x-6 gap-y-4 align-center">
          <AppSelect
            v-model="label"
            :items="[
              { title: 'Web', value: 'web' },
              { title: 'Nghệ thuật', value: 'art' },
              { title: 'UI/UX', value: 'ui/ux' },
              { title: 'Tâm lý học', value: 'psychology' },
              { title: 'Thiết kế', value: 'design' },
              { title: 'Tất cả khóa học', value: 'All Courses' },
            ]"
            style="min-inline-size: 260px;"
          />
          <VSwitch
            v-model="hideCompleted"
            label="Ẩn khóa đã hoàn thành"
          />
        </div>
      </div>

      <!-- 👉 Course List -->
      <div
        v-if="courses.length"
        class="mb-6"
      >
        <VRow>
          <template
            v-for="course in courses"
            :key="course.id"
          >
            <VCol
              cols="12"
              md="4"
              sm="6"
            >
              <VCard
                flat
                border
              >
                <div class="px-2 pt-2">
                  <VImg
                    :src="course.tutorImg"
                    class="cursor-pointer"
                    @click="() => $router.push({ name: 'apps-academy-course-details' })"
                  />
                </div>
                <VCardText>
                  <div class="d-flex justify-space-between align-center mb-4">
                    <VChip
                      variant="tonal"
                      :color="resolveChipColor(course.tags)"
                      size="small"
                    >
                      {{ course.tags }}
                    </VChip>
                    <div class="d-flex">
                      <h6 class="text-h6 text-medium-emphasis align-center me-1">
                        {{ course.rating }}
                      </h6>
                      <VIcon
                        icon="tabler-star-filled"
                        color="warning"
                        size="24"
                        class="me-2"
                      />
                      <div class="text-body-1">
                        ({{ course.ratingCount }})
                      </div>
                    </div>
                  </div>
                  <h5 class="text-h5 mb-1">
                    <RouterLink
                      :to="{ name: 'apps-academy-course-details' }"
                      class="course-title"
                    >
                      {{ course.courseTitle }}
                    </RouterLink>
                  </h5>
                  <p>
                    {{ course.desc }}
                  </p>
                  <div
                    v-if="course.completedTasks !== course.totalTasks"
                    class="d-flex align-center mb-1"
                  >
                    <VIcon
                      icon="tabler-clock"
                      size="20"
                      class="me-1"
                    />
                    <span class="text-body-1 my-auto"> {{ course.time }}</span>
                  </div>
                  <div
                    v-else
                    class="mb-1"
                  >
                    <VIcon
                      icon="tabler-check"
                      size="20"
                      color="success"
                      class="me-1"
                    />
                    <span class="text-success text-body-1">Đã hoàn thành</span>
                  </div>
                  <VProgressLinear
                    :model-value="(course.completedTasks / course.totalTasks) * 100"
                    rounded
                    color="primary"
                    height="8"
                    class="mb-4"
                  />
                  <div class="d-flex flex-wrap gap-4">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      class="flex-grow-1"
                      :to="{ name: 'apps-academy-course-details' }"
                    >
                      <template #prepend>
                        <VIcon
                          icon="tabler-rotate-clockwise-2"
                          class="flip-in-rtl"
                        />
                      </template>
                      Bắt đầu lại
                    </VBtn>
                    <VBtn
                      v-if="course.completedTasks !== course.totalTasks"
                      variant="tonal"
                      class="flex-grow-1"
                      :to="{ name: 'apps-academy-course-details' }"
                    >
                      <template #append>
                        <VIcon
                          icon="tabler-chevron-right"
                          class="flip-in-rtl"
                        />
                      </template>
                      Tiếp tục
                    </VBtn>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </template>
        </VRow>
      </div>

      <div v-else>
        <h4 class="text-h4 text-center mb-6">
          Không tìm thấy khóa học
        </h4>
      </div>

      <VPagination
        v-model="page"
        active-color="primary"
        first-icon="tabler-chevrons-left"
        last-icon="tabler-chevrons-right"
        show-first-last-page
        :length="Math.ceil(totalCourse / itemsPerPage)"
      />
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.course-title {
  &:not(:hover) {
    color: rgba(var(--v-theme-on-surface), var(--v-text-high-emphasis));
  }
}
</style>

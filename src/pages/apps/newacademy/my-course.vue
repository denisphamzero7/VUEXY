<script setup>
import { VideoPlayer } from '@videojs-player/vue'
import AcademyMyCourses from '@/views/apps/academy/AcademyMyCourses.vue'
import boyAppAcademy from '@images/illustrations/boy-app-academy.png'
import girlAppAcademy from '@images/illustrations/girl-app-academy.png'
import academyCourseIllustration1 from '@images/pages/academy-course-illustration1.png'
import academyCourseIllustration2Dark from '@images/pages/academy-course-illustration2-dark.png'
import academyCourseIllustration2Light from '@images/pages/academy-course-illustration2-light.png'
import guitarCoursePoster from '@images/pages/guitar-course-poster.png'
import singingCoursePoster from '@images/pages/singing-course-poster.png'

const academyCourseIllustration2 = useGenerateImageVariant(academyCourseIllustration2Light, academyCourseIllustration2Dark)
const searchQuery = ref('')
</script>

<template>
  <div>
    <VCard class="mb-6">
      <VCardText class="py-12 position-relative">
        <div
          class="d-flex flex-column gap-y-4 mx-auto"
          :class="$vuetify.display.mdAndUp ? 'w-50' : $vuetify.display.xs ? 'w-100' : 'w-75'"
        >
          <h4
            class="text-h4 text-center text-wrap mx-auto"
            :class="$vuetify.display.mdAndUp ? 'w-75' : 'w-100'"
          >
            Giáo dục, tài năng và cơ hội nghề nghiệp
            <span class="text-primary text-no-wrap"> Tất cả trong một nơi.</span>
          </h4>
          <p class="text-center text-wrap text-body-1 mx-auto mb-0">
            Phát triển kỹ năng của bạn với các khóa học trực tuyến và chứng chỉ đáng tin cậy nhất trong marketing, công nghệ thông tin, lập trình và khoa học dữ liệu.
          </p>
          <div class="d-flex justify-center align-center gap-4 flex-wrap">
            <div
              class="flex-grow-1"
              style="max-inline-size: 350px;"
            >
              <AppTextField
                v-model="searchQuery"
                placeholder="Tìm khóa học"
              />
            </div>
            <VBtn
              color="primary"
              density="comfortable"
              icon="tabler-search"
              class="rounded"
            />
          </div>
        </div>
        <img
          :src="academyCourseIllustration1"
          class="illustration1 d-none d-md-block flip-in-rtl"
          height="180"
        >
        <img
          :src="academyCourseIllustration2"
          class="illustration2 d-none d-md-block"
          height="100"
        >
      </VCardText>
    </VCard>

    <AcademyMyCourses :search-query="searchQuery" />

    <div class="mb-6">
      <VRow>
        <VCol
          v-for="{ title, btnText, color, description, image } in [
            { title: 'Nhận chứng chỉ', description: 'Tìm chương trình chứng chỉ chuyên nghiệp phù hợp với bạn.', btnText: 'Xem chương trình', color: 'primary', image: boyAppAcademy },
            { title: 'Khóa học được đánh giá cao', description: 'Đăng ký ngay các khóa học phổ biến và được đánh giá cao nhất.', btnText: 'Xem khóa học', color: 'error', image: girlAppAcademy },
          ]"
          :key="title"
          cols="12"
          md="6"
        >
          <VCard

            flat
            :color="`rgba(var(--v-theme-${color}), var(--v-selected-opacity))`"
          >
            <VCardText>
              <div class="d-flex justify-space-between gap-4 flex-column-reverse flex-sm-row">
                <div class="text-center text-sm-start">
                  <h5
                    class="text-h5 mb-1"
                    :class="`text-${color}`"
                  >
                    <div class="d-flex justify-space-between gap-4 flex-column-reverse flex-sm-row">
                      <div class="text-center text-sm-start">
                        <h5
                          class="text-h5 mb-1"
                          :class="`text-${color}`"
                        >
                          {{ title }}
                        </h5>
                      </div>
                    </div>
                  </h5>
                  <p
                    class="text-body-1 mx-auto"
                    style="max-inline-size: 300px;"
                  >
                    {{ description }}
                  </p>
                  <VBtn :color="color">
                    {{ btnText }}
                  </VBtn>
                </div>

                <div class="align-self-center">
                  <div class="align-self-center">
                    <img
                      :src="image"
                      height="127"
                      class="flip-in-rtl"
                    >
                  </div>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>

    <VCard>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <div class="d-flex flex-column align-center gap-y-4 h-100 justify-center">
              <VAvatar
                variant="tonal"
                size="52"
                rounded
                color="primary"
              >
                <VIcon
                  icon="tabler-gift"
                  size="36"
                />
              </VAvatar>
              <h4 class="text-h4 font-weight-medium">
                Khóa học miễn phí hôm nay
              </h4>
              <p class="text-body-1 text-center mb-0">
                Chúng tôi cung cấp 284 khóa học trực tuyến miễn phí từ các giảng viên và công ty hàng đầu để giúp bạn bắt đầu hoặc nâng cao kỹ năng nghề nghiệp. Học trực tuyến miễn phí và nhanh chóng ngay hôm nay!
              </p>
              <VBtn>Xem khóa học cao cấp</VBtn>
            </div>
          </VCol>
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
                <VideoPlayer
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                  :poster="guitarCoursePoster"
                  controls
                  plays-inline
                  :height="$vuetify.display.mdAndUp ? 200 : 150"
                  class="w-100 rounded"
                />
              </div>
              <VCardText>
                <h5 class="text-h5 mb-2">
                  Bài học hát đầu tiên của bạn
                </h5>
                <p class="text-body-1 mb-0">
                  Cũng giống như các lĩnh vực nghệ thuật khác, ca hát rất phù hợp để tự học.
                </p>
              </VCardText>
            </VCard>
          </VCol>
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
                <VideoPlayer
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                  :poster="singingCoursePoster"
                  controls
                  plays-inline
                  :height="$vuetify.display.mdAndUp ? 200 : 150"
                  class="w-100 rounded"
                />
              </div>
              <VCardText>
                <h5 class="text-h5 mb-2">
                  Guitar cho người mới bắt đầu
                </h5>
                <p class="text-body-1 mb-0">
                  Đàn Fender Acoustic là lựa chọn tốt cho cả người mới bắt đầu và người chơi chuyên nghiệp.
                </p>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@import "video.js/dist/video-js.css";

.illustration1 {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.illustration2 {
  position: absolute;
  inset-block-start: 2rem;
  inset-inline-start: 2.5rem;
}
</style>

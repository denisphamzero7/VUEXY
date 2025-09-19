<template>
  <VContainer style="background-color: #f6ebe6">
    <VRow justify="center">
      <VCol
        cols="12"
        md="8"
        lg="6"
      >
        <VCard>
          <VImg
            src="https://lh7-rt.googleusercontent.com/formsz/AN7BsVA4yny8rFlNJkztw4iy8b2Zraw4iEiQTCBB1st8ymSc-J-eeDoEow21ah6nuD9cObcaZT34f7p6py0wu-ATHVIz99qEZboh3z3LDzSsrJtkmCFgM6Xxk0-Gi3wwzVE5BQNY2u273Gja4lC8k5dZKyRjacY3FXUe0ft4yqzFEWPAXpHzJ72htpqg8W4jHNrl2S8S_TZ1qxVuWA=w1200?key=PMgCqoaMeXXtAMc2knCbsQ"
            cover
          />
          
          <VCardItem>
            <VCardTitle class="text-h5 text-center font-weight-bold py-3">
              Theo dõi công việc IT Olalani
            </VCardTitle>
          </VCardItem>
          <VCardText>
            <VForm @submit.prevent="handleSubmit">
              <VSelect
                v-model="formData.department"
                :items="departments"
                label="Bộ phận, cá nhân yêu cầu công việc?"
                variant="outlined"
                class="mb-4"
                required
              />

              <VTextField
                v-model="formData.requestTime"
                label="Thời gian nhận yêu cầu?"
                type="time"
                variant="outlined"
                class="mb-4"
                required
              />

              <VTextField
                v-model="formData.completionTime"
                label="Thời gian hoàn thành xử lý?"
                type="time"
                variant="outlined"
                class="mb-4"
                required
              />

              <VSelect
                v-model="formData.jobType"
                :items="jobTypes"
                label="Loại công việc?"
                variant="outlined"
                class="mb-4"
                required
              />

              <VSelect
                v-model="formData.handler"
                :items="handlers"
                label="Người xử lý?"
                variant="outlined"
                class="mb-4"
                required
              />

              <VBtn
                type="submit"
                color="primary"
                block
                size="large"
                class="mt-2"
              >
                Gửi báo cáo
              </VBtn>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref } from "vue"


definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

// Dữ liệu mẫu cho các ô lựa chọn (dropdown)
// Bạn có thể thay đổi các giá trị này hoặc lấy từ API
const departments = ref([
  "Lễ tân",
  "Buồng phòng",
  "Nhà hàng",
  "Kinh doanh",
  "Kế toán",
  "Nhân sự",
])

const jobTypes = ref([
  "Hỗ trợ phần mềm",
  "Hỗ trợ phần cứng",
  "Sự cố mạng",
  "Sửa chữa máy in",
  "Yêu cầu khác",
])

const handlers = ref(["Anh Liễu", "Anh Toàn", "Chị Mai", "Bạn Hùng"])

// Sử dụng một đối tượng ref để lưu trữ tất cả dữ liệu của form
const formData = ref({
  department: null,
  requestTime: "",
  completionTime: "",
  jobType: null,
  handler: null,
})

// Hàm xử lý khi người dùng nhấn nút gửi
const handleSubmit = () => {
  // In dữ liệu ra console để kiểm tra
  console.log("Dữ liệu form đã gửi:", formData.value)

  // Tại đây, bạn có thể gọi API để gửi dữ liệu lên server
  alert("Đã gửi báo cáo thành công!")

  // (Tùy chọn) Reset form sau khi gửi
  // formData.value = {
  //   department: null,
  //   requestTime: '',
  //   completionTime: '',
  //   jobType: null,
  //   handler: null,
  // };
}
</script>

<style scoped>
/* Thêm một chút style để tiêu đề nổi bật hơn */
.v-card-title {
  color: #d32f2f; /* Màu đỏ đậm giống Google Form */
}
</style>

<template>
  <section class="form-section">
    <VContainer>
      <VRow justify="center">
        <VCol
          cols="12"
          md="8"
          lg="6"
        >
          <VCard
            color="transparent"
            elevation="0"
            variant="text"
          >
            <VCard>
              <VImg
                src="https://lh7-rt.googleusercontent.com/formsz/AN7BsVA4yny8rFlNJkztw4iy8b2Zraw4iEiQTCBB1st8ymSc-J-eeDoEow21ah6nuD9cObcaZT34f7p6py0wu-ATHVIz99qEZboh3z3LDzSsrJtkmCFgM6Xxk0-Gi3wwzVE5BQNY2u273Gja4lC8k5dZKyRjacY3FXUe0ft4yqzFEWPAXpHzJ72htpqg8W4jHNrl2S8S_TZ1qxVuWA=w1200?key=PMgCqoaMeXXtAMc2knCbsQ"
                cover
              />
            </VCard>
            
            <VCard class="mt-4">
              <VCardItem>
                <VCardTitle class="text-h5">
                  Theo dõi công việc IT Olalani
                </VCardTitle>

                <VCardSubtitle class="mt-2 text-subtitle-3">
                  BẢNG THEO DÕI CÔNG VIỆC IT OLALANI HÀNG NGÀY ĐỂ GIÁM SÁT
                </VCardSubtitle>
              </VCardItem>
              
              <VDivider />

              <VCardText>
                <div class="d-flex justify-space-between align-center">
                  <div class="d-flex align-center">
                    <p class="text-body-1 me-2 mb-0">
                      pnhau2001@gmail.com
                    </p>
                    <a
                      href="#"
                      class="text-caption text-primary"
                    >Chuyển tài khoản</a>
                  </div>
                  <VIcon icon="tabler-cloud" />
                </div>

                <p class="text-caption mt-2 mb-0">
                  <VIcon
                    icon="tabler-mail"
                    size="small"
                    class="me-1"
                  />
                  Không được chia sẻ
                </p>
  
                <VDivider class="my-4" />

                <p class="text-caption text-error mb-0">
                  * Biểu thị câu hỏi bắt buộc
                </p>
              </VCardText>
            </VCard>

            <VForm
              ref="form"
              v-model="isFormValid"
              class="mt-4"
              @submit.prevent="handleSubmit"
            >
              <VCard class="mb-4">
                <VCardText>
                  <VSelect
                    v-model="formData.requestingDepartment"
                    :items="departments"
                    label="Bộ phận, cá nhân yêu cầu công việc?"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <VTextField
                    v-model="formData.timein"
                    label="Thời gian nhận yêu cầu?"
                    type="time"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <VTextField
                    v-model="formData.timeout"
                    label="Thời gian hoàn thành xử lý?"
                    type="time"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <VSelect
                    v-model="formData.workType"
                    :items="jobTypes"
                    label="Loại công việc?"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <label class="v-label text-body-2 mb-2">Người xử lý?</label>
                  <div class="d-flex flex-wrap">
                    <VCheckbox
                      v-for="name in handlers"
                      :key="name"
                      v-model="formData.handler"
                      :label="name"
                      :value="name"
                      :rules="checkboxRule"
                      class="me-4"
                      hide-details
                    />
                  </div>
                  <div
                    v-if="showCheckboxError"
                    class="v-messages text-error mt-1"
                    style="font-size: 12px;"
                  >
                    Đây là một câu hỏi bắt buộc
                  </div>
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <VRadioGroup
                    v-model="formData.status"
                    label="Trạng thái xử lý?"
                    :rules="requiredRule"
                    hide-details="auto"
                  >
                    <VRadio
                      v-for="item in statuses"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </VRadioGroup>
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <VTextField
                    v-model="formData.area"
                    label="Cá nhân / Phòng / Khu vực?"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>
              
              <VCard class="mb-4">
                <VCardText>
                  <VTextarea
                    v-model="formData.description"
                    label="Mô tả công việc"
                    rows="3"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>

              <VCard class="mb-4">
                <VCardText>
                  <VTextField
                    v-model="formData.result"
                    label="Kết quả xử lý"
                    :rules="requiredRule"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>
              
              <VCard class="mb-4">
                <VCardText>
                  <VTextarea
                    v-model="formData.note"
                    label="Ghi chú (Nếu có)"
                    rows="2"
                    hide-details="auto"
                  />
                </VCardText>
              </VCard>
              
              
             <div class="d-flex justify-space-between align-center mt-6">
                <VBtn
                  type="submit"
                  color="#c5382a"
                  :loading="monitorStore.loading"
                >
                  Gửi
                </VBtn>

                <a
                  href="#"
                  class="text-primary text-caption font-weight-medium"
                  @click.prevent="clearForm"
                >
                  Xóa hết câu trả lời
                </a>
              </div>
            </VForm>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>

<script setup>
// Script setup không có gì thay đổi
import { ref } from "vue"
import { useMonitorStore } from '@core/stores/monitor'
import { useRouter } from "vue-router"

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const monitorStore = useMonitorStore()
const router = useRouter()

const form = ref(null)
const isFormValid = ref(false)

const departments = ref(["Lễ tân", "Buồng phòng", "Nhà hàng", "Kinh doanh", "Kế toán", "Nhân sự", "IT"])
const jobTypes = ref(["Hỗ trợ phần mềm", "Hỗ trợ phần cứng", "Sự cố mạng", "Sửa chữa máy in", "Yêu cầu khác"])
const handlers = ref(["Anh Liễu", "Anh Toàn", "Chị Mai", "Bạn Hùng", "Anh Hậu"])
const statuses = ref(["Hoàn thành", "Đang xử lý", "Chờ phản hồi"])

const initialFormData = {
  requestingDepartment: null,
  timein: "",
  timeout: "",
  workType: null,
  handler: [],
  status: null,
  area: "",
  description: "",
  result: "",
  note: "",
}

const formData = ref({ ...initialFormData })

const requiredRule = [v => !!v || 'Đây là một câu hỏi bắt buộc']
const checkboxRule = [v => v.length > 0 || 'Đây là một câu hỏi bắt buộc']
const showCheckboxError = ref(false)

const clearForm = () => {
  formData.value = { ...initialFormData };
  showCheckboxError.value = false;
  if (form.value) {
    form.value.resetValidation();
  }
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  showCheckboxError.value = formData.value.handler.length === 0

  if (!valid || showCheckboxError.value) {
    return
  }

  try {
    const payload = {
      ...formData.value,
      handler: formData.value.handler.join(', '),
    }
    
    await monitorStore.createNewMonitorLog(payload)
    alert("Gửi báo cáo thành công!")
    formData.value = { ...initialFormData }
    showCheckboxError.value = false
    form.value.resetValidation()
  } catch (error) {
    console.error("Lỗi khi gửi form:", error)
    alert(`Gửi báo cáo thất bại: ${monitorStore.error}`)
  }
}
</script>

<style scoped>
/* style không có gì thay đổi */
.v-card-title {
  color: #3c4043; /* Đổi màu tiêu đề cho giống ảnh */
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 24px !important;
}
.form-section {
  background-color: #f6ebe6;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}
</style>

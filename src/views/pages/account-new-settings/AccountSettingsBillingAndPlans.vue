<script setup>
import BillingHistoryTable from './BillingHistoryTable.vue'
import mastercard from '@images/icons/payments/mastercard.png'
import visa from '@images/icons/payments/visa.png'

const selectedPaymentMethod = ref('credit-debit-atm-card')
const isPricingPlanDialogVisible = ref(false)
const isConfirmDialogVisible = ref(false)
const isCardEditDialogVisible = ref(false)
const isCardDetailSaveBilling = ref(false)

const creditCards = [
  {
    name: 'Tom McBride',
    number: '5531234567899856',
    expiry: '12/24',
    isPrimary: true,
    type: 'visa',
    cvv: '456',
    image: mastercard,
  },
  {
    name: 'Mildred Wagner',
    number: '4851234567895896',
    expiry: '10/27',
    isPrimary: false,
    type: 'mastercard',
    cvv: '123',
    image: visa,
  },
]

const countryList = [
  'Hoa Kỳ',
  'Canada',
  'Vương quốc Anh',
  'Úc',
  'New Zealand',
  'Ấn Độ',
  'Nga',
  'Trung Quốc',
  'Nhật Bản',
]

const currentCardDetails = ref()

const openEditCardDialog = cardDetails => {
  currentCardDetails.value = cardDetails
  isCardEditDialogVisible.value = true
}

const cardNumber = ref(135632156548789)
const cardName = ref('john Doe')
const cardExpiryDate = ref('05/24')
const cardCvv = ref(420)

const resetPaymentForm = () => {
  cardNumber.value = 135632156548789
  cardName.value = 'john Doe'
  cardExpiryDate.value = '05/24'
  cardCvv.value = 420
  selectedPaymentMethod.value = 'credit-debit-atm-card'
}
</script>

<template>
  <VRow>
    <!-- 👉 Current Plan -->
    <VCol cols="12">
      <VCard title="Gói hiện tại">
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <div>
                <div class="mb-6">
                  <h3 class="text-body-1 text-high-emphasis font-weight-medium mb-1">
                    Gói hiện tại của bạn là Basic
                  </h3>
                  <p class="text-body-1">
                    Khởi đầu đơn giản cho mọi người
                  </p>
                </div>

                <div class="mb-6">
                  <h3 class="text-body-1 text-high-emphasis font-weight-medium mb-1">
                    Hoạt động đến 09/12/2021
                  </h3>
                  <p class="text-body-1">
                    Chúng tôi sẽ gửi thông báo khi gói đăng ký hết hạn
                  </p>
                </div>

                <div>
                  <h3 class="text-body-1 text-high-emphasis font-weight-medium mb-1">
                    <span class="me-2">$199 mỗi tháng</span>
                    <VChip
                      color="primary"
                      size="small"
                      label
                    >
                      Phổ biến
                    </VChip>
                  </h3>
                  <p class="text-base mb-0">
                    Gói tiêu chuẩn cho doanh nghiệp vừa và nhỏ
                  </p>
                </div>
              </div>
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VAlert
                icon="tabler-alert-triangle"
                type="warning"
                variant="tonal"
              >
                <VAlertTitle class="mb-1">
                  Chúng tôi cần bạn chú ý!
                </VAlertTitle>

                <span>Gói của bạn cần được cập nhật</span>
              </VAlert>

              <!-- progress -->
              <h6 class="d-flex font-weight-medium text-body-1 text-high-emphasis mt-6 mb-1">
                <span>Ngày</span>
                <VSpacer />
                <span>12 trên 30 ngày</span>
              </h6>

              <VProgressLinear
                color="primary"
                rounded
                model-value="15"
              />

              <p class="text-body-2 mt-1 mb-0">
                Còn 18 ngày trước khi gói của bạn cần cập nhật
              </p>
            </VCol>

            <VCol cols="12">
              <div class="d-flex flex-wrap gap-4">
                <VBtn @click="isPricingPlanDialogVisible = true">
                  Nâng cấp gói
                </VBtn>

                <VBtn
                  color="error"
                  variant="tonal"
                  @click="isConfirmDialogVisible = true"
                >
                  Hủy đăng ký
                </VBtn>
              </div>
            </VCol>
          </VRow>

          <!-- 👉 Confirm Dialog -->
          <ConfirmDialog
            v-model:is-dialog-visible="isConfirmDialogVisible"
            confirmation-question="Bạn có chắc chắn muốn hủy đăng ký không?"
            cancel-msg="Hủy đăng ký đã được hủy!"
            cancel-title="Đã hủy"
            confirm-msg="Đăng ký của bạn đã bị hủy thành công."
            confirm-title="Đã hủy đăng ký!"
          />

          <!-- 👉 plan and pricing dialog -->
          <PricingPlanDialog v-model:is-dialog-visible="isPricingPlanDialogVisible" />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Payment Methods -->
    <VCol cols="12">
      <VCard title="Phương thức thanh toán">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VRow>
                  <!-- 👉 card type switch -->
                  <VCol cols="12">
                    <VRadioGroup
                      v-model="selectedPaymentMethod"
                      inline
                    >
                      <VRadio
                        value="credit-debit-atm-card"
                        label="Thẻ Credit/Debit/ATM"
                        color="primary"
                        class="me-6"
                      />
                      <VRadio
                        value="paypal-account"
                        label="Tài khoản PayPal"
                        color="primary"
                      />
                    </VRadioGroup>
                  </VCol>

                  <VCol cols="12">
                    <VRow>
                      <!-- 👉 Card Number -->
                      <VCol cols="12">
                        <AppTextField
                          v-model="cardNumber"
                          label="Số thẻ"
                          placeholder="1234 1234 1234 1234"
                          type="number"
                        />
                      </VCol>

                      <!-- 👉 Name -->
                      <VCol
                        cols="12"
                        md="6"
                      >
                        <AppTextField
                          v-model="cardName"
                          label="Tên"
                          placeholder="John Doe"
                        />
                      </VCol>

                      <!-- 👉 Expiry date -->
                      <VCol
                        cols="6"
                        md="3"
                      >
                        <AppTextField
                          v-model="cardExpiryDate"
                          label="Hạn sử dụng"
                          placeholder="MM/YY"
                        />
                      </VCol>

                      <!-- 👉 Cvv code -->
                      <VCol
                        cols="6"
                        md="3"
                      >
                        <AppTextField
                          v-model="cardCvv"
                          type="number"
                          label="Mã CVV"
                          placeholder="123"
                        />
                      </VCol>

                      <!-- 👉 Future Billing switch -->
                      <VCol cols="12">
                        <VSwitch
                          v-model="isCardDetailSaveBilling"
                          density="compact"
                          label="Lưu thẻ cho thanh toán sau này?"
                        />
                      </VCol>
                    </VRow>
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn type="submit">
                      Lưu thay đổi
                    </VBtn>
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      @click="resetPaymentForm"
                    >
                      Hủy
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Saved Cards -->
              <VCol
                cols="12"
                md="6"
              >
                <h6 class="text-body-1 text-high-emphasis font-weight-medium mb-6">
                  Thẻ của tôi
                </h6>

                <div class="d-flex flex-column gap-y-6">
                  <VCard
                    v-for="card in creditCards"
                    :key="card.name"
                    flat
                    color="rgba(var(--v-theme-on-surface),var(--v-hover-opacity))"
                  >
                    <VCardText class="d-flex flex-sm-row flex-column">
                      <div class="text-no-wrap">
                        <img
                          :src="card.image"
                          height="25"
                        >
                        <h4 class="my-2 text-body-1 text-high-emphasis d-flex align-center">
                          <div class="me-4 font-weight-medium">
                            {{ card.name }}
                          </div>
                          <VChip
                            v-if="card.isPrimary"
                            label
                            color="primary"
                            size="small"
                          >
                            Chính
                          </VChip>
                        </h4>
                        <div class="text-body-1">
                          **** **** **** {{ card.number.substring(card.number.length - 4) }}
                        </div>
                      </div>

                      <VSpacer />

                      <div class="d-flex flex-column text-sm-end">
                        <div class="d-flex flex-wrap gap-4 order-sm-0 order-1">
                          <VBtn
                            variant="tonal"
                            size="small"
                            @click="openEditCardDialog(card)"
                          >
                            Chỉnh sửa
                          </VBtn>
                          <VBtn
                            color="error"
                            size="small"
                            variant="tonal"
                          >
                            Xóa
                          </VBtn>
                        </div>
                        <span class="text-body-2 my-4 order-sm-1 order-0">Thẻ hết hạn {{ card.expiry }}</span>
                      </div>
                    </VCardText>
                  </VCard>
                </div>

                <!-- 👉 Add Edit Card Dialog -->
                <CardAddEditDialog
                  v-model:is-dialog-visible="isCardEditDialogVisible"
                  :card-details="currentCardDetails"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Billing Address -->
    <VCol cols="12">
      <VCard title="Địa chỉ thanh toán">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- 👉 Company name -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Tên công ty"
                  placeholder="Pixinvent"
                />
              </VCol>

              <!-- 👉 Billing Email -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Email thanh toán"
                  placeholder="pixinvent@email.com"
                />
              </VCol>

              <!-- 👉 Tax ID -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Mã số thuế"
                  placeholder="123 123 1233"
                />
              </VCol>

              <!-- 👉 Vat Number -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Mã số VAT"
                  placeholder="121212"
                />
              </VCol>

              <!-- 👉 Mobile -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  dirty
                  label="Số điện thoại"
                  type="number"
                  prefix="US (+1)"
                  placeholder="+1 123 456 7890"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  label="Quốc gia"
                  :items="countryList"
                  placeholder="Chọn quốc gia"
                />
              </VCol>

              <!-- 👉 Billing Address -->
              <VCol cols="12">
                <AppTextField
                  label="Địa chỉ thanh toán"
                  placeholder="1234 Main St"
                />
              </VCol>

              <!-- 👉 State -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Tỉnh/Thành"
                  placeholder="New York"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Mã bưu chính"
                  type="number"
                  placeholder="100006"
                />
              </VCol>

              <!-- 👉 Actions Button -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn type="submit">
                  Lưu thay đổi
                </VBtn>
                <VBtn
                  type="reset"
                  color="secondary"
                  variant="tonal"
                >
                  Hủy bỏ
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Billing History -->
    <VCol cols="12">
      <BillingHistoryTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }

  .v-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: none;
  }
}
</style>

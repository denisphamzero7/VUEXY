<script setup>
import safeBoxWithGoldenCoin from '@images/misc/3d-safe-box-with-golden-dollar-coins.png'
import spaceRocket from '@images/misc/3d-space-rocket-with-smoke.png'
import dollarCoinPiggyBank from '@images/misc/dollar-coins-flying-pink-piggy-bank.png'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  xs: {
    type: [
      Number,
      String,
    ],
    required: false,
  },
  sm: {
    type: [
      Number,
      String,
    ],
    required: false,
  },
  md: {
    type: [
      String,
      Number,
    ],
    required: false,
  },
  lg: {
    type: [
      String,
      Number,
    ],
    required: false,
  },
  xl: {
    type: [
      String,
      Number,
    ],
    required: false,
  },
})

const annualMonthlyPlanPriceToggler = ref(true)

const pricingPlans = [
  {
    name: 'Cơ bản',
    tagLine: 'Khởi đầu đơn giản cho mọi người',
    logo: dollarCoinPiggyBank,
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    current: true,
    features: [
      '100 phản hồi mỗi tháng',
      'Không giới hạn biểu mẫu và khảo sát',
      'Không giới hạn trường',
      'Công cụ tạo biểu mẫu cơ bản',
      'Tối đa 2 tên miền phụ',
    ],
  },
  {
    name: 'Tiêu chuẩn',
    tagLine: 'Dành cho doanh nghiệp nhỏ và vừa',
    logo: safeBoxWithGoldenCoin,
    monthlyPrice: 49,
    yearlyPrice: 499,
    isPopular: true,
    current: false,
    features: [
      'Phản hồi không giới hạn',
      'Không giới hạn biểu mẫu và khảo sát',
      'Trang hồ sơ Instagram',
      'Tích hợp Google Docs',
      'Trang "Cảm ơn" tùy chỉnh',
    ],
  },
  {
    name: 'Doanh nghiệp',
    tagLine: 'Giải pháp cho tổ chức lớn',
    logo: spaceRocket,
    monthlyPrice: 99,
    yearlyPrice: 999,
    isPopular: false,
    current: false,
    features: [
      'Thanh toán PayPal',
      'Chuyển hướng logic (Logic Jumps)',
      'Tải tệp lên với 5GB lưu trữ',
      'Hỗ trợ tên miền tùy chỉnh',
      'Tích hợp Stripe',
    ],
  },
]
</script>

<template>
  <!-- 👉 Title and subtitle -->
  <div class="text-center">
    <h3 class="text-h3 pricing-title mb-2">
      {{ props.title ? props.title : 'Bảng giá' }}
    </h3>
    <p class="mb-0">
      Tất cả gói bao gồm 40+ công cụ và tính năng nâng cao để thúc đẩy sản phẩm của bạn.
    </p>
    <p class="mb-2">
      Chọn gói phù hợp với nhu cầu của bạn.
    </p>
  </div>

  <!-- 👉 Annual and monthly price toggler -->

  <div class="d-flex font-weight-medium text-body-1 align-center justify-center mx-auto mt-12 mb-6">
    <VLabel
      for="pricing-plan-toggle"
      class="me-3"
    >
      Hàng tháng
    </VLabel>

    <div class="position-relative">
      <VSwitch
        id="pricing-plan-toggle"
        v-model="annualMonthlyPlanPriceToggler"
      >
        <template #label>
          <div class="text-body-1 font-weight-medium">
            Hàng năm
          </div>
        </template>
      </VSwitch>

      <div class="save-upto-chip position-absolute align-center d-none d-md-flex gap-1">
        <VIcon
          icon="tabler-corner-left-down"
          size="24"
          class="flip-in-rtl mt-2 text-disabled"
        />
        <VChip
          label
          color="primary"
          size="small"
        >
          Tiết kiệm tới 10%
        </VChip>
      </div>
    </div>
  </div>

  <!-- SECTION pricing plans -->
  <VRow>
    <VCol
      v-for="plan in pricingPlans"
      :key="plan.logo"
      v-bind="props"
      cols="12"
    >
      <!-- 👉  Card -->
      <VCard
        flat
        border
        :class="plan.isPopular ? 'border-primary border-opacity-100' : ''"
      >
        <VCardText
          style="block-size: 3.75rem;"
          class="text-end"
        >
          <!-- 👉 Popular -->
          <VChip
            v-show="plan.isPopular"
            label
            color="primary"
            size="small"
          >
            Phổ biến
          </VChip>
        </VCardText>

        <!-- 👉 Plan logo -->
        <VCardText>
          <VImg
            :height="120"
            :width="120"
            :src="plan.logo"
            class="mx-auto mb-5"
          />

          <!-- 👉 Plan name -->
          <h4 class="text-h4 mb-1 text-center">
            {{ plan.name }}
          </h4>
          <p class="mb-0 text-body-1 text-center">
            {{ plan.tagLine }}
          </p>

          <!-- 👉 Plan price  -->

          <div class="position-relative">
            <div class="d-flex justify-center pt-5 pb-10">
              <div class="text-body-1 align-self-start font-weight-medium">
                $
              </div>
              <h1 class="text-h1 font-weight-medium text-primary">
                {{ annualMonthlyPlanPriceToggler ? Math.floor(Number(plan.yearlyPrice) / 12) : plan.monthlyPrice }}
              </h1>
              <div class="text-body-1 font-weight-medium align-self-end">
                /tháng
              </div>
            </div>

            <!-- 👉 Annual Price -->
            <span
              v-show="annualMonthlyPlanPriceToggler"
              class="annual-price-text position-absolute text-caption text-disabled pb-4"
            >
              {{ plan.yearlyPrice === 0 ? 'miễn phí' : `USD ${plan.yearlyPrice}/Năm` }}
            </span>
          </div>

          <!-- 👉 Plan features -->

          <VList class="card-list mb-4">
            <VListItem
              v-for="feature in plan.features"
              :key="feature"
            >
              <template #prepend>
                <VIcon
                  size="8"
                  icon="tabler-circle-filled"
                  color="rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))"
                />
              </template>

              <VListItemTitle class="text-body-1">
                {{ feature }}
              </VListItemTitle>
            </VListItem>
          </VList>

          <!-- 👉 Plan actions -->
          <VBtn
            block
            :color="plan.current ? 'success' : 'primary'"
            :variant="plan.isPopular ? 'elevated' : 'tonal'"
            :to="{ name: 'front-pages-payment' }"
            :active="false"
          >
            {{ plan.yearlyPrice === 0 ? 'Gói hiện tại của bạn' : 'Nâng cấp' }}
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <!-- !SECTION  -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1rem;
}

.save-upto-chip {
  inset-block-start: -2.4rem;
  inset-inline-end: -6rem;
}

.annual-price-text {
  inset-block-end: 3%;
  inset-inline-start: 50%;
  transform: translateX(-50%);
}
</style>

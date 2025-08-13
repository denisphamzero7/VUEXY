<script setup>
const transitions = [
  {
    avatarIcon: 'tabler-wallet',
    avatarColor: 'primary',
    title: 'Ví',
    subtitle: 'Starbucks',
    stats: '-$75',
    profit: false,
  },
  {
    avatarIcon: 'tabler-building-bank',
    avatarColor: 'success',
    title: 'Chuyển khoản',
    subtitle: 'Nạp tiền',
    stats: '+$480',
    profit: true,
  },
  {
    avatarIcon: 'tabler-brand-paypal',
    avatarColor: 'error',
    title: 'PayPal',
    subtitle: 'Thanh toán từ khách hàng',
    stats: '+$268',
    profit: true,
  },
  {
    avatarIcon: 'tabler-credit-card',
    avatarColor: 'secondary',
    title: 'MasterCard',
    subtitle: 'Đặt iPhone 13',
    stats: '-$699',
    profit: false,
  },
  {
    avatarIcon: 'tabler-currency-dollar',
    avatarColor: 'info',
    title: 'Giao dịch ngân hàng',
    subtitle: 'Hoàn tiền',
    stats: '+$98',
    profit: true,
  },
  {
    avatarIcon: 'tabler-brand-paypal',
    avatarColor: 'error',
    title: 'PayPal',
    subtitle: 'Thanh toán từ khách hàng',
    stats: '+$126',
    profit: true,
  },
  {
    avatarIcon: 'tabler-building-bank',
    avatarColor: 'success',
    title: 'Chuyển khoản',
    subtitle: 'Thanh toán tiền thuê văn phòng',
    stats: '-$1290',
    profit: false,
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
  <VCard
    title="Giao dịch"
    subtitle="Tổng 58 giao dịch trong tháng này"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <MoreBtn
          size="small"
          :menu-list="moreList"
        />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="transition in transitions"
          :key="transition.title + transition.stats"
        >
          <template #prepend>
            <VAvatar
              size="34"
              :color="transition.avatarColor"
              variant="tonal"
              class="me-1"
              rounded
            >
              <VIcon
                :icon="transition.avatarIcon"
                size="22"
              />
            </VAvatar>
          </template>

          <VListItemTitle>
            {{ transition.title }}
          </VListItemTitle>
          <VListItemSubtitle>
            {{ transition.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <span :class="`${transition.profit ? 'text-success' : 'text-error'} font-weight-medium`">{{ transition.stats }}</span>
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

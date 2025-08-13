<script setup>
import amazonEchoDot from '@images/eCommerce/amazon-echo-dot.png'
import appleWatch from '@images/eCommerce/apple-watch.png'
import headphone from '@images/eCommerce/headphone.png'
import iphone from '@images/eCommerce/iphone.png'
import nike from '@images/eCommerce/nike.png'
import sonyDualsense from '@images/eCommerce/sony-dualsense.png'

const popularProducts = [
  {
    avatarImg: iphone,
    title: 'Apple iPhone 13',
    subtitle: 'Mã hàng: #FXZ-4567',
    stats: '$999.29',
  },
  {
    avatarImg: nike,
    title: 'Nike Air Jordan',
    subtitle: 'Mã hàng: #FXZ-3456',
    stats: '$72.40',
  },
  {
    avatarImg: headphone,
    title: 'Beats Studio 2',
    subtitle: 'Mã hàng: #FXZ-9485',
    stats: '$99',
  },
  {
    avatarImg: appleWatch,
    title: 'Apple Watch Series 7',
    subtitle: 'Mã hàng: #FXZ-2345',
    stats: '$249.99',
  },
  {
    avatarImg: amazonEchoDot,
    title: 'Amazon Echo Dot',
    subtitle: 'Mã hàng: #FXZ-8959',
    stats: '$79.40',
  },
  {
    avatarImg: sonyDualsense,
    title: 'Play Station Console',
    subtitle: 'Mã hàng: #FXZ-7892',
    stats: '$129.48',
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
    title="Sản phẩm phổ biến"
    subtitle="Tổng 10.4k khách truy cập"
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
          v-for="product in popularProducts"
          :key="product.title"
        >
          <template #prepend>
            <VAvatar
              size="46"
              rounded
              class="me-1"
              :image="product.avatarImg"
            />
          </template>

          <VListItemTitle class="font-weight-medium me-4">
            {{ product.title }}
          </VListItemTitle>
          <VListItemSubtitle class="me-4">
            {{ product.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <span class="text-body-1">{{ product.stats }}</span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.25rem;
}
</style>

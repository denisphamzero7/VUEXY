<script setup>
const sourceVisits = [
  {
    avatarIcon: 'tabler-shadow',
    title: 'Nguồn trực tiếp',
    subtitle: 'Nhấp vào liên kết trực tiếp',
    stats: '1.2k',
    profitLoss: 4.2,
  },
  {
    avatarIcon: 'tabler-globe',
    title: 'Mạng xã hội',
    subtitle: 'Kênh xã hội',
    stats: '31.5k',
    profitLoss: 8.2,
  },
  {
    avatarIcon: 'tabler-mail',
    title: 'Bản tin email',
    subtitle: 'Chiến dịch thư',
    stats: '893',
    profitLoss: 2.4,
  },
  {
    avatarIcon: 'tabler-external-link',
    title: 'Giới thiệu',
    subtitle: 'Lượt truy cập bán kính tác động',
    stats: '342',
    profitLoss: -0.4,
  },
  {
    avatarIcon: 'tabler-ad',
    title: 'ADVT',
    subtitle: 'Google ADVT',
    stats: '2.15k',
    profitLoss: 9.1,
  },
  {
    avatarIcon: 'tabler-star',
    title: 'Khác',
    subtitle: 'Nhiều nguồn',
    stats: '12.5k',
    profitLoss: 6.2,
  },
]

const moreList = [
  {
    title: 'làm mới',
    value: 'refresh',
  },
  {
    title: 'Cài đặt',
    value: 'Download',
  },
  {
    title: 'Xem thêm',
    value: 'View All',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Nguồn truy cập</VCardTitle>
      <VCardSubtitle>
       38,4 nghìn lượt truy cập
      </VCardSubtitle>
      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn
            size="small"
            :menu-list="moreList"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="visit in sourceVisits"
          :key="visit.title"
        >
          <template #prepend>
            <VAvatar
              size="38"
              color="secondary"
              variant="tonal"
              class="me-1"
              rounded
            >
              <VIcon
                :icon="visit.avatarIcon"
                size="22"
              />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium me-4">
            {{ visit.title }}
          </VListItemTitle>
          <VListItemSubtitle class="me-4">
            {{ visit.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center gap-x-4">
              <div class="text-body-1">
                {{ visit.stats }}
              </div>
              <VChip
                label
                size="small"
                :color="visit.profitLoss > 0 ? 'success' : 'error'"
              >
                {{ visit.profitLoss > 0 ? '+' : '' }}
                {{ visit.profitLoss }}%
              </VChip>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>

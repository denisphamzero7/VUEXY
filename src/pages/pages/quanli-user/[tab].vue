<script setup>
import Listuser from '@/views/quanly-user/list.vue'

import Adduser from '@/views/quanly-user/adduser.vue'

definePage({
  meta: {
    navActiveLink: 'pages-quanli-user-tab',
    key: 'tab',
    action: 'read',
    subject: 'AclDemo',
  },
})



const route = useRoute('pages-quanli-user-tab')

const activeTab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
})

// tabs
const tabs = [
  {
    title: 'Danh sách người dùng',
    icon: 'tabler-user-check',
    tab: 'user',
  },
  {
    title: 'Thêm người dùng',
    icon: 'tabler-users',
    tab: 'addNewuser',
  },

]
</script>

<template>
  <div>
    <UserProfileHeader />

    <VTabs
      v-model="activeTab"
      class="v-tabs-pill my-2"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'pages-quanli-user-tab', params: { tab: item.tab } }"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="disable-tab-transition"
      :touch="false"
    >
      <!-- Profile -->
      <VWindowItem value="user">
        <Listuser />
      </VWindowItem>

      <!-- Teams -->
      <VWindowItem value="addNewuser">
        <Adduser />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<script setup>
import UserProfileHeader from '@/views/pages/my-profile/UserProfileHeader.vue'
import UserConnections from '@/views/pages/my-profile/connections/index.vue'
import UserProfile from '@/views/pages/my-profile/profile/index.vue'
import UserProjects from '@/views/pages/my-profile/projects/index.vue'
import UserTeam from '@/views/pages/my-profile/team/index.vue'

definePage({
  meta: {
    navActiveLink: 'pages-my-profile-tab',
    key: 'tab',
  },
})

const route = useRoute('pages-my-profile-tab')

const activeTab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
})

// tabs
const tabs = [
  {
    title: 'Hồ sơ',
    icon: 'tabler-user-check',
    tab: 'profile',
  },
  {
    title: 'Nhóm',
    icon: 'tabler-users',
    tab: 'teams',
  },
  {
    title: 'Dự án',
    icon: 'tabler-layout-grid',
    tab: 'projects',
  },
  {
    title: 'Kết nối',
    icon: 'tabler-link',
    tab: 'connections',
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
        :to="{ name: 'pages-my-profile-tab', params: { tab: item.tab } }"
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
      <VWindowItem value="profile">
        <UserProfile />
      </VWindowItem>

      <!-- Teams -->
      <VWindowItem value="teams">
        <UserTeam />
      </VWindowItem>

      <!-- Projects -->
      <VWindowItem value="projects">
        <UserProjects />
      </VWindowItem>

      <!-- Connections -->
      <VWindowItem value="connections">
        <UserConnections />
      </VWindowItem>
    </VWindow>
  </div>
</template>

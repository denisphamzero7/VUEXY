<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar10 from '@images/avatars/avatar-10.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'
import avatar9 from '@images/avatars/avatar-9.png'
import girlUsingMobile from '@images/pages/girl-using-mobile.png'

const roles = ref([
  {
    role: 'Quản trị viên',
    users: [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
    ],
    details: {
      name: 'Quản trị viên',
      permissions: [
        {
          name: 'Quản lí người dùng',
          read: true,
          write: true,
          create: true,
        },
        {
          name: 'Quản lý tranh chấp',
          read: true,
          write: true,
          create: true,
        },
        {
          name: 'API điều khiển',
          read: true,
          write: true,
          create: true,
        },
      ],
    },
  },
  {
    role: 'Quản lý',
    users: [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
      avatar6,
      avatar7,
    ],
    details: {
      name: 'Quản lý',
      permissions: [
        {
          name: 'Báo cáo',
          read: true,
          write: true,
          create: false,
        },
        {
          name: 'Bảng lương',
          read: true,
          write: true,
          create: true,
        },
        {
          name: 'Quản lí người dùng',
          read: true,
          write: true,
          create: true,
        },
      ],
    },
  },
  {
    role: 'Người dùng',
    users: [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
    ],
    details: {
      name: 'Người dùng',
      permissions: [
        {
          name: 'Quản lý người dùng',
          read: true,
          write: false,
          create: false,
        },
        {
          name: 'Quản lý nội dung',
          read: true,
          write: false,
          create: false,
        },
        {
          name: 'Quản lý tranh chấp ',
          read: true,
          write: false,
          create: false,
        },
        {
          name: 'Quản lý database',
          read: true,
          write: false,
          create: false,
        },
      ],
    },
  },
  {
    role: 'Hổ trợ',
    users: [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
      avatar6,
    ],
    details: {
      name: 'Hổ trợ',
      permissions: [
        {
          name: 'Quản lý kho lưu trữ',
          read: true,
          write: true,
          create: false,
        },
        {
          name: 'Quản lý nội dung',
          read: true,
          write: true,
          create: false,
        },
        {
          name: 'Quản lý cơ sở dữ liệu',
          read: true,
          write: true,
          create: false,
        },
      ],
    },
  },
  {
    role: 'Người dùng bị hạn chế',
    users: [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
      avatar6,
      avatar7,
      avatar8,
      avatar9,
      avatar10,
    ],
    details: {
      name: 'Người dùng bị hạn chế',
      permissions: [
        {
          name: 'Quản lý người dùng',
          read: true,
          write: false,
          create: false,
        },
        {
          name: 'Content Management',
          read: true,
          write: false,
          create: false,
        },
        {
          name: 'Quản lý tranh chấp',
          read: true,
          write: false,
          create: false,
        },
        {
          name: 'Quản lý cơ sở dữ liệu',
          read: true,
          write: false,
          create: false,
        },
      ],
    },
  },
])

const isRoleDialogVisible = ref(false)
const roleDetail = ref()
const isAddRoleDialogVisible = ref(false)

const editPermission = value => {
  isRoleDialogVisible.value = true
  roleDetail.value = value
}
</script>

<template>
  <VRow>
    <!-- 👉 Roles -->
    <VCol
      v-for="item in roles"
      :key="item.role"
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard>
        <VCardText class="d-flex align-center pb-4">
          <div class="text-body-1">
            Total {{ item.users.length }} users
          </div>

          <VSpacer />

          <div class="v-avatar-group">
            <template
              v-for="(user, index) in item.users"
              :key="user"
            >
              <VAvatar
                v-if="item.users.length > 4 && item.users.length !== 4 && index < 3"
                size="40"
                :image="user"
              />

              <VAvatar
                v-if="item.users.length === 4"
                size="40"
                :image="user"
              />
            </template>
            <VAvatar
              v-if="item.users.length > 4"
              :color="$vuetify.theme.current.dark ? '#373B50' : '#EEEDF0'"
            >
              <span>
                +{{ item.users.length - 3 }}
              </span>
            </VAvatar>
          </div>
        </VCardText>

        <VCardText>
          <div class="d-flex justify-space-between align-center">
            <div>
              <h5 class="text-h5">
                {{ item.role }}
              </h5>
              <div class="d-flex align-center">
                <a
                  href="javascript:void(0)"
                  @click="editPermission(item.details)"
                >
                  Chỉnh sửa vai trò
                </a>
              </div>
            </div>
            <IconBtn>
              <VIcon
                icon="tabler-copy"
                class="text-high-emphasis"
              />
            </IconBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Add New Role -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard
        class="h-100"
        :ripple="false"
      >
        <VRow
          no-gutters
          class="h-100"
        >
          <VCol
            cols="5"
            class="d-flex flex-column justify-end align-center mt-5"
          >
            <img
              width="85"
              :src="girlUsingMobile"
            >
          </VCol>

          <VCol cols="7">
            <VCardText class="d-flex flex-column align-end justify-end gap-4">
              <VBtn
                size="small"
                @click="isAddRoleDialogVisible = true"
              >
                Thêm role mới
              </VBtn>
              <div class="text-end">
                thêm mới role<br> Nếu như role không tồn tại
              </div>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
      <AddEditRoleDialog v-model:is-dialog-visible="isAddRoleDialogVisible" />
    </VCol>
  </VRow>

  <AddEditRoleDialog
    v-model:is-dialog-visible="isRoleDialogVisible"
    v-model:role-permissions="roleDetail"
  />
</template>

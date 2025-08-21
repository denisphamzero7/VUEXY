<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoleStore } from '@core/stores/role'
import { useUserStore } from '@core/stores/user'
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

// Stores
const roleStore = useRoleStore()
const userStore = useUserStore()

// State
const isRoleDialogVisible = ref(false)
const roleDetail = ref()
const isAddRoleDialogVisible = ref(false)
const loading = ref(false)

// Avatar images array
const avatarImages = [
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
]

// Computed để tạo roles với user count
const rolesWithUsers = computed(() => {
  return roleStore.roles.map(role => {
    // Filter users by role
    const usersWithThisRole = userStore.users.filter(user => {
      // Kiểm tra nếu user.role là object thì lấy _id, nếu là string thì so sánh trực tiếp
      const userRoleId = typeof user.role === 'object' ? user.role?._id || user.role?.id : user.role
      const roleId = role._id || role.id
      
      return userRoleId === roleId
    })

    // Random assign avatars for demo purpose
    const roleUsers = usersWithThisRole.slice(0, 10).map((user, index) => {
      return avatarImages[index % avatarImages.length]
    })

    return {
      role: role.name,
      users: roleUsers,
      userCount: usersWithThisRole.length,
      details: {
        name: role.name,
        description: role.description,
        permissions: role.permissions || [],
        isActive: role.isActive,
        _id: role._id || role.id,
      },
    }
  })
})

// Methods
const editPermission = roleDetails => {
  isRoleDialogVisible.value = true
  roleDetail.value = roleDetails
}

const duplicateRole = async roleDetails => {
  try {
    loading.value = true

    const duplicatedRole = {
      name: `${roleDetails.name} (Copy)`,
      description: roleDetails.description,
      permissions: [...(roleDetails.permissions || [])],
      isActive: roleDetails.isActive,
    }
    
    await roleStore.createNewRole(duplicatedRole)
    
    // Refresh roles list
    await fetchData()
  } catch (error) {
    console.error('Error duplicating role:', error)
  } finally {
    loading.value = false
  }
}

const deleteRole = async roleId => {
  try {
    loading.value = true
    await roleStore.removeRole(roleId)
    
    // Refresh roles list
    await fetchData()
  } catch (error) {
    console.error('Error deleting role:', error)
  } finally {
    loading.value = false
  }
}

const fetchData = async () => {
  try {
    loading.value = true
    
    // Fetch roles và users song song
    await Promise.all([
      roleStore.fetchRoles(),
      userStore.fetchUsers(),
    ])
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const handleAddNewRole = async() => {
  isAddRoleDialogVisible.value = true

}

const onRoleCreated = async () => {
  // Refresh data after role is created
  await fetchData()
}

const onRoleUpdated = async () => {
  // Refresh data after role is updated
  await fetchData()
}

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <!-- Loading overlay -->
    <VOverlay 
      v-model="loading" 
      class="align-center justify-center"
    >
      <VProgressCircular 
        color="primary"
        indeterminate
        size="64"
      />
    </VOverlay>

    <VRow>
      <!-- 👉 Roles -->
      <VCol
        v-for="item in rolesWithUsers"
        :key="item.details._id"
        cols="12"
        sm="6"
        lg="4"
      >
        <VCard>
          <VCardText class="d-flex align-center pb-4">
            <div class="text-body-1">
              Total {{ item.userCount }} users
            </div>

            <VSpacer />

            <div class="v-avatar-group">
              <template
                v-for="(user, index) in item.users"
                :key="index"
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
                <div class="d-flex align-center gap-2">
                  <a
                    href="javascript:void(0)"
                    @click="editPermission(item.details)"
                  >
                    Chỉnh sửa vai trò
                  </a>
                </div>
                
                <!-- Role description if exists -->
                <div 
                  v-if="item.details.description" 
                  class="text-body-2 text-medium-emphasis mt-1"
                >
                  {{ item.details.description }}
                </div>

                <!-- Role status -->
                <VChip
                  :color="item.details.isActive ? 'success' : 'error'"
                  size="x-small"
                  class="mt-2"
                >
                  {{ item.details.isActive ? 'Active' : 'Inactive' }}
                </VChip>
              </div>
              
              <div class="d-flex flex-column gap-1">
                <IconBtn
                  size="small"
                  :loading="loading"
                  @click="duplicateRole(item.details)"
                >
                  <VIcon
                    icon="tabler-copy"
                    class="text-high-emphasis"
                  />
                </IconBtn>
                
                <IconBtn
                  size="small"
                  color="error"
                  :loading="loading"
                  @click="deleteRole(item.details._id)"
                >
                  <VIcon
                    icon="tabler-trash"
                    class="text-high-emphasis"
                  />
                </IconBtn>
              </div>
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
                alt="Add Role"
              >
            </VCol>

            <VCol cols="7">
              <VCardText class="d-flex flex-column align-end justify-end gap-4">
                <VBtn
                  size="small"
                  :loading="loading"
                  @click="handleAddNewRole"
                >
                  Thêm role mới
                </VBtn>
                <div class="text-end">
                  Thêm mới role<br> Nếu như role không tồn tại
                </div>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <!-- Error display -->
    <VAlert
      v-if="roleStore.error || userStore.error"
      type="error"
      class="mt-4"
      closable
    >
      {{ roleStore.error || userStore.error }}
    </VAlert>

    <!-- Dialogs -->
    <AddEditNewRoleDialog 
      v-model:is-dialog-visible="isAddRoleDialogVisible" 
      @role-created="onRoleCreated"
    />

    <AddEditNewRoleDialog
      v-model:is-dialog-visible="isRoleDialogVisible"
      v-model:role-permissions="roleDetail"
      @role-updated="onRoleUpdated"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

// .v-avatar-group {
//   display: flex;
//   align-items: center;

//   .v-avatar {
//     margin-left: -10px; // chồng lên đẹp hơn một chút
//     border: 2px solid #fff; // viền tách biệt avatar
//     border-radius: 50%; // bo tròn tuyệt đối
//     box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

//     // hiệu ứng hover cho avatar
//     transition: transform 0.2s ease, box-shadow 0.2s ease;

//     &:hover {
//       transform: scale(1.1);
//       z-index: 2; // đưa avatar ra trước
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     }
//   }

//   // Avatar đầu tiên giữ nguyên
//   .v-avatar:first-child {
//     margin-left: 0;
//   }
// }
</style>

<script setup>
import { useApi } from '@/composables/useApi'
import { computed } from 'vue'

// Add page meta for ACL protection - only admin can access users list
definePage({
  meta: {
    action: 'read',
    subject: 'User',
  },
})

const { data: usersData } = await useApi('/apps/users')

// Extract users array from the response
const users = computed(() => {
  const data = usersData.value
  
  return data?.users || []
})

// Edit and delete functionality
const isEditDialogVisible = ref(false)
const isDeleteDialogVisible = ref(false)
const selectedUser = ref(null)
const isLoading = ref(false)

// Form data for editing
const editForm = ref({
  fullName: '',
  email: '',
  role: '',
})

// Open edit dialog
const openEditDialog = user => {
  selectedUser.value = user
  editForm.value = {
    fullName: user.fullName || '',
    email: user.email || '',
    role: user.role || '',
  }
  isEditDialogVisible.value = true
}

// Open delete dialog
const openDeleteDialog = user => {
  selectedUser.value = user
  isDeleteDialogVisible.value = true
}

// Save edited user
const saveUser = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  try {
    await $api(`/apps/users/${selectedUser.value.id}`, {
      method: 'PUT',
      body: editForm.value,
    })
    
    // Refresh data
    await usersData.value?.execute?.()
    
    isEditDialogVisible.value = false
    selectedUser.value = null
  } catch (error) {
    console.error('Error updating user:', error)
  } finally {
    isLoading.value = false
  }
}

// Delete user
const deleteUser = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  try {
    await $api(`/apps/users/${selectedUser.value.id}`, {
      method: 'DELETE',
    })
    
    // Refresh data
    await usersData.value?.execute?.()
    
    isDeleteDialogVisible.value = false
    selectedUser.value = null
  } catch (error) {
    console.error('Error deleting user:', error)
  } finally {
    isLoading.value = false
  }
}

// Helper functions
const resolveUserRoleVariant = role => {
  const roleVariants = {
    admin: { color: 'error', icon: 'tabler-crown' },
    author: { color: 'warning', icon: 'tabler-pen' },
    editor: { color: 'info', icon: 'tabler-edit' },
    maintainer: { color: 'success', icon: 'tabler-settings' },
    subscriber: { color: 'primary', icon: 'tabler-user' },
    client: { color: 'secondary', icon: 'tabler-user' },
  }
  
  return roleVariants[role] || { color: 'default', icon: 'tabler-user' }
}

const avatarText = name => {
  if (!name) 
    return 'U'
  
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

console.log('usersData', usersData.value)
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for="(user, index) in users"
        :key="user.id || index"
        cols="12"
        md="6"
        lg="4"
      >
        <VCard>
          <VCardText>
            <div class="d-flex align-center gap-3">
              <VAvatar
                size="34"
                :variant="!user.avatar ? 'tonal' : undefined"
                :color="!user.avatar ? resolveUserRoleVariant(user.role).color : undefined"
              >
                <VImg
                  v-if="user.avatar"
                  :src="user.avatar"
                />
                <span v-else>{{ avatarText(user.fullName) }}</span>
              </VAvatar>
              <div class="flex-grow-1">
                <p class="text-h6 font-weight-medium mb-1">
                  {{ user?.fullName || 'Unknown User' }}
                </p>
                <p class="text-body-2 text-medium-emphasis">
                  {{ user?.email || 'No email' }}
                </p>
                <p class="text-caption">
                  {{ user?.role || 'No role' }}
                </p>
              </div>
              
              <!-- Action buttons -->
              <div class="d-flex gap-1">
                <VBtn
                  icon
                  variant="text"
                  size="small"
                  color="primary"
                  @click="openEditDialog(user)"
                >
                  <VIcon icon="tabler-edit" />
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  size="small"
                  color="error"
                  @click="openDeleteDialog(user)"
                >
                  <VIcon icon="tabler-trash" />
                </VBtn>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Edit User Dialog -->
    <VDialog
      v-model="isEditDialogVisible"
      max-width="500"
      persistent
    >
      <VCard>
        <VCardTitle>
          Chỉnh sửa người dùng
        </VCardTitle>
        <VCardText>
          <VForm @submit.prevent="saveUser">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="editForm.fullName"
                  label="Họ tên"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="editForm.email"
                  label="Email"
                  type="email"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VSelect
                  v-model="editForm.role"
                  label="Vai trò"
                  :items="[
                    { title: 'Admin', value: 'admin' },
                    { title: 'Author', value: 'author' },
                    { title: 'Editor', value: 'editor' },
                    { title: 'Maintainer', value: 'maintainer' },
                    { title: 'Subscriber', value: 'subscriber' },
                    { title: 'Client', value: 'client' },
                  ]"
                  required
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            variant="text"
            @click="isEditDialogVisible = false"
          >
            Hủy
          </VBtn>
          <VBtn
            color="primary"
            :loading="isLoading"
            @click="saveUser"
          >
            Lưu
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Delete User Dialog -->
    <VDialog
      v-model="isDeleteDialogVisible"
      max-width="400"
      persistent
    >
      <VCard>
        <VCardTitle>
          Xác nhận xóa
        </VCardTitle>
        <VCardText>
          Bạn có chắc chắn muốn xóa người dùng 
          <strong>{{ selectedUser?.fullName }}</strong>?
          <br>
          Hành động này không thể hoàn tác.
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            variant="text"
            @click="isDeleteDialogVisible = false"
          >
            Hủy
          </VBtn>
          <VBtn
            color="error"
            :loading="isLoading"
            @click="deleteUser"
          >
            Xóa
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </section>
</template>


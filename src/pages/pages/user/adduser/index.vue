<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@core/stores/user'
import avatarDefault from '@images/avatars/avatar-1.png'

const router = useRouter()
const userStore = useUserStore()

/* --- Form local --- */
const form = reactive({
  firstName: '',
  lastName: '',
  name: '', // fallback full name
  email: '',
  password: '',
  age: null,
  phone: '',
  gender: '',
  address: '',
  role: '',
  companyId: '',
  avatar: null, // base64 data/url
  state: '',
  zip: '',
  country: '',
  language: '',
  timezone: '',
  currency: '',
})

/* avatar */
const avatarPreview = ref(avatarDefault)
const fileInputRef = ref(null)

/* selects loaded from store */
const companies = ref([])
const roles = ref([])

/* UI state */
const loadingSelects = ref(false)
const errors = ref(null)
const previewDialog = ref(false) // optional preview dialog kept
const saving = computed(() => userStore.loading)

/* Avatar handlers */
function onChangeAvatar(evt) {
  const files = evt.target.files
  if (!files || !files.length) return
  const file = files[0]

  const maxSize = 800 * 1024 // 800KB
  if (file.size > maxSize) {
    errors.value = 'Ảnh quá lớn — tối đa 800KB'
    
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    avatarPreview.value = reader.result
    form.avatar = reader.result
  }
  reader.readAsDataURL(file)
}

function triggerFile() {
  fileInputRef.value?.click()
}

function resetAvatar() {
  avatarPreview.value = avatarDefault
  form.avatar = null
}

/* Load companies & roles */
onMounted(async () => {
  loadingSelects.value = true
  try {
    companies.value = (await userStore.fetchCompanies()) || []
    roles.value = (await userStore.fetchRoles()) || []
  } catch (e) {
    console.warn('Không load được selects:', e)
  } finally {
    loadingSelects.value = false
  }
})

/* Build payload like old page */
function buildPayloadForCreate() {
  const fullName = `${form.firstName} ${form.lastName}`.trim()
  const nameToSend = fullName || form.name || ''
  const companyName = companies.value.find(c => c._id === form.companyId)?.name || ''

  return {
    name: nameToSend,
    email: form.email?.trim() || '',
    password: form.password || undefined,
    age: form.age,
    phone: form.phone,
    gender: form.gender,
    address: form.address?.trim() || '',
    role: form.role,
    company: {
      _id: form.companyId,
      name: companyName,
    },
    avatar: form.avatar ? form.avatar : undefined,
  }
}

/* Handle create (gọi store.createNewUser) */
async function handleCreateUser() {
  errors.value = null

  // basic validation (giống cũ)
  const fullName = `${form.firstName} ${form.lastName}`.trim()
  const nameToCheck = fullName || form.name
  if (!nameToCheck || !form.email) {
    errors.value = 'Vui lòng nhập tên và email.'
    
    return
  }

  const payload = buildPayloadForCreate()
  try {
    const created = await userStore.createNewUser(payload)

    if (created) {
      // refresh danh sách nếu cần
      await userStore.fetchUsers(userStore.currentPage ?? 1)

      // redirect giống trang cũ
      router.push('/dashboard')
    } else {
      // lỗi đã set trong store
      errors.value = userStore.error || 'Không thể tạo user'
    }
  } catch (err) {
    console.error('create user error', err)
    errors.value = err?.message || 'Lỗi khi tạo user'
  }
}

/* Cancel / reset */
function onCancel() {
  form.firstName = form.lastName = form.name = ''
  form.email = form.password = ''
  form.age = null
  form.phone = ''
  form.gender = ''
  form.address = ''
  form.role = ''
  form.companyId = ''
  form.avatar = null
  avatarPreview.value = avatarDefault
  form.state = form.zip = form.country = form.language = form.timezone = form.currency = ''
  errors.value = null
}

/* Optional: keep buildPayload for preview dialog */
function buildPayloadForPreview() {
  const p = buildPayloadForCreate()
  if (p.password) p.password = '*** (hidden)'
  
  return p
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="8"
      class="mx-auto"
    >
      <VCard>
        <VCardTitle class="d-flex align-center justify-space-between">
          <div>
            <h3 class="text-h6 mb-0">
              Tạo người dùng
            </h3>
            <div class="text-caption">
              Form này sẽ gọi API để tạo user.
            </div>
          </div>
        </VCardTitle>

        <VCardText>
          <div class="d-flex gap-6 align-center mb-6">
            <div
              class="d-flex flex-column align-center"
              style="min-width:140px;"
            >
              <VAvatar
                size="120"
                rounded
                :image="avatarPreview"
              />
              <div class="mt-3 d-flex gap-3">
                <VBtn
                  small
                  @click="triggerFile"
                >
                  Upload
                </VBtn>
                <VBtn
                  small
                  variant="tonal"
                  @click="resetAvatar"
                >
                  Reset
                </VBtn>
              </div>
              <input
                ref="fileInputRef"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                hidden
                @change="onChangeAvatar"
              >
              <div class="text-caption mt-2">
                Allowed JPG/PNG/GIF • Max 800KB
              </div>
            </div>

            <div style="flex:1">
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="form.firstName"
                    label="Họ"
                    placeholder="Nguyễn"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="form.lastName"
                    label="Tên"
                    placeholder="Văn A"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="form.email"
                    label="Email"
                    type="email"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="form.phone"
                    label="SĐT"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="form.password"
                    label="Mật khẩu (tùy chọn)"
                    type="password"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="form.age"
                    label="Tuổi"
                    type="number"
                  />
                </VCol>
              </VRow>
            </div>
          </div>

          <VDivider class="my-4" />

          <VRow class="mb-4">
            <VCol
              cols="12"
              md="6"
            >
              <label class="d-block mb-2">Giới tính</label>
              <VSelect
                v-model="form.gender"
                :items="[{label:'Nam', value:'male'},{label:'Nữ', value:'female'}]"
                item-title="label"
                item-value="value"
                placeholder="Chọn giới tính"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <label class="d-block mb-2">Vai trò</label>
              <VSelect
                v-model="form.role"
                :items="roles"
                item-title="name"
                item-value="_id"
                :loading="loadingSelects"
                placeholder="Chọn vai trò"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <label class="d-block mb-2">Công ty</label>
              <VSelect
                v-model="form.companyId"
                :items="companies"
                item-title="name"
                item-value="_id"
                :loading="loadingSelects"
                placeholder="Chọn công ty"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="form.address"
                label="Địa chỉ"
              />
            </VCol>
          </VRow>

          <VRow class="mb-4">
            <VCol
              cols="12"
              md="4"
            >
              <AppSelect
                v-model="form.country"
                :items="['Vietnam','USA','UK','India']"
                label="Quốc gia"
              />
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
              <AppSelect
                v-model="form.timezone"
                :items="['(GMT+07:00) Ho Chi Minh']"
                label="Timezone"
              />
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
              <AppSelect
                v-model="form.currency"
                :items="['VND','USD','EUR']"
                label="Currency"
              />
            </VCol>
          </VRow>

          <div
            v-if="errors"
            class="text-error mb-4"
          >
            {{ errors }}
          </div>

          <div class="d-flex gap-3">
            <VBtn
              color="primary"
              :loading="saving"
              @click="handleCreateUser"
            >
              Tạo người dùng
            </VBtn>
            <VBtn
              variant="tonal"
              color="secondary"
              :disabled="saving"
              @click="onCancel"
            >
              Reset
            </VBtn>

            <VBtn
              v-if="!saving"
              text
              @click="previewDialog = true"
            >
              Xem trước payload
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Preview dialog (optional) -->
  <VDialog
    v-model="previewDialog"
    max-width="700"
  >
    <VCard>
      <VCardTitle>Preview user (Chỉ xem)</VCardTitle>
      <VCardText>
        <div class="d-flex gap-4">
          <VAvatar
            size="100"
            rounded
            :image="avatarPreview"
          />
          <div>
            <div><strong>Tên:</strong> {{ form.firstName }} {{ form.lastName }}</div>
            <div><strong>Email:</strong> {{ form.email }}</div>
            <div><strong>SĐT:</strong> {{ form.phone }}</div>
            <div><strong>Vai trò:</strong> {{ (roles.find(r=>r._id===form.role) || {}).name || form.role }}</div>
            <div><strong>Công ty:</strong> {{ (companies.find(c=>c._id===form.companyId) || {}).name || form.companyId }}</div>
          </div>
        </div>

        <VDivider class="my-4" />

        <pre style="white-space:pre-wrap; font-size: 13px;">{{ JSON.stringify(buildPayloadForPreview(), null, 2) }}</pre>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          text
          @click="previewDialog = false"
        >
          Đóng
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
/* subtle styling for nicer avatar area if needed */
</style>

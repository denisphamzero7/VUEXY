<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref, watch, computed, reactive } from "vue"
import FormTemplateSatistics from '@/views/apps/form-templates/list/FormTemplateSatistics.vue'
import FormTemplateFilter from "@/views/apps/form-templates/list/FormTemplateFilter.vue"
import FormTemplateTable from "@/views/apps/form-templates/list/FormTemplateTable.vue"

definePage({
  meta: {
    skipPermission: true,

    // action: 'access',
    // subject: 'form_templates',
  },

})

// filters mặc định: không lọc gì cả
const filters = reactive({
  name: "",
  period_range: null,
  status: null,

  // thêm các trường khác nếu FormTemplateFilter dùng
})

const router = useRouter()

const route = useRoute()
const target = computed(()=> route.params.target)

watch(target, newTarget => {
  filters.value.status = newTarget && newTarget !== "all" ? newTarget : null
})

const isExportDialogVisible = ref(false)

const selectedTemplates = ref([])

const exportApi = async payload => {

  // ví dụ: console.log('export', payload)
  return { success: true }
}

const onReset = () => {
  filters.name = ""
  filters.period_range = null
  filters.status = null
}

const onBulkAction = action => {
  // xử lý bulk action
  console.log("bulkAction", action)
}

const onAddTemplate = () => {
  // mở dialog tạo mới, hoặc router push...
  router.push({ name: "form-template-create" })
}

const formstatics = reactive({
  total: 10,
  isactive: 10,
  anactive: 0,
})

const statistics = computed(() =>  formstatics)
</script>

<template>
  <section>
    <FormTemplateSatistics :statistics="statistics" />
    <VCard class="mt-6">
      <FormTemplateFilter
        v-model:filters="filters"
        :is-export-dialog-visible="isExportDialogVisible"
        :export-api="exportApi"
        :selected-templates="selectedTemplates"
        @reset="onReset"
        @add-template="onAddTemplate"
        @bulk-action="onBulkAction"
      />
       <VDivider />
    <FormTemplateTable/>
    </VCard>
   
  </section>
</template>



<script setup>
import ReportSubmissionFilter from "@/views/apps/report-submissions/list/ReportSubmissionFilter.vue"
import ReportSubmissionStatistics from "@/views/apps/report-submissions/list/ReportSubmissionStatistics.vue"
import ReportSubmissionTable from "@/views/apps/report-submissions/list/ReportSubmissionTable.vue"
import { useRoute, useRouter } from "vue-router"

definePage({
  meta: {
    skipPermission: true,

    // action: 'access',
    // subject: 'report_batches',
  },
})

const router = useRouter()

const route = useRoute()

const target = computed(() => route.params.target)

watch(target, newTarget => {
  filters.value.status = newTarget && newTarget !== "all" ? newTarget : null
})

const filters = reactive({
  name: "",
  period_range: null,
  status: null,

  // thêm các trường khác nếu FormTemplateFilter dùng
})

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
    <ReportSubmissionStatistics :statistics="statistics" />
    <VCard>
      <ReportSubmissionFilter 
        v-model:filters="filters"
        :is-export-dialog-visible="isExportDialogVisible"
        :export-api="exportApi"
        :selected-templates="selectedTemplates"
        @reset="onReset"
        @add-template="onAddTemplate"
        @bulk-action="onBulkAction"/>
        
      <ReportSubmissionTable/>
    </VCard>
  </section>
</template>



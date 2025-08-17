<template>
  <Teleport to="body">
    <!-- toast container (Bootstrap style) -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="position-fixed top-0 end-0 p-3"
      style="z-index: 1080;"
    >
      <div v-for="notification in notifications" :key="notification.id" class="mb-2">
        <!-- root toast. Keep 'show' so it is visible (we control hide via removeNotification) -->
        <div
          class="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="d-flex">
            <!-- body: support variant types (success, danger, info, warning) -->
            <div
              class="toast-body"
              :class="{
                'text-white': notification.type === 'success' || notification.type === 'danger' || notification.type === 'warning',
                'bg-success': notification.type === 'success',
                'bg-danger': notification.type === 'danger',
                'bg-info': notification.type === 'info',
                'bg-warning': notification.type === 'warning'
              }"
            >
              <!-- optional title -->
              <div v-if="notification.title" class="fw-bold mb-1">{{ notification.title }}</div>
              <div class="small">{{ notification.message }}</div>
            </div>

            <!-- close button -->
            <button
              type="button"
              class="btn-close me-2 m-auto"
              aria-label="Close"
              @click="removeNotification(notification.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useNotification } from '@/@core/composable/useNotification'

const { notifications, removeNotification } = useNotification()

// timers to auto-dismiss notifications that provide a duration (ms)
const timers = new Map<number | string, number>()

watch(
  notifications,
  (list) => {
    const currentIds = new Set(list.map((n) => n.id))

    // clear timers for notifications that were removed
    for (const [id, t] of timers) {
      if (!currentIds.has(id)) {
        clearTimeout(t)
        timers.delete(id)
      }
    }

    // add timers for new notifications that include duration
    list.forEach((n: any) => {
      if (n.duration && !timers.has(n.id)) {
        const t = window.setTimeout(() => {
          removeNotification(n.id)
          timers.delete(n.id)
        }, n.duration)
        timers.set(n.id, t)
      }
    })
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  for (const t of timers.values()) clearTimeout(t)
  timers.clear()
})
</script>

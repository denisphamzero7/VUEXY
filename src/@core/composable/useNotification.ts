// src/composable/useNotification.js
import { ref } from "vue"

const notifications = ref([])

const addNotification = message => {
  const id = Date.now().toString()

  notifications.value.push({ id, message })

  setTimeout(() => removeNotification(id), 5000)
}

const removeNotification = id => {
  notifications.value = notifications.value.filter(
    notification => notification.id !== id,
  )
}

export function useNotification() {
  return {
    notifications,
    addNotification,
    removeNotification,
  }
}

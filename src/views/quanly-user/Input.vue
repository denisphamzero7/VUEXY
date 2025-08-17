<template>
  <div class="mb-4 w-full">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 mb-1"
      :for="id"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue || ''"
      class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      @input="onInput"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  placeholder: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  const target = e.target
  const value = target.value === '' ? null : target.value

  emit('update:modelValue', value)
}
</script>

<style scoped>
/* thêm style nếu cần */
</style>

<template>
  <button @click="handleClick" class="basic-button">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  label: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.basic-button {
  display: block;
  padding: 0.5rem 1rem;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.basic-button:hover {
  background-color: #369d73;
}
</style>
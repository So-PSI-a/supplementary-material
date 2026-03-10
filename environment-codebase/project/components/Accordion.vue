<template>
  <div class="border rounded-xl my-4">
    <button
      @click="open = !open"
      class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center"
    >
      <span>{{ title }}</span>
      <svg
        :class="{'rotate-180': open}"
        class="w-4 h-4 transition-transform"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <div v-show="open" class="px-4 pb-4 prose prose-sm max-w-none" v-html="content"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  title: String,
  content: String
})
const open = ref(false)
</script>
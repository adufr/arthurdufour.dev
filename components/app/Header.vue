<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <h1
      class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
    >
      {{ title }}
    </h1>

    <p class="mt-6 text-base text-neutral-600 dark:text-neutral-400">
      {{ description }}
    </p>
  </div>
</template>

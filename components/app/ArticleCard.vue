<script lang="ts" setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
})

function getReadableDate(dateString: string) {
  const date = new Date(dateString)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <NuxtLink :to="article._path" class="group">
    <article>
      <time
        class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-gray-400 dark:text-gray-500"
        datetime="2022-09-05"
      >
        <span
          class="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
        </span>
        {{ getReadableDate(article.published) }}
      </time>

      <h2 class="text-base font-semibold tracking-tight text-gray-800 group-hover:text-red-600 dark:text-gray-100">
        {{ article.title }}
      </h2>

      <p class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
        {{ article.description }}
      </p>
    </article>
  </NuxtLink>
</template>

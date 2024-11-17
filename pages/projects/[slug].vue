<script lang="ts" setup>
useSeoMeta({
  twitterCard: 'summary_large_image',
  author: 'Arthur Dufour',
})
</script>

<template>
  <main class="min-h-screen">
    <div class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10">
      <ContentDoc v-slot="{ doc }" tag="div">
        <div class="flex justify-between items-center gap-2">
          <div class="flex items-center gap-2">
            <h1 class="mb-0 text-3xl">
              {{ doc.name }}
            </h1>
          </div>

          <div class="flex items-center gap-2">
            <NuxtLink v-if="doc.github" :to="doc.github" external>
              <Icon name="logos:github-icon" />
            </NuxtLink>

            <NuxtLink v-if="doc.url" :to="doc.url" external class="text-sm">
              {{ doc.url }}
            </NuxtLink>
          </div>
        </div>

        <ContentRenderer :value="doc" />
      </ContentDoc>
    </div>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>

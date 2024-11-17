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
        <h1>
          {{ doc.name }}
        </h1>

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

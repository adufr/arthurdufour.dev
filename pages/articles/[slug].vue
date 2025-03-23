<script lang="ts" setup>
useSeoMeta({
  twitterCard: 'summary_large_image',
  author: 'Arthur Dufour',
})

const slug = useRoute().params.slug
const { data: article } = await useAsyncData(`article-${slug}`, () => {
  return queryCollection('articles').path(`/articles/${slug}`).first()
})
</script>

<template>
  <main class="min-h-screen">
    <article
      v-if="article"
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-neutral-900 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-neutral-200 dark:prose-img:ring-white/10"
    >
      <h1>{{ article.title }}</h1>

      <ContentRenderer :value="article" />
    </article>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>

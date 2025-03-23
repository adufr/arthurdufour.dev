<script lang="ts" setup>
// const route = useRoute()
// const { slug } = route.params

useSeoMeta({
  // ogImage: `https://fayazahmed.com/articles/${slug}.png`,
  twitterCard: 'summary_large_image',
  author: 'Arthur Dufour',
})
</script>

<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-neutral-900 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-neutral-200 dark:prose-img:ring-white/10"
    >
      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1>
            {{ doc.title }}
          </h1>

          <ContentRenderer :value="doc" />
        </article>
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

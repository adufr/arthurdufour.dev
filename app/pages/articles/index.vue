<script lang="ts" setup>
const description =
  'All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.'

useSeoMeta({
  title: 'Articles | Arthur Dufour',
  description,
})

const { data: articles } = await useAsyncData('all-articles', () =>
  queryCollection('articles').order('published', 'DESC').all(),
)
</script>

<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Articles" :description="description" />

    <ul class="flex flex-col gap-8">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
const { data: articles } = await useAsyncData('articles-home', () =>
  queryCollection('articles')
    // .order('published', 'desc')
    .limit(3)
    .all(),
)
</script>

<template>
  <div>
    <h2 class="mb-6 text-xs font-semibold text-neutral-400 uppercase">
      RECENT ARTICLES
    </h2>

    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>

    <div class="mt-6 flex items-center justify-center text-sm">
      <UButton
        label="All Articles &rarr;"
        to="/articles"
        variant="link"
        color="neutral"
      />
    </div>
  </div>
</template>

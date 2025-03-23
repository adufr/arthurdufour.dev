<script lang="ts" setup>
useSeoMeta({
  twitterCard: 'summary_large_image',
  author: 'Arthur Dufour',
})
</script>

<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-neutral-900 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-neutral-200 dark:prose-img:ring-white/10"
    >
      <ContentDoc v-slot="{ doc }" tag="div">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="doc.github"
              :to="doc.github"
              external
              class="flex items-center gap-2"
            >
              <NuxtIcon name="logos:github-icon" />
              <span v-if="!doc.url">
                {{ doc.github }}
              </span>
            </NuxtLink>

            <NuxtLink v-if="doc.url" :to="doc.url" external>
              {{ doc.url }}
            </NuxtLink>
          </div>

          <h1 class="mb-0 text-2xl">
            {{ doc.title }}
          </h1>
        </div>

        <ContentRenderer :value="doc" />

        <UCarousel
          v-slot="{ item }"
          arrows
          :ui="{ item: 'basis-full' }"
          :items="doc.screenshots"
          class="-mt-6 overflow-hidden rounded-lg"
        >
          <img
            :src="item"
            alt="Screenshot of the project"
            draggable="false"
            class="w-full cursor-pointer"
          />
        </UCarousel>
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

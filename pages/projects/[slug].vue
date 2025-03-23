<script lang="ts" setup>
useSeoMeta({
  twitterCard: 'summary_large_image',
  author: 'Arthur Dufour',
})

const slug = useRoute().params.slug
const { data: project } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').path(`/projects/${slug}`).first()
})
</script>

<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-neutral-900 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-neutral-200 dark:prose-img:ring-white/10"
    >
      <div v-if="project">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="project.github"
              :to="project.github"
              external
              class="flex items-center gap-2"
            >
              <NuxtIcon name="logos:github-icon" />
              <span v-if="!project.url">
                {{ project.github }}
              </span>
            </NuxtLink>

            <NuxtLink v-if="project.url" :to="project.url" external>
              {{ project.url }}
            </NuxtLink>
          </div>

          <h1 class="mb-0 text-2xl">
            {{ project.title }}
          </h1>
        </div>

        <ContentRenderer :value="project" />

        <UCarousel
          v-slot="{ item }"
          arrows
          :ui="{ item: 'basis-full' }"
          :items="project.screenshots"
          class="-mt-6 overflow-hidden rounded-lg"
        >
          <img
            :src="item"
            alt="Screenshot of the project"
            draggable="false"
            class="w-full cursor-pointer"
          />
        </UCarousel>
      </div>
    </div>
  </main>
</template>

<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>

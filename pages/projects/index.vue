<script lang="ts" setup>
const description =
  "I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."

useSeoMeta({
  title: 'Projects | Arthur Dufour',
  description,
})

const { data: projects } = await useAsyncData('projects-all', () =>
  queryCollection('projects').all(),
)
</script>

<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Projects" :description />

    <div class="flex flex-col gap-8">
      <AppProjectCard v-for="(project, id) in projects" :key="id" :project />
    </div>
  </main>
</template>

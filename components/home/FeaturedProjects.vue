<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects-home', () =>
  queryContent('/projects').limit(3).find())
</script>

<template>
  <div>
    <h2 class="mb-6 text-xs font-semibold uppercase text-gray-400">
      FEATURED PROEJCTS
    </h2>

    <div class="space-y-4">
      <AppProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>

    <div class="mt-6 flex items-center justify-center text-sm">
      <UButton
        label="All Projects &rarr;"
        to="/projects"
        variant="link"
        color="gray"
      />
    </div>
  </div>
</template>

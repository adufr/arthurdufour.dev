<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects-home', () =>
  queryCollection('projects').limit(3).all(),
)
</script>

<template>
  <div>
    <h2 class="mb-6 text-xs font-semibold text-neutral-400 uppercase">
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
        color="neutral"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <NuxtLink
    class="group -m-2 flex items-end gap-4 rounded-lg p-2"
    :to="project.url"
    target="_blank"
    external
  >
    <div class="max-w-md">
      <div class="flex gap-2">
        <h3 class="text-sm font-medium group-hover:text-red-600">
          {{ project.name }}
        </h3>

        <UBadge
          size="xs"
          color="red"
          :variant="project.author ? 'subtle' : 'soft'"
        >
          {{ project.author ? 'Author' : 'Contributor' }}
        </UBadge>
      </div>

      <p class="text-sm text-gray-400">
        {{ project.description }}
      </p>
    </div>

    <div class="mb-1.5 flex-1 border-b border-dashed border-gray-300 group-hover:border-gray-700 dark:border-gray-800" />

    <UAvatar
      :src="project.thumbnail"
      :ui="{ rounded: 'rounded z-10 relative' }"
      size="md"
      :alt="project.name"
    />
  </NuxtLink>
</template>

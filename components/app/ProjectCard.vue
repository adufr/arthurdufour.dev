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
    class="group -m-2 flex items-center justify-between gap-4 rounded-lg p-2"
    :to="project._path"
  >
    <div class="max-w-md">
      <div class="flex items-center gap-2">
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

        <UTooltip v-if="project.github" text="This project is open-source!">
          <UIcon name="logos:github-icon" class="size-3" />
        </UTooltip>
      </div>

      <p class="text-sm text-gray-400">
        {{ project.description }}
      </p>

      <p class="mt-2 text-xs text-red-400 group-hover:underline">
        → Read: <span class="italic">{{ project.title }}</span>
      </p>
    </div>

    <UAvatar
      :src="project.thumbnail"
      :ui="{ rounded: 'rounded z-10 relative' }"
      size="md"
      :alt="project.name"
    />
  </NuxtLink>
</template>

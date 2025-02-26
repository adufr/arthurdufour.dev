<script lang="ts" setup>
const links = [
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/arthurdufour.dev',
    icon: 'logos:bluesky',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/adufr',
    icon: 'logos:github-icon',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/arthur-dufour/',
    icon: 'logos:linkedin-icon',
  },
]
</script>

<template>
  <div>
    <h2 class="mb-4 text-xs font-semibold uppercase text-gray-400">
      FIND ME ON
    </h2>

    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="group flex items-center gap-4 dark:hover:text-gray-300"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>

        <div
          class="flex-1 border-b border-dashed border-gray-300 group-hover:border-gray-700 dark:border-gray-800"
        />

        <NuxtIcon :name="link.icon" class="size-6" />
      </NuxtLink>
    </div>
  </div>
</template>

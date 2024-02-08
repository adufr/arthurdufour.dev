<script lang="ts" setup>
const links = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/adufr_',
    icon: 'mdi:twitter',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/adufr',
    icon: 'mdi:github',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/arthur-dufour/',
    icon: 'mdi:linkedin',
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

        <div class="flex-1 border-b border-dashed border-gray-300 group-hover:border-gray-700 dark:border-gray-800" />

        <Icon
          :name="link.icon"
          class="size-6"
        />
      </NuxtLink>
    </div>
  </div>
</template>

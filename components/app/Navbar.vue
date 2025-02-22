<script lang="ts" setup>
import { useFixedHeader } from "vue-use-fixed-header";

const headerRef = ref(null);
const { styles } = useFixedHeader(headerRef);

interface Item {
  name: string;
  path: string;
  icon: string;
  external?: boolean;
}

const items: Item[] = [
  {
    name: "Home",
    path: "/",
    icon: "solar:home-smile-outline",
  },
  {
    name: "Projects",
    path: "/projects",
    icon: "solar:folder-with-files-outline",
  },
  {
    name: "Articles",
    path: "/articles",
    icon: "solar:document-add-outline",
  },
  {
    name: "Github",
    path: "https://github.com/adufr",
    icon: "logos:github-icon",
    external: true,
  },
];
</script>

<template>
  <div ref="headerRef" :style="styles" class="fixed top-0 z-50 w-full">
    <nav class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <ul
        class="my-4 flex items-center rounded-full bg-white/90 px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/20"
      >
        <li v-for="item in items" :key="item.path">
          <UTooltip
            :text="item.name"
            :ui="{ popper: { strategy: 'absolute' } }"
          >
            <ULink
              :to="item.path"
              class="relative flex items-center justify-center px-3 py-4 transition hover:text-red-500 dark:hover:text-red-400"
              active-class="text-red-600 dark:text-red-400"
              :external="item.external"
              :target="item.external ? '_blank' : ''"
            >
              <NuxtIcon
                aria-hidden="true"
                :name="item.icon"
                class="z-10 size-5"
              />

              <span
                v-if="$route.path === item.path"
                class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-red-500/0 via-red-500/70 to-red-500/0 dark:from-red-400/0 dark:via-red-400/40 dark:to-red-400/0"
              />

              <span
                v-if="$route.path === item.path"
                class="absolute left-1/2 top-1/2 z-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 dark:bg-white/10"
              />

              <span class="sr-only">
                {{ item.name }}
              </span>
            </ULink>
          </UTooltip>
        </li>

        <li class="flex-1" />

        <li>
          <AppThemeToggle />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UTooltip text="Toggle theme" :ui="{ popper: { strategy: 'absolute' } }">
    <button
      class="relative flex items-center justify-center px-3 py-4 transition hover:text-red-500 dark:hover:text-red-400"
      @click="isDark = !isDark"
    >
      <NuxtIcon
        aria-hidden="true"
        :name="isDark ? 'solar:sun-2-outline' : 'solar:moon-outline'"
        class="size-5"
      />

      <span class="sr-only"> Toggle theme </span>
    </button>
  </UTooltip>
</template>

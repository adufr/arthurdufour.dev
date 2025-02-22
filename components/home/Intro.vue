<script lang="ts" setup>
useSeoMeta({
  title: "Arthur Dufour",
  description:
    "Hi 👋, I'm Arthur, a passionate product-oriented fullstack developer from Lyon, France. I specialize in building web applications and sites using Javascript, Vue & Node.",
});
</script>

<template>
  <div class="space-y-6">
    <NuxtImg
      src="/avatar.jpg"
      alt="Arthur Dufour"
      class="size-12 rounded-full border border-gray-300 bg-gray-200 ring-2 ring-gray-200 transition-all duration-300 hover:ring-4 sm:size-16 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10"
      sizes="48px sm:64px"
      format="webp"
      placeholder
    />

    <h1
      class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
    >
      Hello! 👋
    </h1>

    <p class="text-gray-900 dark:text-gray-400">
      I'm Arthur, I work as a fullstack developer from Lyon, France. I
      specialize in building web applications and sites using Javascript, Vue &
      Node. I've procrastinated building this website for years but finally it's
      here, I've carved out my own little nook on the internet to share my silly
      experiments, nifty projects, and thoughts (mostly about tech and design).
    </p>

    <p class="text-gray-900 dark:text-gray-400">
      By day, I'm a Fullstack Developer at
      <a href="https://365talents.com" target="_blank" class="underline"
        >365Talents</a
      >, and by night (and weekends), I'm busy tinkering with some random tool
      or app that I am building or contributing to.
    </p>
  </div>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="mx-auto max-w-2xl pb-8 text-center text-sm text-neutral-400 dark:text-neutral-600"
  >
    <br />
    <p>© {{ year }} Arthur Dufour. All rights reserved.</p>
  </footer>
</template>

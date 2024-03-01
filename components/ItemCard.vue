<script setup lang="ts">
import { type Item } from '~/db/db'

defineProps<Item>()
</script>

<template>
  <div class="flex justify-between items-center py-2 px-4 w-full">
    <span>{{ name }}</span>

    <div class="flex gap-1">
      <img
        v-for="(img, j) in imgs"
        :key="j"
        :src="`/img/items/${img}.png`"
        :alt="img"
      >
    </div>
  </div>
</template>

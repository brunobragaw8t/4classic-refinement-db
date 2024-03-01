<script setup lang="ts">
import { type Stat } from '~/db/db'

defineProps<Stat>()
</script>

<template>
  <span
    class="text-sm"
    :class="{
      'text-red-400': 'red' === color,
      'text-blue-400': 'blue' === color
    }"
  >
    {{ name }} +{{ value }}
  </span>
</template>

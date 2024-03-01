<script setup lang="ts">
import { db, type Item } from './db/db'
import { slugify } from './helpers/slugify'

const itemToRefine = ref<Item | null>(null)
const itemToRefineSearch = ref<string>('')
const items = computed(() => {
  if (!itemToRefineSearch.value) {
    return db.items
  }

  return db.items.filter((i) => {
    return slugify(i.name).includes(slugify(itemToRefineSearch.value))
  })
})
</script>

<template>
  <div class="bg-stone-900 text-white py-10">
    <div class="mx-auto px-4 max-w-[36rem]">
      <div v-if="!itemToRefine" class="mx-auto px-4 max-w-96">
        <h1 class="text-lg font-bold mb-3 text-center">
          Select the item you wanna refine
        </h1>

        <input
          v-model="itemToRefineSearch"
          type="text"
          class="mb-2 border border-stone-600 px-4 h-8 leading-8 w-full bg-transparent"
          placeholder="Search here..."
        >

        <div class="border border-stone-400 h-64 overflow-auto">
          <button
            v-for="(item, i) in items"
            :key="i"
            class="w-full transition-colors hover:bg-stone-900"
            @click="itemToRefine = item"
          >
            <ItemCard v-bind="item" />
          </button>
        </div>
      </div>

      <template v-else>
        <div class="flex gap-3 items-center mb-6 mx-auto px-4 max-w-96">
          <div class="flex-grow border border-stone-200">
            <ItemCard v-bind="itemToRefine" />
          </div>

          <div class="flex-shrink-0">
            <button class="transition-colors hover:text-stone-400" @click="itemToRefine = null">
              <Icon name="fa6-solid:pen-to-square" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="(item, i) in itemToRefine.itemsToRefineWith"
            :key="i"
            class="text-center"
          >
            <img
              :src="`/img/items/${item.name}.png`"
              :alt="item.name"
              class="block mx-auto mb-2"
            >

            <div class="text-xs mb-2">
              {{ item.name }}
            </div>

            <div class="flex items-center justify-between">
              <div>
                <div v-for="(stat, j) in item.stats" :key="j">
                  <StatText v-bind="stat" />
                </div>
              </div>

              <Icon name="fa6-solid:angles-right" />

              <div>
                <div v-for="(stat, j) in item.result" :key="j">
                  <StatText v-bind="stat" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

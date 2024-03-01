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
  <div class="flex items-center justify-center bg-stone-900 text-stone-50 py-16 min-h-screen">
    <div class="mx-auto px-4 w-full max-w-[40rem]">
      <div v-if="!itemToRefine" class="mx-auto px-4 max-w-96">
        <h2 class="text-lg font-bold mb-3 text-center">
          Select the item you want to refine
        </h2>

        <input
          v-model="itemToRefineSearch"
          type="text"
          class="mb-2 border border-stone-800 rounded px-4 h-8 leading-8 w-full bg-transparent text-center placeholder-stone-600 transition-colors focus:outline-none focus:border-stone-600"
          placeholder="Search here..."
        >

        <div class="border border-stone-700 rounded h-64 overflow-auto">
          <button
            v-for="(item, i) in items"
            :key="i"
            class="w-full transition-colors hover:bg-white hover:bg-opacity-5"
            @click="itemToRefine = item"
          >
            <ItemCard v-bind="item" />
          </button>
        </div>
      </div>

      <template v-else>
        <h2 class="text-lg font-bold mb-3 text-center">
          Currently refining:
        </h2>

        <div class="flex gap-3 items-center mb-6 mx-auto px-4 max-w-96">
          <div class="flex-grow border border-stone-700 rounded">
            <ItemCard v-bind="itemToRefine" />
          </div>

          <div class="flex-shrink-0">
            <button
              class="text-stone-400 transition-colors hover:text-stone-200"
              title="Edit"
              @click="itemToRefine = null"
            >
              <Icon name="fa6-solid:pen-to-square" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="(item, i) in itemToRefine.itemsToRefineWith"
            :key="i"
            class="bg-stone-800 rounded p-4 text-center"
          >
            <div class="flex items-center gap-2">
              <div class="flex-1">
                <img
                  :src="`/img/items/${item.name}.png`"
                  :alt="item.name"
                  class="block mx-auto mb-2"
                >

                <div class="text-xs mb-2">
                  {{ item.name }}
                </div>

                <div v-for="(stat, j) in item.stats" :key="j">
                  <StatText v-bind="stat" />
                </div>
              </div>

              <Icon name="fa6-solid:angles-right" />

              <div class="flex-1">
                <div
                  class="flex justify-center gap-1 mb-2"
                >
                  <img
                    v-for="(img, j) in itemToRefine.imgs"
                    :key="j"
                    :src="`/img/items/${img}.png`"
                    :alt="img"
                  >
                </div>

                <div class="text-xs mb-2">
                  {{ itemToRefine.name }}
                </div>

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

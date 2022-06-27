<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <div
        v-if="!store.state.currentBoard?.columns?.length"
        :class="$style.empty"
      >
        <div class="space-y-8">
          <div class="text-heading-l font-bold text-medium-grey">
            This board is empty. Create a new column to get started.
          </div>
          <BaseButton size="l" @click="isColumnModalOpen = true"
            >+ Add New Column</BaseButton
          >
        </div>
      </div>

      <div v-else class="flex p-2">
        <draggable
          item-key="id"
          group="columns"
          class="flex"
          :list="store.state.currentBoard?.columns"
        >
          <template #item="{element}">
            <BaseColumn
              :class="$style.column"
              group="tasks"
              :column="element"
            />
          </template>
        </draggable>
        <BaseColumn
          :class="$style.column"
          @create-column="isColumnModalOpen = true"
        />
      </div>
    </div>

    <ColumnModal
      :is-open="isColumnModalOpen"
      @close-modal="isColumnModalOpen = false"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import useStore from '@composables/store';
import draggable from 'vuedraggable-es';
import BaseButton from '@components/BaseButton.vue';
import IconButton from '@components/IconButton.vue';
import BaseColumn from '@components/BaseColumn.vue';
import ColumnModal from '@components/Modals/ColumnModal.vue';

const store = useStore();
const isColumnModalOpen = ref(false);
</script>

<style lang="scss" module>
.wrapper {
  @apply w-full flex flex-col h-full overflow-auto;
}
.content {
  @apply h-full;
  @include scrollbar-thin;
}
.empty {
  @apply py-8 w-full flex items-center justify-center text-center h-full;
}
.column {
  @apply flex flex-col w-[19.5rem];
}
</style>

<template>
  <div
    :tabindex="!column ? undefined : 0"
    :role="!column ? undefined : 'button'"
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--full']]: column,
      },
      $props.class,
    ]"
  >
    <div v-if="column" :class="$style.header">
      <div class="relative pl-7">
        <span :class="$style.dot" :style="{backgroundColor: column?.color}" />
        <h3 :class="$style.title">
          {{ column?.name }} ({{ column?.tasks.length }})
        </h3>
      </div>
      <BaseDropdown :items="options">
        <IconButton
          size="s"
          priority="secondary"
          :class="$style.options"
          icon="icon-horizontal-ellipsis"
        />
      </BaseDropdown>
    </div>

    <template v-if="column">
      <draggable
        :group="group"
        item-key="id"
        :list="column?.tasks"
        :class="$style.tasks"
      >
        <template #item="{element}">
          <BaseTask :task="element" />
        </template>
      </draggable>

      <ColumnModal
        :column="column"
        :is-open="isModalOpen.editColumn"
        @close-modal="isModalOpen.editColumn = false"
      />

      <DeleteColumnModal
        :column="column"
        :is-open="isModalOpen.deleteColumn"
        @close-modal="isModalOpen.deleteColumn = false"
      />
    </template>

    <div
      v-else
      role="button"
      :tabindex="0"
      :class="[$style.new, 'mt-[3.25rem]']"
      @click="onCreateColumn"
    >
      <span>+ New Column</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Column} from '@interfaces';
import {computed, defineProps, ref} from 'vue';
import draggable from 'vuedraggable-es';
import BaseTask from '@components/BaseTask.vue';
import IconButton from '@components/IconButton.vue';
import BaseDropdown from '@components/BaseDropdown.vue';
import ColumnModal from '@components/Modals/ColumnModal.vue';
import DeleteColumnModal from '@components/Modals/DeleteColumnModal.vue';

interface Props {
  group?: string;
  column?: Column;
  onCreateColumn?(): void;
}

const props = defineProps<Props>();
const isModalOpen = ref({
  editColumn: false,
  deleteColumn: false,
});

const log = (event: any) => {
  console.log(event);
};

const options = [
  {
    name: 'Edit Column',
    onClick: () => {
      isModalOpen.value.editColumn = true;
    },
  },
  {
    name: 'Delete Column',
    class: 'text-red',
    onClick: () => {
      isModalOpen.value.deleteColumn = true;
    },
  },
];
</script>

<style lang="scss" module>
.wrapper {
  @apply rounded-md p-3.5;

  &--full {
    &:hover {
      .options {
        @apply visible;
      }

      @include theme(light) {
        @apply bg-lines-light;
      }

      @include theme(dark) {
        @apply bg-lines-dark bg-opacity-20;
      }
    }
  }
}
.title {
  @apply text-heading-s text-medium-grey font-bold uppercase;
}
.tasks {
  @apply mt-6 space-y-5 h-full;
}
.header {
  @apply flex items-center justify-between;
}
.options {
  @apply invisible rounded-full;
}
.dot {
  @apply absolute top-0 left-0 rounded-full w-[0.9375rem] h-[0.9375rem];
}
.new {
  @apply px-6 py-10 h-full flex justify-center items-center rounded-md;

  @include theme(light) {
    background-image: linear-gradient(
      180deg,
      #e9effa 0%,
      rgba(233, 239, 250, 0.5) 100%
    );
  }

  @include theme(dark) {
    background-image: linear-gradient(
      180deg,
      rgba(43, 44, 55, 0.25) 0%,
      rgba(43, 44, 55, 0.125) 100%
    );
  }

  span {
    @apply text-heading-xl font-bold text-medium-grey;
  }

  &:hover {
    span {
      @apply text-main-purple;
    }
  }
}
</style>

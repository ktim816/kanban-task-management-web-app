<template>
  <div
    :tabindex="isEmpty ? undefined : 0"
    :role="isEmpty ? undefined : 'button'"
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--full']]: !isEmpty,
      },
    ]"
  >
    <div v-if="column" :class="$style.header">
      <span :class="$style.dot" :style="{backgroundColor: column?.color}" />
      <h3 :class="$style.title">
        {{ column?.name }} ({{ column?.tasks.length }})
      </h3>
    </div>

    <template v-if="!isEmpty">
      <div v-if="column?.tasks.length" :class="$style.tasks">
        <BaseTask :key="task.id" :task="task" v-for="task in column.tasks" />
      </div>

      <div
        role="button"
        :tabindex="0"
        :class="[$style.new, 'mt-6']"
        @click="isTaskModalOpen = true"
      >
        <span>+ New Task</span>
      </div>
    </template>

    <div
      v-else
      role="button"
      :tabindex="0"
      :class="[$style.new, 'mt-10']"
      @click="onCreateColumn"
    >
      <span>+ New Column</span>
    </div>

    <TaskModal
      :column="column"
      :is-open="isTaskModalOpen"
      @close-modal="isTaskModalOpen = false"
    />
  </div>
</template>

<script lang="ts" setup>
import {Column} from '@interfaces';
import {defineProps, ref} from 'vue';
import BaseTask from '@components/BaseTask.vue';
import TaskModal from './Modals/TaskModal.vue';
import IconButton from './IconButton.vue';

interface Props {
  column?: Column;
  isEmpty?: boolean;
  onCreateColumn?(): void;
}

const isTaskModalOpen = ref(false);
const props = defineProps<Props>();
</script>

<style lang="scss" module>
.wrapper {
  @apply rounded-md p-4;

  &--full {
    &:hover {
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
  @apply mt-6;
}
.tasks {
  @apply space-y-5;
}
.header {
  @apply relative pl-7;
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

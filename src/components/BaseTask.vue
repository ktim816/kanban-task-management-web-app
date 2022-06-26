<template>
  <div
    role="button"
    :tabindex="0"
    :class="$style.wrapper"
    @click="isModalOpen.viewTask = true"
  >
    <h4 :class="$style.title">{{ task.title }}</h4>
    <div :class="$style.subtasks">
      {{ completedSubtasks.length }} of {{ task.subtasks.length }} subtasks
    </div>

    <TaskViewModal
      :task="task"
      :is-open="isModalOpen.viewTask"
      @close-modal="isModalOpen.viewTask = false"
      @edit-task="
        isModalOpen.viewTask = false;
        isModalOpen.editTask = true;
      "
      @delete-task="
        isModalOpen.viewTask = false;
        isModalOpen.deleteTask = true;
      "
    />
    <TaskModal
      :task="task"
      :is-open="isModalOpen.editTask"
      @close-modal="isModalOpen.editTask = false"
    />
    <DeleteTaskModal
      :task="task"
      :is-open="isModalOpen.deleteTask"
      @close-modal="isModalOpen.deleteTask = false"
    />
  </div>
</template>

<script lang="ts" setup>
import {Task} from '@interfaces';
import {defineProps, computed, ref} from 'vue';
import TaskModal from '@components/Modals/TaskModal.vue';
import TaskViewModal from '@components/Modals/TaskViewModal.vue';
import DeleteTaskModal from '@components/Modals/DeleteTaskModal.vue';

interface Props {
  task: Task;
}

const isModalOpen = ref({
  viewTask: false,
  editTask: false,
  deleteTask: false,
});

const props = defineProps<Props>();
const completedSubtasks = computed(() => {
  return props.task.subtasks.filter((subtask) => {
    return subtask.isCompleted;
  });
});
</script>

<style lang="scss" module>
.wrapper {
  @apply shadow rounded-lg px-4 py-6 space-y-2;

  @include theme(light) {
    @apply bg-white;
  }

  @include theme(dark) {
    @apply bg-dark-grey;
  }
}
.title {
  @apply text-heading-m font-bold;
}
.subtasks {
  @apply text-body-m font-bold text-medium-grey;
}
</style>

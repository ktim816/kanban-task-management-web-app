<template>
  <BaseModal
    :is-open="isOpen"
    title-class="text-red"
    title="Delete this task?"
    panel-class="max-w-[30rem]"
    :description="`Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action action cannot be reversed.`"
    @close-modal="onCloseModal"
  >
    <div :class="$style.buttons">
      <BaseButton fix-width priority="destructive" @click="deleteTask"
        >Delete</BaseButton
      >
      <BaseButton fix-width priority="secondary" @click="onCloseModal"
        >Cancel</BaseButton
      >
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import BaseModal from '@components/BaseModal.vue';
import BaseButton from '@components/BaseButton.vue';
import useStore from '@composables/store';
import {useRouter} from 'vue-router';
import {Task} from '@interfaces';

const store = useStore();

const props = defineProps<{
  task: Task;
  isOpen: boolean;
  onCloseModal(): void;
}>();

const deleteTask = () => {
  store.commit('deleteTask', props.task);
  props.onCloseModal();
};
</script>

<style lang="scss" module>
.buttons {
  @apply flex w-full space-x-4 mt-3;
}
.columns {
  @apply space-y-3;
}
.column {
  @apply flex items-center;
}
.label {
  @apply mb-2 text-body-m font-bold text-medium-grey;
}
.form {
  @apply space-y-6;
}
.close {
  @apply text-medium-grey;

  &:hover {
    @apply text-black text-opacity-60;
  }
}
</style>

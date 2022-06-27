<template>
  <BaseModal
    :is-open="isOpen"
    title-class="text-red"
    title="Delete this column?"
    panel-class="max-w-[30rem]"
    :description="`Are you sure you want to delete the ‘${column.name}’ column and its tasks? This action action cannot be reversed.`"
    @close-modal="onCloseModal"
  >
    <div :class="$style.buttons">
      <BaseButton fix-width priority="destructive" @click="deleteColumn"
        >Delete</BaseButton
      >
      <BaseButton fix-width priority="secondary" @click="onCloseModal?.()"
        >Cancel</BaseButton
      >
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import {Column} from '@interfaces';
import {defineProps, ref} from 'vue';
import useStore from '@composables/store';
import BaseModal from '@components/BaseModal.vue';
import BaseButton from '@components/BaseButton.vue';

const store = useStore();

const props = defineProps<{
  column: Column;
  isOpen: boolean;
  onCloseModal?(): void;
}>();

const deleteColumn = () => {
  store.commit('deleteColumn', props.column);
  props.onCloseModal?.();
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

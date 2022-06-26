<template>
  <BaseModal
    :is-open="isOpen"
    title="Delete this board?"
    :description="`Are you sure you want to delete ${
      store.state.currentBoard?.name
        ? `the ‘${store.state.currentBoard.name}’`
        : 'this'
    } board? This action will remove all columns and tasks and cannot be reversed.`"
    title-class="text-red"
    panel-class="max-w-[30rem]"
    @close-modal="onCloseModal"
  >
    <div :class="$style.buttons">
      <BaseButton fix-width priority="destructive" @click="deleteBoard"
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

const store = useStore();
const router = useRouter();

const props = defineProps<{
  isOpen: boolean;
  onCloseModal(): void;
}>();

const deleteBoard = () => {
  store.commit('deleteBoard', {
    router,
    board: store.state.currentBoard,
  });

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

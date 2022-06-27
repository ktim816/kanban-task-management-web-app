<template>
  <header
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--collapsed']]: !store.state.isSidebarVisible,
      },
    ]"
  >
    <div :class="$style.logo">
      <img
        :src="store.state.isDarkTheme ? logoLightImage : logoDarkImage"
        alt="Logo"
      />
    </div>
    <div :class="$style.header">
      <h1 :class="$style.title">{{ store.state.currentBoard?.name }}</h1>
      <div :class="$style.actions">
        <BaseButton
          size="l"
          :disabled="!store.state.currentBoard?.columns?.length"
          @click="isModalOpen.newTask = true"
          >+ Add New Task</BaseButton
        >
        <BaseDropdown :items="dropItems">
          <IconButton
            size="l"
            priority="secondary"
            class="rounded-full"
            icon="icon-vertical-ellipsis"
          />
        </BaseDropdown>
      </div>
    </div>

    <TaskModal
      :is-open="isModalOpen.newTask"
      @close-modal="isModalOpen.newTask = false"
    />
    <BoardModal
      is-editable
      :is-open="isModalOpen.editBoard"
      @close-modal="isModalOpen.editBoard = false"
    />
    <DeleteBoardModal
      :is-open="isModalOpen.deleteBoard"
      @close-modal="isModalOpen.deleteBoard = false"
    />
  </header>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {ref, reactive, watch} from 'vue';
import BaseButton from '@components/BaseButton.vue';
import IconButton from '@components/IconButton.vue';
import BaseDropdown from '@components/BaseDropdown.vue';
import logoLightImage from '@images/logo-light.svg?url';
import logoDarkImage from '@images/logo-dark.svg?url';
import DeleteBoardModal from '@components/Modals/DeleteBoardModal.vue';
import BoardModal from './Modals/BoardModal.vue';
import useStore from '@composables/store';
import TaskModal from './Modals/TaskModal.vue';

const route = useRoute();
const store = useStore();
const isModalOpen = ref({
  editBoard: false,
  deleteBoard: false,
  newTask: false,
});

const dropItems = [
  {
    name: 'Edit Board',
    onClick: () => {
      isModalOpen.value.editBoard = true;
    },
  },
  {
    name: 'Delete Board',
    class: 'text-red',
    onClick: () => {
      isModalOpen.value.deleteBoard = true;
    },
  },
];
</script>

<style lang="scss" module>
.wrapper {
  @apply grid;
  grid-template-columns: 18.75rem 1fr;

  @include theme(light) {
    @apply bg-white;
  }

  @include theme(dark) {
    @apply bg-dark-grey;
  }

  &--collapsed {
    grid-template-columns: 13.0625rem 1fr;
    .logo {
      @apply px-6 border-b;
    }
  }
}
.logo {
  @apply py-8 px-[2.1rem] border-r;

  @include theme(light) {
    @apply border-lines-light;
  }

  @include theme(dark) {
    @apply border-lines-dark;
  }
}
.header {
  @apply px-6 pt-5 pb-7 flex items-center justify-between space-x-8 border-b;

  @include theme(light) {
    @apply bg-white border-lines-light;
  }

  @include theme(dark) {
    @apply bg-dark-grey border-lines-dark;
  }
}
.title {
  @apply text-heading-xl font-bold;
}
.actions {
  @apply flex items-center space-x-2;
}
</style>

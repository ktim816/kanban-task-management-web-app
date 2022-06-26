<template>
  <div>
    <div :class="$style.title">All boards ({{ boards.length }})</div>
    <nav>
      <ul>
        <li v-for="board in boards" :key="board.id">
          <router-link
            :to="board.path"
            :class="$style.link"
            :exact-active-class="$style.linkActive"
          >
            <DynamicIcon icon="icon-board" :class="$style.icon" />
            <span>{{ board.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <button :class="$style.button" @click="isOpenModal = true">
      <DynamicIcon icon="icon-board" :class="$style.icon" />
      <span>+ Create New Board</span>
    </button>
    <BoardModal :is-open="isOpenModal" @close-modal="isOpenModal = false" />
  </div>
</template>

<script lang="ts" setup>
import dashify from 'dashify';
import useStore from '@composables/store';
import {ref, computed, onUpdated, onMounted} from 'vue';
import BoardModal from '@components/Modals/BoardModal.vue';
import DynamicIcon from '@components/DynamicIcon.vue';

const store = useStore();
const isOpenModal = ref(false);
const boards = computed(() => {
  return store.state.boards;
});
</script>

<style lang="scss" module>
.title {
  @apply pl-8 mb-5 uppercase font-bold text-body-m tracking-[2.4px] text-medium-grey;
}
.icon {
  @apply absolute top-4 left-8;
}
.link,
.button {
  @apply relative block w-full text-left py-3.5 pl-16 pr-4 rounded-r-full text-heading-m font-bold;

  &:hover {
    @apply text-main-purple;

    @include theme(light) {
      @apply bg-main-purple bg-opacity-10;
    }

    @include theme(dark) {
      @apply bg-white text-main-purple;
    }
  }
}
.button {
  @apply text-main-purple;
}
.link {
  @apply text-medium-grey;

  &.linkActive {
    @apply bg-main-purple text-white #{!important};
  }
}
</style>

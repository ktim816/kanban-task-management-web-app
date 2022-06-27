<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <TheNavigation :class="$style.navigation" />
      <div :class="$style.footer">
        <div class="px-6">
          <ThemeSwitcher />
        </div>
        <div class="pr-6">
          <button :class="[$style.hideSidebar, 'mt-2']" @click="hideSidebar">
            <DynamicIcon icon="icon-hide-sidebar" :class="$style.icon" />
            <span>Hide Sidebar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <IconButton
    size="xl"
    :class="[
      $style.showSidebar,
      {
        ['translate-x-0']: !store.state.isSidebarVisible,
      },
    ]"
    icon="icon-show-sidebar"
    @click="showSidebar"
  />
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import TheNavigation from './TheNavigation.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import IconButton from '@components/IconButton.vue';
import DynamicIcon from '@components/DynamicIcon.vue';
import useStore from '@composables/store';

const store = useStore();

const hideSidebar = () => {
  store.commit('setSidebarVisibility', false);
};

const showSidebar = () => {
  store.commit('setSidebarVisibility', true);
};
</script>

<style lang="scss" module>
.wrapper {
  @apply w-full h-full border-r overflow-hidden;

  @include theme(light) {
    @apply bg-white border-lines-light;
  }

  @include theme(dark) {
    @apply bg-dark-grey border-lines-dark;
  }
}
.content {
  @apply relative flex flex-col justify-between pb-8 w-full h-full;
  @include scrollbar-thin;
}
.navigation {
  @apply mt-[1rem] pr-6;
}
.showSidebar {
  @apply absolute bottom-8 left-0 w-[3.5rem] pr-1 rounded-r-full transform -translate-x-full;
}
.hideSidebar {
  @apply relative block w-full text-left py-3.5 pl-16 pr-4 rounded-r-full text-heading-m font-bold text-medium-grey;

  .icon {
    @apply absolute top-4 left-8;
  }

  &:hover {
    @apply text-main-purple;

    @include theme(light) {
      @apply bg-main-purple bg-opacity-10;
    }

    @include theme(dark) {
      @apply bg-white;
    }
  }
}
.footer {
  @apply mt-6;
}
</style>

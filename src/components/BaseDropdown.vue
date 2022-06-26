<template>
  <Menu as="div" :class="$style.wrapper">
    <MenuButton as="div">
      <slot />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems :class="$style.items">
        <MenuItem v-for="(item, idx) in items" v-slot="{active}" :key="idx">
          <button
            :class="[
              $style.button,
              {
                [$style['button--active']]: active,
              },
              item.class,
            ]"
            @click="item.onClick"
          >
            {{ item.name }}
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue';

interface DropItem {
  class?: string;
  name: string;
  onClick?(): void;
}

interface Props {
  items: DropItem[];
}

const props = defineProps<Props>();
</script>

<style lang="scss" module>
.wrapper {
  @apply relative inline-block text-left z-10;
}
.items {
  @apply absolute right-0 mt-6 py-2 w-[12rem] origin-top-right rounded-lg shadow;

  @include theme(light) {
    @apply bg-white;
  }

  @include theme(dark) {
    @apply bg-very-dark-grey;
  }

  &:focus {
    @apply ring-0;
  }
}
.button {
  @apply flex w-full items-center px-4 py-1.5 text-body-l text-medium-grey;

  &--active {
    @apply bg-main-purple text-white #{!important};
  }
}
</style>

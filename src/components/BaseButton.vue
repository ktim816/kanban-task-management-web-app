<template>
  <button
    :class="[
      $style.wrapper,
      $style[`wrapper--${size}`],
      $style[`wrapper--${priority}`],
      {
        [$style['wrapper--fix-width']]: fixWidth,
      },
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
interface Props {
  fixWidth?: boolean;
  priority?: 'primary' | 'secondary' | 'destructive';
  size?: 's' | 'l';
}

const props = withDefaults(defineProps<Props>(), {
  size: 's',
  priority: 'primary',
});
</script>

<style lang="scss" module>
button.wrapper {
  @apply font-bold;

  &:disabled {
    @apply opacity-25 pointer-events-none;
  }

  // Common
  &--fix-width {
    @apply block w-full;
  }

  // Size
  &--s {
    @apply py-2 px-4 rounded-[20px];
  }

  &--l {
    @apply py-3.5 px-6 text-heading-m rounded-[24px];
  }

  // Priority
  &--primary {
    @apply bg-main-purple text-white;

    &:hover {
      @apply bg-main-purple-hover;
    }
  }

  &--secondary {
    @apply text-main-purple;

    @include theme(light) {
      @apply bg-main-purple bg-opacity-10;

      &:hover {
        @apply bg-opacity-25;
      }
    }

    @include theme(dark) {
      @apply bg-white;
    }
  }

  &--destructive {
    @apply bg-red text-white;

    &:focus {
      @apply ring-red;
    }

    &:hover {
      @apply bg-red-hover;
    }
  }
}
</style>

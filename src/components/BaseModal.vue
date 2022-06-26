<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onCloseModal" :class="$style.wrapper">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay :class="$style.overlay" />
      </TransitionChild>

      <div :class="$style.container">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="[$style.panel, panelClass]">
              <div :class="$style.header">
                <DialogTitle
                  as="h3"
                  :class="[
                    $style.title,
                    {
                      'pr-8': $slots['icon-button'],
                    },
                    titleClass,
                  ]"
                >
                  {{ title }}
                </DialogTitle>
                <slot name="icon-button" />
              </div>
              <DialogDescription
                v-if="!!description"
                :class="$style.description"
                >{{ description }}</DialogDescription
              >

              <div class="mt-6">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
} from '@headlessui/vue';

const props = defineProps<{
  title: string;
  isOpen: boolean;
  titleClass?: string;
  panelClass?: string;
  description?: string;
  onCloseModal(): void;
}>();
</script>

<style lang="scss" module>
.wrapper {
  @apply relative z-10;
}
.overlay {
  @apply fixed inset-0 bg-black bg-opacity-50;
}
.container {
  @apply fixed inset-0;
  @include scrollbar-thin;
}
.panel {
  @apply w-full transform rounded-md p-8 text-left align-middle shadow-xl transition-all;

  @include theme(light) {
    @apply bg-white;
  }

  @include theme(dark) {
    @apply bg-dark-grey;
  }
}
.header {
  @apply flex justify-between items-start;
}
.title {
  @apply text-heading-l font-bold w-full;
}
.description {
  @apply text-medium-grey mt-6;
}
</style>

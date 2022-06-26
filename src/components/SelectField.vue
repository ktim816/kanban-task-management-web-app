<template>
  <Listbox
    as="div"
    v-model="value"
    v-slot="{open}"
    :class="[
      $style.wrapper,
      $style[`wrapper--${direction}`],
      {
        [$style['wrapper--has-error']]: !!errorMessage,
      },
    ]"
  >
    <ListboxLabel :class="$style.label">{{ label }}</ListboxLabel>
    <div class="relative">
      <ListboxButton :class="$style.button">
        <span
          :class="[
            $style.value,
            {
              [$style['value--empty']]: !value,
            },
          ]"
          >{{ value || 'Please select an option' }}</span
        >
        <DynamicIcon
          v-show="!open"
          aria-hidden="true"
          :class="$style.chevron"
          icon="icon-chevron-down"
        />
        <DynamicIcon
          v-show="open"
          aria-hidden="true"
          :class="$style.chevron"
          icon="icon-chevron-up"
        />
      </ListboxButton>

      <transition
        leave-to-class="opacity-0"
        leave-from-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
      >
        <ListboxOptions :class="$style.options">
          <ListboxOption
            :key="idx"
            as="template"
            :value="option"
            v-slot="{active}"
            v-for="(option, idx) in options"
          >
            <li
              :class="[
                $style.option,
                {
                  [$style['option--active']]: active,
                },
              ]"
            >
              <span class="block truncate">{{ option }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>

      <p :class="$style.message" v-if="errorMessage || meta.valid">
        {{ errorMessage }}
      </p>
    </div>
  </Listbox>
</template>

<script lang="ts" setup>
import {watch} from 'vue';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import {useField} from 'vee-validate';
import DynamicIcon from '@components/DynamicIcon.vue';

interface Props {
  name: string;
  rules?: any[];
  label: string;
  options: string[];
  modelValue?: string;
  direction?: 'top' | 'bottom';
}

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  direction: 'bottom',
});

const {value, errorMessage, meta} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

// Sync v-model binding with vee-validate model changes
watch(value, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue);
  }
});

// Sync vee-validate's model with external model changes.
watch(
  () => props.modelValue,
  (newModel) => {
    if (newModel !== value.value) {
      value.value = newModel as string;
    }
  }
);
</script>

<style lang="scss" module>
.wrapper {
  &--top {
    .options {
      @apply bottom-full mb-2;
    }
  }

  &--bottom {
    .options {
      @apply top-full mt-2;
    }
  }

  &--has-error {
    .button {
      @apply border-red focus:border-red focus:ring-red;

      &:hover {
        @apply border-opacity-100;
      }
    }
    .message {
      @apply text-red;
    }
  }
}
button.button {
  @apply relative appearance-none rounded pl-4 pr-10 py-[0.45rem] w-full text-left border border-medium-grey border-opacity-25 focus:ring-1 focus:border-main-purple;

  @include theme(light) {
    @apply bg-white;
  }

  @include theme(dark) {
    @apply bg-dark-grey;
  }

  &:hover {
    @apply border-opacity-50 focus:border-opacity-100;
  }
}
.chevron {
  @apply absolute top-2/4 right-3.5 transform -translate-y-2/4 text-medium-grey pointer-events-none;
}
.options {
  @apply absolute left-0 w-full py-1 overflow-auto rounded-lg shadow max-h-60 z-10;

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
.value {
  @apply block truncate;

  &--empty {
    @include theme(light) {
      @apply text-black text-opacity-25;
    }

    @include theme(dark) {
      @apply text-white text-opacity-25;
    }
  }
}
.label {
  @apply block mb-2 text-body-m font-bold w-full;

  @include theme(light) {
    @apply text-medium-grey;
  }
}
.option {
  @apply select-none relative py-2 px-4 cursor-pointer text-medium-grey;

  &--active {
    @apply bg-main-purple text-white;
  }
}
</style>

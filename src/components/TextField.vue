<template>
  <div
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--has-error']]: !!errorMessage,
      },
    ]"
  >
    <label v-if="!!label" :class="$style.label" :for="name">{{ label }}</label>
    <input
      v-if="!textarea"
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <AutoResize v-else v-slot="{resize}">
      <textarea
        :name="name"
        :id="name"
        :rows="4"
        :value="inputValue"
        :placeholder="placeholder"
        @blur="handleBlur"
        @input="sequence(resize, handleChange)($event)"
      />
    </AutoResize>

    <p :class="$style.message" v-if="errorMessage || meta.valid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import {toRef, defineProps} from 'vue';
import {useField} from 'vee-validate';
import {sequence} from '@helpers/common';
import AutoResize from '@components/AutoResize.vue';

interface Props {
  name: string;
  type?: string;
  value?: string;
  textarea?: boolean;
  placeholder?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  value: '',
  placeholder: '',
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<style lang="scss" module>
.wrapper {
  @apply relative w-full;

  input,
  textarea {
    @apply rounded px-4 py-[0.45rem] w-full border border-medium-grey border-opacity-25 focus:ring-1 focus:border-main-purple;

    @include theme(light) {
      @apply bg-white placeholder-black placeholder-opacity-25;
    }

    @include theme(dark) {
      @apply bg-dark-grey placeholder-white placeholder-opacity-25;
    }

    &:hover {
      @apply border-opacity-50 focus:border-opacity-100;
    }
  }

  textarea {
    @apply resize-none overflow-hidden;
  }

  &--has-error {
    input,
    textarea {
      @apply border-red text-red focus:border-red focus:ring-red;

      &:hover {
        @apply border-opacity-100;
      }
    }
  }

  .message {
    @apply text-red;
  }
}
.label {
  @apply block mb-2 text-body-m font-bold w-full;

  @include theme(light) {
    @apply text-medium-grey;
  }
}
</style>

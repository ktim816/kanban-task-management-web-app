<template>
  <label
    role="button"
    :tabindex="0"
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--completed']]: value,
      },
    ]"
  >
    <span :class="$style.label">{{ label }}</span>
    <input
      :id="name"
      :name="name"
      type="checkbox"
      v-model="value"
      :class="$style.input"
    />
    <span :class="$style.check">
      <DynamicIcon icon="icon-check" />
    </span>
  </label>
</template>

<script lang="ts" setup>
import {ref, toRef, toRefs, watch} from 'vue';
import {useField} from 'vee-validate';
import DynamicIcon from './DynamicIcon.vue';

interface Props {
  name: string;
  label: string;
  rules?: any[];
  value?: boolean;
  modelValue?: boolean;
}

const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const {name} = toRefs(props);

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {value} = useField(name, props.rules, {
  type: 'checkbox',
  checkedValue: props.modelValue,
});

// Sync v-model binding with vee-validate model changes
watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

// Sync vee-validate's model with external model changes.
watch(
  () => props.modelValue,
  (newModel) => {
    value.value = newModel as boolean;
  }
);
</script>

<style lang="scss" module>
.wrapper {
  @apply relative rounded py-3 pr-3 pl-11 w-full;

  &--completed {
    .label {
      @apply line-through;

      @include theme(light) {
        @apply text-black text-opacity-50;
      }

      @include theme(dark) {
        @apply text-white text-opacity-50;
      }
    }
  }

  @include theme(light) {
    @apply bg-light-grey;

    &:hover {
      @apply bg-main-purple bg-opacity-25;
    }
  }

  @include theme(dark) {
    @apply bg-very-dark-grey;

    &:hover {
      @apply bg-main-purple bg-opacity-25;
    }
  }
}
.label {
  @apply font-bold;

  @include theme(dark) {
    @apply text-white;
  }
}
.check {
  @apply absolute top-4 left-3 w-4 h-4 inline-flex items-center justify-center border rounded-sm border-medium-grey border-opacity-25 pointer-events-none text-white;

  > * {
    @apply invisible;
  }

  @include theme(light) {
    @apply bg-white;
  }

  @include theme(dark) {
    @apply bg-dark-grey;
  }
}
.input {
  @apply hidden;

  &:checked ~ .check {
    @apply bg-main-purple;

    > * {
      @apply visible;
    }
  }
}
</style>

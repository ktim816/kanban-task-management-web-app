<template>
  <Switch
    v-model="value"
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--active']]: value,
      },
    ]"
  >
    <span :class="$style.toggle" />
  </Switch>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {Switch} from '@headlessui/vue';
import {useField} from 'vee-validate';

interface Props {
  name: string;
  rules?: any[];
  modelValue?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const {value} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
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
button.wrapper {
  @apply relative inline-flex shrink-0 bg-main-purple h-5 w-10 items-center rounded-full;

  &--active {
    .toggle {
      @apply translate-x-[1.425rem];
    }
  }
}
.toggle {
  @apply inline-block h-3.5 w-3.5 transform rounded-full bg-white translate-x-[0.185rem] transition;
}
</style>

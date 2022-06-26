<template>
  <div :class="$style.wrapper">
    <Form
      :class="$style.form"
      :validation-schema="schema"
      :initial-values="initialValues"
    >
      <DynamicIcon icon="icon-light-theme" />
      <BaseSwitch name="isDarkTheme" @update:model-value="switchTheme" />
      <DynamicIcon icon="icon-dark-theme" />
    </Form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import {State} from '@store';
import storage from 'store2';
import {Form} from 'vee-validate';
import {onMounted, ref} from 'vue';
import useStore from '@composables/store';
import BaseSwitch from '@components/BaseSwitch.vue';
import DynamicIcon from '@components/DynamicIcon.vue';

const store = useStore();
const initialValues = ref({
  isDarkTheme: store.state.isDarkTheme || false,
});

const schema = yup.object().shape({
  isDarkTheme: yup.boolean(),
});

const switchTheme = (isDarkTheme: boolean) => {
  store.commit('changeTheme', isDarkTheme);
};

onMounted(() => {
  switchTheme(initialValues.value.isDarkTheme);
});
</script>

<style lang="scss" module>
.wrapper {
  @apply py-3.5 px-4 flex justify-center w-full rounded-[6px];

  @include theme(light) {
    @apply bg-light-grey;
  }

  @include theme(dark) {
    @apply bg-very-dark-grey;
  }
}
.form {
  @apply flex items-center space-x-6 text-medium-grey;
}
</style>

<template>
  <BaseModal
    :is-open="isOpen"
    title="Add New Column"
    panel-class="max-w-md"
    @close-modal="onCloseModal"
  >
    <Form
      :class="$style.form"
      :initial-values="initialValues"
      :validation-schema="schema"
      @submit="handleSubmit"
    >
      <TextField name="name" label="Name" placeholder="e.g. Todo" />
      <div :class="$style.buttons">
        <BaseButton fix-width>Create Column</BaseButton>
      </div>
    </Form>
  </BaseModal>
</template>

<script lang="ts" setup>
import {nanoid} from 'nanoid';
import {
  computed,
  defineProps,
  onMounted,
  reactive,
  ref,
  watch,
  watchSyncEffect,
} from 'vue';
import {Form, FieldArray} from 'vee-validate';
import TextField from '@components/TextField.vue';
import BaseModal from '@components/BaseModal.vue';
import BaseButton from '@components/BaseButton.vue';
import {Board, Column} from '@interfaces';
import * as yup from 'yup';
import useStore from '@composables/store';
import {useRouter} from 'vue-router';
import dashify from 'dashify';
import {getRandomColor} from '@helpers/common';

const props = defineProps<{
  isOpen: boolean;
  onCloseModal(): void;
}>();

const store = useStore();
const router = useRouter();

const defaultColumn: Column = {
  id: nanoid(),
  color: getRandomColor(),
  name: '',
  tasks: [],
};

const initialValues = ref(defaultColumn);
const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
});

const handleSubmit = (values: Column) => {
  store.commit('createColumn', values);
  props.onCloseModal();
};
</script>

<style lang="scss" module>
.buttons {
  @apply w-full space-y-6 mt-3;
}
.columns {
  @apply space-y-3;
}
.column {
  @apply flex items-center;
}
.label {
  @apply mb-2 text-body-m font-bold text-medium-grey;
}
.form {
  @apply space-y-6;
}
.close {
  @apply text-medium-grey;

  &:hover {
    @apply text-black text-opacity-60;
  }
}
</style>

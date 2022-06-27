<template>
  <BaseModal
    :is-open="isOpen"
    panel-class="max-w-md"
    @close-modal="onCloseModal"
    :title="column ? 'Edit Column' : 'Add New Column'"
  >
    <Form
      :class="$style.form"
      @submit="handleSubmit"
      :validation-schema="schema"
      :initial-values="initialValues || {}"
    >
      <TextField name="name" label="Name" placeholder="e.g. Todo" />
      <div :class="$style.buttons">
        <BaseButton fix-width>{{
          column ? 'Save Changes' : 'Create Column'
        }}</BaseButton>
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
import {createColumn} from '@helpers/board';

const props = defineProps<{
  column?: Column;
  isOpen: boolean;
  onCloseModal?(): void;
}>();

const store = useStore();
const router = useRouter();

const initialValues = ref<Column | null>(null);

store.watch(
  (state) => state,
  () => {
    initialValues.value = props.column || createColumn();
  },
  {immediate: true, deep: true}
);

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
});

const handleSubmit = (values: any) => {
  const eventName = props.column ? 'editColumn' : 'createColumn';
  store.commit(eventName, values as Column);
  props.onCloseModal?.();
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

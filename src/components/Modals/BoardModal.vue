<template>
  <BaseModal
    :title="isEditable ? 'Edit Board' : 'Add New Board'"
    :is-open="isOpen"
    panel-class="max-w-md"
    @close-modal="onCloseModal"
  >
    <Form
      :class="$style.form"
      :initial-values="initialValues || {}"
      :validation-schema="schema"
      @submit="handleSubmit"
    >
      <TextField name="name" label="Name" placeholder="e.g. Web Design" />
      <FieldArray name="columns" v-slot="{fields, push, remove}">
        <div>
          <BaseFields
            v-slot="{idx}"
            label="Columns"
            :fields="fields"
            @remove-field="remove"
          >
            <TextField :name="`columns[${idx}].name`" />
          </BaseFields>
          <div :class="$style.buttons">
            <BaseButton
              fix-width
              type="button"
              priority="secondary"
              @click="push(createColumn())"
              >+ Add New Column</BaseButton
            >
            <BaseButton fix-width>{{
              isEditable ? 'Save Changes' : 'Create New Board'
            }}</BaseButton>
          </div>
        </div>
      </FieldArray>
    </Form>
  </BaseModal>
</template>

<script lang="ts" setup>
import {nanoid} from 'nanoid';
import {computed, defineProps, readonly, ref, watch} from 'vue';
import {Form, FieldArray} from 'vee-validate';
import TextField from '@components/TextField.vue';
import BaseModal from '@components/BaseModal.vue';
import BaseButton from '@components/BaseButton.vue';
import BaseFields from '@components/BaseFields.vue';
import {Board} from '@interfaces';
import * as yup from 'yup';
import useStore from '@composables/store';
import {useRouter} from 'vue-router';
import dashify from 'dashify';
import {createColumn, createBoard} from '@helpers/board';

const props = defineProps<{
  isOpen: boolean;
  isEditable?: boolean;
  onCloseModal?(): void;
}>();

const store = useStore();
const router = useRouter();

const defaultBoard = createBoard('', [
  createColumn('Todo'),
  createColumn('Doing'),
  createColumn('Done'),
]);

const initialValues = ref<Board | null>(null);

store.watch(
  (state) => state,
  (newState) => {
    initialValues.value = props.isEditable
      ? newState.currentBoard
      : defaultBoard;
  },
  {immediate: true, deep: true}
);

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  columns: yup.array().of(
    yup
      .object()
      .shape({
        name: yup.string().required().label('Name'),
      })
      .strict()
  ),
});

const handleSubmit = (values: any) => {
  const eventName = props.isEditable ? 'editBoard' : 'createBoard';

  store.commit(eventName, {
    router,
    board: {
      ...(values as Board),
      path: `/${dashify(values.name)}`,
    },
  });

  props.onCloseModal?.();
};
</script>

<style lang="scss" module>
.buttons {
  @apply w-full space-y-6 mt-3;
}
.form {
  @apply space-y-6;
}
</style>

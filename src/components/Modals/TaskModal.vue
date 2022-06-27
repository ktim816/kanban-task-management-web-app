<template>
  <BaseModal
    :title="task ? 'Edit Task' : 'Add New Task'"
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
      <TextField
        name="title"
        label="Title"
        placeholder="e.g. Take coffee break"
      />
      <TextField
        textarea
        name="description"
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
      />
      <FieldArray name="subtasks" v-slot="{fields, push, remove}">
        <div>
          <BaseFields
            v-slot="{idx}"
            label="Subtasks"
            :fields="fields"
            @remove-field="remove"
          >
            <TextField
              :name="`subtasks[${idx}].title`"
              placeholder="e.g. Make coffee"
            />
          </BaseFields>
          <BaseButton
            fix-width
            class="mt-4"
            type="button"
            priority="secondary"
            @click="push(createSubtask())"
            >+ Add New Subtask</BaseButton
          >
        </div>
      </FieldArray>

      <SelectField
        v-if="!column"
        name="status"
        label="Status"
        direction="top"
        :options="store.getters.currentStatuses"
      />

      <div :class="$style.buttons">
        <BaseButton fix-width>{{
          task ? 'Save Changes' : 'Create Task'
        }}</BaseButton>
      </div>
    </Form>
  </BaseModal>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import dashify from 'dashify';
import {nanoid} from 'nanoid';
import {useRouter} from 'vue-router';
import {createSubtask} from '@helpers/board';
import {computed, defineProps, onMounted, ref, watch} from 'vue';
import {Form, FieldArray} from 'vee-validate';
import BaseFields from '@components/BaseFields.vue';
import TextField from '@components/TextField.vue';
import BaseModal from '@components/BaseModal.vue';
import BaseButton from '@components/BaseButton.vue';
import {Board, Column, Task} from '@interfaces';
import useStore from '@composables/store';
import AutoResize from '@components/AutoResize.vue';
import SelectField from '@components/SelectField.vue';
import IconButton from '@components/IconButton.vue';

interface Props {
  task?: Task;
  column?: Column;
  isOpen: boolean;
  onCloseModal?(): void;
}

const props = defineProps<Props>();

const store = useStore();
const router = useRouter();

const defaultTask: Task = {
  id: nanoid(),
  title: '',
  description: '',
  subtasks: [createSubtask()],
  ...(!props.column && {
    status: '',
  }),
};

const initialValues = ref<Task | null>(null);

store.watch(
  (state) => state,
  () => {
    initialValues.value = props.task || defaultTask;
  },
  {immediate: true, deep: true}
);

const schema = yup.object().shape({
  title: yup.string().required().label('Title'),
  description: yup.string(),
  subtasks: yup.array().of(
    yup
      .object()
      .shape({
        title: yup.string().required().label('Title'),
      })
      .strict()
  ),
  ...(!props.column && {
    status: yup.string().required().label('Status'),
  }),
});

const handleSubmit = (values: any) => {
  if (props.task) {
    store.commit('editTask', {
      oldTask: props.task,
      newTask: values as Task,
    });
  } else {
    store.commit('createTask', {
      ...(values as Task),
      ...(props.column && {
        status: props.column.name,
      }),
    });
  }

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

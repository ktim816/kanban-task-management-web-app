<template>
  <BaseModal
    :is-open="isOpen"
    :title="task.title"
    panel-class="max-w-md"
    :description="task.description"
    @close-modal="onCloseModal"
  >
    <template #icon-button>
      <BaseDropdown :items="dropItems">
        <IconButton priority="secondary" icon="icon-vertical-ellipsis" />
      </BaseDropdown>
    </template>
    <Form
      v-slot="{values}"
      :class="$style.form"
      :initial-values="initialValues || {}"
      @submit="handleSubmit"
    >
      <FieldArray
        name="subtasks"
        v-slot="{fields}"
        v-if="values.subtasks.length"
      >
        <BaseFields
          :fields="fields"
          v-slot="{idx}"
          :label="`Subtasks (${getCompletedSubtasks(fields).length} of ${
            fields.length
          })`"
        >
          <BaseCheckbox
            :key="getSubtask(fields[idx].value, 'id')"
            :label="getSubtask(fields[idx].value, 'title')"
            :name="`subtasks[${idx}].isCompleted`"
          />
        </BaseFields>
      </FieldArray>

      <SelectField
        name="status"
        direction="top"
        label="Current Status"
        :options="store.getters.currentStatuses"
      />

      <BaseButton fix-width>Save Changes</BaseButton>
    </Form>
  </BaseModal>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import dashify from 'dashify';
import {nanoid} from 'nanoid';
import {createSubtask} from '@helpers/board';
import {computed, defineProps, onMounted, ref, watch} from 'vue';
import {
  Form,
  FieldArray,
  FieldArrayContext,
  FieldContext,
  FieldEntry,
} from 'vee-validate';
import BaseFields from '@components/BaseFields.vue';
import TextField from '@components/TextField.vue';
import BaseModal from '@components/BaseModal.vue';
import {Board, Column, Subtask, Task} from '@interfaces';
import useStore from '@composables/store';
import AutoResize from '@components/AutoResize.vue';
import SelectField from '@components/SelectField.vue';
import IconButton from '@components/IconButton.vue';
import TaskModal from '@components/Modals/TaskModal.vue';
import BaseCheckbox from '@components/BaseCheckbox.vue';
import BaseButton from '@components/BaseButton.vue';
import BaseDropdown from '@components/BaseDropdown.vue';

interface Props {
  task: Task;
  isOpen: boolean;
  onCloseModal?(): void;
  onEditTask?(): void;
  onDeleteTask?(): void;
}

const props = defineProps<Props>();
const store = useStore();

const dropItems = [
  {
    name: 'Edit Task',
    onClick: props.onEditTask,
  },
  {
    name: 'Delete Task',
    class: 'text-red',
    onClick: props.onDeleteTask,
  },
];

const initialValues = ref<{
  subtasks: Task['subtasks'];
  status: Task['status'];
} | null>(null);

store.watch(
  (state) => state,
  () => {
    initialValues.value = {
      status: props.task.status,
      subtasks: props.task.subtasks,
    };
  },
  {immediate: true}
);

const getSubtask = (field: Readonly<any>, prop: keyof Subtask) => {
  return field[prop];
};

const getCompletedSubtasks = (
  subtasks: FieldArrayContext<any>['fields']['value']
) => {
  return subtasks.filter((subtask) => subtask.value.isCompleted);
};

const handleSubmit = (values: any) => {
  store.commit('editTask', {
    oldTask: props.task,
    newTask: {
      ...props.task,
      ...(values as Task),
    },
  });
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

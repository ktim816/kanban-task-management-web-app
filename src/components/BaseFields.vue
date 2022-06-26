<template>
  <div>
    <div :class="$style.label">{{ label }}</div>
    <div :class="$style.fields">
      <div
        :key="field.key"
        :data-key="field.key"
        :class="$style.field"
        v-for="(field, idx) in fields"
      >
        <slot :idx="idx" />
        <IconButton
          icon="icon-cross"
          priority="secondary"
          @click="onRemoveField?.(idx)"
          v-if="onRemoveField && fields.length > 1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
import {FieldArrayContext} from 'vee-validate';
import IconButton from '@components/IconButton.vue';

interface Props {
  label: string;
  fields: FieldArrayContext['fields']['value'];
  onRemoveField?: FieldArrayContext['remove'];
}

const props = defineProps<Props>();
</script>

<style lang="scss" module>
.fields {
  @apply space-y-3;
}
.field {
  @apply flex items-start;
}
.label {
  @apply mb-2 text-body-m font-bold;

  @include theme(light) {
    @apply text-medium-grey;
  }
}
</style>

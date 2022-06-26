<template>
  <slot :ref="el" :resize="resize" />
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const el = ref<HTMLElement>();

const resize = (event: Event) => {
  const target = event.target as HTMLElement;

  target.style.height = 'auto';
  target.style.height = `${target.scrollHeight}px`;
};

onMounted(() => {
  el.value?.style.setProperty('height', `${el.value.scrollHeight}px`);
});
</script>

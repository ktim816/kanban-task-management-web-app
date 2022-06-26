<template>
  <component :name="icon" :is="loadedIcon" />
</template>

<script lang="ts">
import {shallowRef, defineComponent} from 'vue';
import iconPlaceholder from '@icons/icon-placeholder.svg';

export default defineComponent({
  props: {
    icon: {
      type: String as () => string,
      required: true,
    },
  },

  setup(props) {
    const loadedIcon = shallowRef(iconPlaceholder);

    // Dynamically load icons
    (async () => {
      try {
        const module = await import(`../assets/icons/${props.icon}.svg`);
        loadedIcon.value = module.default;
      } catch (error) {
        console.error(error);
      }
    })();

    return {props, loadedIcon};
  },
});
</script>

<template>
  <main
    :class="[
      $style.wrapper,
      {
        [$style['wrapper--collapsed']]: !store.state.isSidebarVisible,
      },
    ]"
  >
    <TheHeader />
    <div :class="$style.content">
      <TheSidebar />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import TheSidebar from '@components/Sidebar/TheSidebar.vue';
import TheHeader from '@components/TheHeader.vue';
import {useRoute, useRouter} from 'vue-router';
import useStore from '@composables/store';

const store = useStore();
const router = useRouter();
const route = router.currentRoute;

onMounted(() => {
  if (!route.value.params.hasOwnProperty('id')) {
    const boardPath = store.state.boards[0].path;
    router.replace(boardPath);
  }
});
</script>

<style lang="scss" module>
.wrapper {
  @apply flex flex-col h-screen;

  &--collapsed {
    .content {
      grid-template-columns: 0 1fr;
    }
  }
}
.content {
  @apply grid h-full overflow-hidden;
  grid-template-columns: 18.75rem 1fr;
}
</style>

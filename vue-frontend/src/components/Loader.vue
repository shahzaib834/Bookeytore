<script setup lang="ts">
const props = defineProps({
  visible: Boolean,
})

</script>

<template>
  <div v-if="props.visible" className='h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
    <!-- Loader Spinner here -->
    Loading...
  </div>
</template>
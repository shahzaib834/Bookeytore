import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoaderStore = defineStore('loader', () => {
  const isLoaderSpinning = ref(false);

  const onLoaderOpen = () => {
    isLoaderSpinning.value = true;
  };

  const onLoaderClose = () => {
    isLoaderSpinning.value = false;
  };

  return { isLoaderSpinning, onLoaderOpen, onLoaderClose };
});
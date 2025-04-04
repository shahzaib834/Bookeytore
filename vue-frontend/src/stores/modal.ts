import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const activeModal = ref<string | null>(null); // Tracks which modal is open (e.g., 'login', 'signup')
  // const modalData = ref<any>(null); // Optional: Data to pass to the modal

  const openModal = (modalName: string, data?: any) => {
    activeModal.value = modalName;
    // modalData.value = data || null;
  };

  const closeModal = () => {
    activeModal.value = null;
    // modalData.value = null;
  };

  return { activeModal, openModal, closeModal }; // model data should pass here if wanna use
});
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useModalStore } from '../stores/modal';
import BookModal from '../components/modals/BookModal.vue';
import MemberModal from '../components/modals/MemberModal.vue';
import { useLoaderStore } from '../stores/loader';
import Loader from '../components/Loader.vue';
import RadioSection from '../components/RadioSection.vue';
import { getData } from '../api/GET';

const data = ref([]);
const radioOption = ref('books');
const page = ref(1);
const totalPages = ref(0);

const { activeModal, openModal } = useModalStore();
const { isLoaderSpinning, onLoaderOpen, onLoaderClose } = useLoaderStore();

const fetchData = async (type: string) => {
  onLoaderOpen();
  const response = await getData(type, page.value);
  data.value = response;

  // TODO: Need to test if this is working or not.
  if (response?.length < 10) {
    // @ts-ignore
    totalPages.value(page.value);
  } else {
    // @ts-ignore
    totalPages.value(page.value + 1);
  }
  
  onLoaderClose();
};

const refetchData = () => fetchData(activeModal!);

watch(page, () => {
  fetchData(radioOption.value);
});

const onStateChange = (e: any) => {
  radioOption.value = e.target.value;
  fetchData(e.target.value);
};

const onNextClick = () => {
  page.value = page.value + 1;
};

const onPrevClick = () => {
  page.value = page.value - 1;
};
</script>

<template>
  <div>
    <Loader :visible="isLoaderSpinning" />
    <BookModal v-if="activeModal && activeModal === 'book'" :refetch-data="refetchData" />
    <MemberModal v-if="activeModal && activeModal === 'member'" :refetch-data="refetchData" />
    <RadioSection :radioOption="radioOption" :onChange="onStateChange" />
    
      <!-- Filters Here later -->

    <div class="flex gap-5 p-5 mt-5 rounded-md justify-center">
      <button
        class="p-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md"
        @click="openModal('book')"
      >
        Create/Update Book
      </button>
      <button
        class="p-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md"
        @click="openModal('member')"
      >
        Create/Update Member
      </button>
    </div>

    <template v-if="!data.length">
      <div class="mt-5 flex justify-center items-center p-2 text-2xl w-full">
        Nothing to show!
      </div>
    </template>

    <div
      class="p-5 grid grid-col-1 sm:grip-col-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-4 gap-16"
    >
      <template v-if="data.length">
        <template v-for="item in data">
          <div v-if="radioOption === 'books'">
            <!-- @vue-ignore -->
            <BookTile :key="item.id" :book="item" />
          </div>
          <div v-else>
            <!-- @vue-ignore -->
            <MemberTile :key="item.id" :member="item" />
          </div>
        </template>
      </template>
    </div>

    <div class="flex justify-end gap-6 mt-2 p-6">
      <div
        class="flex justify-center items-center gap-1"
        :class="{
          'pointer-events-none opacity-60': page === 1,
          'cursor-pointer': page > 1,
        }"
        @click="onPrevClick"
      >
        <AiOutlineArrowLeft class="text-red-500" size="{25}" />
        <p>Prev</p>
      </div>
      <div
        class="flex justify-center items-center gap-1 cursor-pointer"
        :class="{
          'pointer-events-none opacity-60': page >= totalPages,
          'cursor-pointer': page < totalPages,
        }"
        @click="onNextClick"
      >
        <p>Next</p>
        <AiOutlineArrowRight class="text-red-500" size="{25}" />
      </div>
    </div>
  </div>
</template>

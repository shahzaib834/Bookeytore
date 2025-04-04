<script setup lang="ts">
import { type Book } from '../interfaces/Book';

const defaultImage =
  'https://elements-cover-images-0.imgix.net/43a0f94b-abc5-4bc9-98c1-92f72cf03ec0?auto=compress%2Cformat&fit=max&w=1370&s=dfeda277333cef334b9cdddc8d98bcc9';

const props = defineProps<{
  book: Book;
}>();

const handleBookClick = () => {
  // navigate(`/book/${book.id}`);
};
</script>

<template>
  <div
    className="flex flex-col justify-center gap-2 border border-slate-500 p-2 rounded-md cursor-pointer"
    @click="handleBookClick"
  >
    <!-- add || default image -->
    <img :src="book.image.url" class="h-52 w-full rounded-lg" />
    <div className="flex flex-col gap-1">
      <p>
        Title: <span>{{ props.book.title }}</span>
      </p>
      <p>Author: <span></span></p>
      <p>
        Rent: <span>{{ props.book.rentFee }}$</span>
      </p>
    </div>
  </div>
</template>

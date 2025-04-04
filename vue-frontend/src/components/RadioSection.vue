<script setup lang="ts">
const props = defineProps<{
  radioOption: String,
  onChange: (e: any) => void
}>();

const handleChange = (e: any) => {
      props.onChange(e);
}

</script>

<template>
    <div className='flex justify-around mt-2'>
      <div className='flex gap-2'>
        <input type="radio" id="one" value="book" v-model="props.radioOption" @change="handleChange" />
        <label id='bookLabel' for="bookLabel">BOOK</label>
      </div>
      <div className='flex gap-2'>
        <input type="radio" id="two" value="member" v-model="props.radioOption" @change="handleChange" />
        <label id='memberLabel' for="memberLabel">MEMBER</label>
      </div>
    </div>
</template>
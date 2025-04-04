<script setup lang="ts">
import { type Member } from '../interfaces/Member';

const props = defineProps<{
  member: Member;
  shortImage?: boolean;
}>();

const handleMemberClick = () => {
  // navigate(`/member/${member.id}`);
};

</script>

<template>
  <div class="flex flex-col justify-between gap-2 border border-slate-500 p-2 rounded-md cursor-pointer" :class="{
    'w-fit': !shortImage,
  }" @click="handleMemberClick">
    <img :src="props.member.image.url" class="w-full rounded-lg" :class="{ 'h-28': shortImage, 'h-52': !shortImage }" />
    <div className='flex flex-col gap-1'>
      <p>
        name: <span>{{ member.name }}</span>
      </p>
      <p>
        Defaulter: <span>{{ member.isDefaulter ? 'True' : 'False' }}</span>
      </p>
      <p>
        Monthly Subscribed:{' '}
        <span>{{ member.isMonthlySubscribed ? 'True' : 'False' }}</span>
      </p>
    </div>
  </div>
</template>

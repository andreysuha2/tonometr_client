<template>
    <div class="main-page">
        <div class="base-container">
            <DiaryList v-if="diaryStore.list" :list="diaryStore.list"/>   
        </div>
        <DiaryDialog/>
    </div>
</template>

<script lang="ts">
export default { name: "MainPage" };
</script>

<script lang="ts" setup>
import DiaryList from '~/components/Diary/List/index.vue';
import DiaryDialog from '~/components/Diary/Modals/index.vue';
import useDiaryStore from '~/store/diary';

const diaryStore = useDiaryStore();
</script>
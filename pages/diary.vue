<template>
    <div class="diary-page">
        <div class="base-container">
            <DiaryMonthSelector/>
            <DiaryList v-if="diaryStore.list" :list="diaryStore.list"/>   
        </div>
        <DiaryDialog/>
    </div>
</template>

<script lang="ts">
import DiaryList from '~/components/Diary/List/index.vue';
import DiaryDialog from '~/components/Diary/Modals/index.vue';
import DiaryMonthSelector from '~/components/Diary/MonthSelector/index.vue';

export default { 
    name: "DiaryPage",
    components: { DiaryList, DiaryDialog, DiaryMonthSelector }
};
</script>

<script lang="ts" setup>
import useDiaryStore from '~/store/diary';

const diaryStore = useDiaryStore();
</script>

<style lang="scss" scoped>
.main-diary {
    padding-bottom: 20px;
}
</style>
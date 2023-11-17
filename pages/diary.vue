<template>
    <div class="diary-page">
        <div class="base-container diary-page--container">
            <AppLoader v-if="useLoader"/>
            <DiaryMonthSelector class="diary-page--month-selector"/>
            <DiaryList v-if="store.list" :list="store.list"/>   
        </div>
        <DiaryDialog/>
    </div>
</template>

<script lang="ts">
import AppLoader from '~/components/AppLoader/index.vue';
import DiaryList from '~/components/Diary/List/index.vue';
import DiaryDialog from '~/components/Diary/Modals/index.vue';
import DiaryMonthSelector from '~/components/Diary/MonthSelector/index.vue';

export default { 
    name: "DiaryPage",
    components: { DiaryList, DiaryDialog, DiaryMonthSelector, AppLoader }
};
</script>

<script lang="ts" setup>
import { useDiary } from '~/composable/diary';

const { store } = useDiary(),
    useLoader = computed(() => store.listLoaded);
</script>

<style lang="scss" scoped>
.diary-page {
    // vars
    --max-width: 500px;
    --border: 1px solid #000;
    --item-gorizontal-paddings: 10px;
    --item-vertical-paddings: 5px;

    // styles
    padding-bottom: 20px;

    &--container {
        position: relative;
    }



    &--month-selector {
        margin-bottom: 20px;
    }
}
</style>
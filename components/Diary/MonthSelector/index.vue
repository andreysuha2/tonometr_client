<template>
    <div class="diary-month-selector"></div>
</template>

<script lang="ts">
export default { name: "DiaryMonthSelector" };
</script>

<script lang="ts" setup>
import { useDiary } from '~/composable/diary';

const now = new Date(),
    { store } = useDiary(),
    { year: paramYear, month: paramMonth } = useRoute().query,
    year = ref(Number(paramYear || now.getFullYear())),
    month = ref(Number(paramMonth || now.getMonth() + 1)),
    period = computed(() => ({ month: month.value, year: year.value }));
    onNuxtReady(() => store.updatePeriod(period.value));
</script>
<template>
    <div class="diary-month-selector">
        <v-container>
            <v-row>
                <v-col>
                    <v-select
                        v-model="month"
                        label="Місяць"
                        item-title="name"
                        item-value="value"
                        :items="monthes"
                        hide-details
                        variant="underlined"></v-select>
                </v-col>
                <v-col>
                    <v-select
                        v-model="year"
                        label="Рік"
                        :items="years"
                        hide-details
                        variant="underlined"></v-select>
                </v-col>
            </v-row>
            <v-row align-content="center" class="justify-center">
                <v-col cols="3">
                    <v-btn @click="toToday()">Сьогодні</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
export default { name: "DiaryMonthSelector" };
</script>

<script lang="ts" setup>
import { useDiary } from '~/composable/diary';

const route = useRoute(),
    genYears = (from: number = 1990, to: number = 2050): Array<Number> => {
        const years = [];
        for(let i = from; i <= to; i++) years.push(i);
        return years;
    },
    getParamDate = () => {
        return {
            paramMonth: Number(route.query.month),
            paramYear: Number(route.query.year)
        }
    },
    toToday = () => router.replace({ query: { year: now.getFullYear(), month: now.getMonth() + 1 } });
    
let { paramYear, paramMonth } = toRefs(reactive(getParamDate()));

const now = new Date(),
    router = useRouter(),
    { store } = useDiary(),
    year = computed({
        get() { return Number(paramYear.value || now.getFullYear()); },
        set(year: number) { router.replace({ query: { year, month: month.value } }); }
    }),
    month = computed({
        get() { return Number(paramMonth.value || now.getMonth() + 1); },
        set(month: number) { router.replace({ query: { year: year.value, month } }); } 
    }),
    period = computed(() => ({ month: month.value, year: year.value })),
    years = genYears(),
    monthes = [
        { name: 'Січень', value: 1 },
        { name: 'Лютий', value: 2 },
        { name: 'Березень', value: 3 },
        { name: 'Квітень', value: 4 },
        { name: 'Травень', value: 5 },
        { name: 'Червень', value: 6 },
        { name: 'Липень', value: 7 },
        { name: 'Серпень', value: 8 },
        { name: 'Вересень', value: 9 },
        { name: 'Жовтень', value: 10 },
        { name: 'Листопад', value: 11 },
        { name: 'Грудень', value: 12 }
    ];
    watch(() => route.query, () => {
        const date = getParamDate();
        paramMonth.value = date.paramMonth;
        paramYear.value = date.paramYear;
        store.updatePeriod(period.value);
    })
    onNuxtReady(() => store.updatePeriod(period.value));
</script>

<style lang="scss" scoped>
.diary-month-selector {
    border: var(--border);
    border-radius: 5px;
    max-width: var(--max-width);
    margin: 0 auto;
}
</style>
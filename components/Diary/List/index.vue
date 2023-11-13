<template>
    <div class="diary">
        <div v-if="filterList.length" class="diary--list">
            <DayBlock v-for="item in filterList"
                :key="item.date"
                v-bind="item"/>    
        </div>
        <div class="diary--empty">
            <span>Записів не знайдено</span>
        </div>
        <div class="diary--add">
            <v-btn @click="startRecordCreation" prepend-icon="mdi-plus">
                додати запис
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "DiaryListComponent" };
</script>

<script lang="ts" setup>
// import types
import type { DiaryRecord, DiaryDayBlock } from '~/assets/types/diary';
import { useDiary } from '~/composable/diary';

// import components
import DayBlock from './dayBlock.vue';

// import libs
import moment from 'moment';

// types
interface Props { list: Array<DiaryRecord> };

// logic    
const props = withDefaults(defineProps<Props>(), { list: () => [] }),
    { list } = toRefs(props), 
    filterList = computed(() => list.value.reduce((accList: DiaryDayBlock[], item: DiaryRecord) => {
        const date = moment(item.timestamp).format('DD-M-YYYY');
        let block: DiaryDayBlock | undefined = accList.find(({ date: blockDate }) => blockDate === date);
        if(!block) {
            block = { date, list: [] };
            accList.push(block)
        }
        block.list.push(item);
        return accList;
    }, [])),
    { startRecordCreation } = useDiary();
</script>

<style lang="scss" scoped>
.diary {
    // vars
    --max-width: 500px;
    --border: 1px solid #000;
    --item-gorizontal-paddings: 10px;
    --item-vertical-paddings: 5px;

    // styles
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;

    &--list {
        border: var(--border);
        border-radius: 5px;
        overflow: hidden;
    }

    &--empty {
        text-align: center;
        font-weight: bold;
    }

    &--add {
        margin-top: 10px;
        text-align: center;
    }
}
</style>
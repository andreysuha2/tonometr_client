<template>
    <div class="diary">
        <div class="diary--list">
            <DayBlock v-for="item in filterList"
                :key="item.date"
                v-bind="item"/>    
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "DiaryListComponent" };
</script>

<script lang="ts" setup>
// import types
import type { DiaryRecord, DiaryDayBlock } from '~/assets/types/diary';

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
    }, []));
</script>
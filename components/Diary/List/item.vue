<template>
    <div class="diary-list-item flex justify-between" @click="useRecordDialog(dialogData)">
        <div class="diary-list-item--cell diary-list-item--cell__time">
            <v-icon class="diary-list-item--cell-icon" icon="mdi-clock-outline"/>
            <span>{{ time }}</span>
        </div>
        <div class="diary-list-item--cell diary-list-item--cell__pressure-high">
            <v-icon class="diary-list-item--cell-icon" icon="mdi-arrow-top-right"/>
            <span>{{ pressure.high }}</span>
        </div>
        <div class="diary-list-item--cell diary-list-item--cell__pressure-lower">
            <v-icon class="diary-list-item--cell-icon" icon="mdi-arrow-bottom-right"/>
            <span>{{  pressure.lower }}</span>
        </div>
        <div class="diary-list-item--cell diary-list-item--cell__pressure-pulse">
            <v-icon class="diary-list-item--cell-icon" icon="mdi-pulse"/>
            <span>{{ pulse }}</span>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "DiaryListItem" }
</script>

<script lang="ts" setup>
// import types
import type { DiaryRecord, DiaryRecordDialog } from '~/composable/diary';

// import composable
import { useDiary } from '~/composable/diary';

// import libs
import moment from 'moment';

const props = defineProps<DiaryRecord>(),
    { timestamp, pressure, pulse, id } = toRefs(props),
    time = computed(() => moment(timestamp?.value).format("HH:mm")),
    dialogData: DiaryRecordDialog = {
        date: timestamp?.value?.toLocaleString() || new Date().toLocaleDateString(),
        record: { id: id?.value, pressure: pressure.value, pulse: pulse.value },
        type: 'update'
    },
    { useRecordDialog } = useDiary();
</script>

<style lang="scss" scoped>
.diary-list-item {
    // vars
    --background-color: #fff;

    // styles
    background-color: var(--background-color);
    cursor: pointer;

    &:hover {
        --background-color: rgba(0, 0, 0, .2)
    }

    &:not(:last-child) {
        border-bottom: var(--border);
    }

    &--cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--item-vertical-paddings) var(--item-gorizontal-paddings);

        &:not(:last-child) {
            border-right: var(--border);
        }
    }
}
</style>
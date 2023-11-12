<template>
    <div class="diary-list-item flex justify-between">
        <div class="diary-list-item--cell diary-list-item--cell__time">{{ time }}</div>
        <div class="diary-list-item--cell diary-list-item--cell__pressure-high">{{ pressure.high }}</div>
        <div class="diary-list-item--cell diary-list-item--cell__pressure-lower">{{  pressure.lower }}</div>
        <div class="diary-list-item--cell diary-list-item--cell__pressure-pulse">{{ pulse }}</div>
    </div>
</template>

<script lang="ts">
export default { name: "DiaryListItem" }
</script>

<script lang="ts" setup>
// import types
import type { DiaryRecord } from '~/assets/types/diary';

// import libs
import moment from 'moment';

const props = defineProps<DiaryRecord>(),
    { timestamp, pressure, pulse } = toRefs(props),
    time = computed(() => moment(timestamp.value).format("HH:mm"));
</script>
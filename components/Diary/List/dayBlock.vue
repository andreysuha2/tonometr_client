<template>
    <div class="diary-day-block">
        <div class="diary-day-block--header">
            <span>{{ date }}</span>
        </div>
        <div class="diary-day-block--body">
            <ListItem v-for="item in list"
                :key="item.id"
                v-bind="item"/>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: 'DiaryDayBlock' };
</script>

<script lang="ts" setup>
import type { DiaryDayBlock } from '~/assets/types/diary';
import ListItem from "./item.vue";
defineProps<DiaryDayBlock>();
</script>
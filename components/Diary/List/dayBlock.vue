<template>
    <div class="diary-day-block">
        <div class="diary-day-block--header flex justify-between items-center">
            <div class="flex items-center">
                <v-icon icon="mdi-calendar"/>
                <span>{{ date }}</span>
            </div>
            <v-btn prepend-icon="mdi-plus"
                @click="startRecordCreation(date)" 
                class="diary-day-block--add-new-btn">додати запис</v-btn>
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
import { useDiary } from "~/composable/diary";

const props = defineProps<DiaryDayBlock>(),
    { date } = toRefs(props),
    { startRecordCreation } = useDiary();
</script>

<style lang="scss" scoped>
.diary-day-block {
    &--header {
        border-bottom: var(--border);
        text-align: center;
        font: {
            weight: bold;
            size: 14px;
        }
        padding: var(--item-vertical-paddings) var(--item-gorizontal-paddings);
    }

    &--add-new-btn {
        // vars
        --v-btn-height: 25px;
        --v-btn-size: 12px;

        // styles
        text-transform: none;
        font-weight: bold;
    }
}
</style>
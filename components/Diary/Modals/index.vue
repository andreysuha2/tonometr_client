<template>
    <v-dialog v-model="isOpenDialog"
        max-width="500px"
        class="diary-modal">
        <v-card :title="store.dialog.title"></v-card>
        </v-dialog>
</template>

<script lang="ts">
export default { name: 'DiaryDialog' };
</script>

<script lang="ts" setup>
import useDiaryStore from '~/store/diary';
const store = useDiaryStore(),
    isOpenDialog = computed({
        get() { return store.dialog.open; },
        set(val = true) { store.openDialog(val); } 
    });
</script>
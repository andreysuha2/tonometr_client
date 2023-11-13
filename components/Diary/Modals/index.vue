<template>
    <v-dialog v-model="isOpenDialog"
        max-width="500px"
        class="diary-modal">
        <v-card :title="title">
            <v-card-text>
                <div class="diary-modal--row">
                    <div class="dialog-modal--cell">
                        <v-menu
                            ref="menu">
                            <template v-slot:activator="{ on, attrs }">
                                <v-combobox
                                    readonly
                                    chips
                                    small-chips
                                    label="Дата запису"
                                    prepend-icon="mdi-calendar"
                                    v-on="on"
                                    v-bind="attrs"/>
                            </template>
                            <v-date-picker/>
                        </v-menu>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default { name: 'DiaryDialog' };
</script>

<script lang="ts" setup>
import useDiaryStore from '~/store/diary';
const store = useDiaryStore(),
    menu = ref(),
    isOpenDialog = computed({
        get() { return store.dialog.open; },
        set(val = true) { store.openDialog(val); } 
    }),
    { title, date, record } = toRefs(store.dialog);
</script>
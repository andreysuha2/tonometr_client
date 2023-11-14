<template>
    <v-dialog v-model="isOpenDialog"
        @update:model-value="onUpdateDialog"
        max-width="500px"
        class="diary-modal">
        <div v-if="useLoader" class="diary-modal--loader flex flex-center">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
        <v-card v-if="record" :title="title">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-menu
                                v-model="isOpenDate"
                                :close-on-content-click="false">
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                        prepend-icon="mdi-calendar"
                                        :model-value="date?.toLocaleDateString()"
                                        readonly
                                        label="Дата"
                                        v-bind="props"/>
                                </template>
                                <v-date-picker
                                    @update:model-value="isOpenDate = false" 
                                    v-model="date"/>
                            </v-menu>
                        </v-col>
                        <v-col>
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-text-field label="Час"
                                        type="time"
                                        v-model="time"
                                        prepend-icon="mdi-clock-outline"
                                        v-bind="props"/>
                                </template>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                hint="Верхній"
                                persistent-hint
                                prepend-icon="mdi-arrow-top-right" 
                                v-model="record.pressure.high" label="Тиск"/>
                        </v-col>
                        <v-col>
                            <v-text-field
                                hint="Нижній"
                                persistent-hint
                                prepend-icon="mdi-arrow-bottom-right"
                                v-model="record.pressure.lower" label="Тиск"/>
                        </v-col>
                        <v-col>
                            <v-text-field
                                prepend-icon="mdi-pulse"
                                v-model="record.pulse" label="Пульс"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue"
                    variant="text"
                    @click="addRecord"
                    v-if="type === 'create'"
                >
                    Додати
                </v-btn>
                <v-btn
                    color="blue"
                    variant="text"
                    @click="setRecord"
                    v-if="type === 'update'"
                >
                    Онвити
                </v-btn>
                <v-btn
                    color="blue"
                    variant="text"
                    @click="removeRecord"
                    v-if="type === 'update'"
                >
                    Видалити
                </v-btn>
                <v-btn
                    color="red"
                    variant="text"
                    @click="isOpenDialog = false"
                >
                    Закрити
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default { name: 'DiaryDialog' };
</script>

<script lang="ts" setup>
import { useDiary } from '~/composable/diary';
import type { DiaryRecord } from '~/composable/diary';

console.log('created');

const { store, updateDateTime, createRecord, updateRecord, deleteRecord } = useDiary(),
    onUpdateDialog = (val: boolean) => { if(!val) store.skipDialog() },
    useLoader = ref(false),
    isOpenDate = ref(false),
    isOpenDialog = computed({
        get() { return store.dialog.open; },
        set(val = true) { store.openDialog(val); } 
    }),
    date = computed({
        get(): Date { return store.dialog.date || new Date(); },
        set(val: Date) { store.dialog.date = updateDateTime(val, time.value); }
    }),
    time = computed({
        get() {  
            const formatTime = (t: number) => t < 10 ? `0${t}` : t;
            return `${formatTime(date.value?.getHours())}:${formatTime(date.value?.getMinutes())}`;
        },
        set(val: string) { store.dialog.date = updateDateTime(structuredClone(date.value), val); }
    }),
    { dialog } = toRefs(store),
    { title, record, type } = toRefs(dialog.value),
    withRecord = (handler: (record: DiaryRecord) => Promise<any>) => {
        if(record?.value) {
            useLoader.value = true;
            return handler(record.value).then(() => {
                store.skipDialog();
                isOpenDialog.value = false;
            }).catch(e => console.log(e))
            .finally(() => { useLoader.value = false });
        }
    },
    addRecord = () => withRecord((record) => createRecord(date.value, record)),
    setRecord = () => withRecord((record) => updateRecord(date.value, record)),
    removeRecord = () => withRecord((record) => deleteRecord(record));
</script>

<style lang="scss" scoped>
.diary-modal {
    &--loader {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: rgba(0, 0, 0, .3);
        z-index: 10;
    }
}
</style>
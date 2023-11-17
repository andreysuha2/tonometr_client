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
        <v-card v-if="dialog.record" :title="title">
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
                                type="number"
                                :error-messages="v$.pressure.high.$errors.map(error => String(error.$message))"
                                prepend-icon="mdi-arrow-top-right" 
                                v-model="dialog.record.pressure.high" label="Тиск"/>
                        </v-col>
                        <v-col>
                            <v-text-field
                                hint="Нижній"
                                persistent-hint
                                type="number"
                                :error-messages="v$.pressure.lower.$errors.map(error => String(error.$message))"
                                prepend-icon="mdi-arrow-bottom-right"
                                v-model="dialog.record.pressure.lower" label="Тиск"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                prepend-icon="mdi-pulse"
                                type="number"
                                :error-messages="v$.pulse.$errors.map(error => String(error.$message))"
                                v-model="dialog.record.pulse" label="Пульс"/>
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
                    v-if="dialog.type === 'create'"
                >
                    Додати
                </v-btn>
                <v-btn
                    color="blue"
                    variant="text"
                    @click="setRecord"
                    v-if="dialog.type === 'update'"
                >
                    Оновити
                </v-btn>
                <v-btn
                    color="blue"
                    variant="text"
                    @click="removeRecord"
                    v-if="dialog.type === 'update'"
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
import { useVuelidate } from "@vuelidate/core";
import { required, integer, maxValue, minValue } from "@vuelidate/validators";

const validationRules = {
    pulse: { required, integer, maxValue: maxValue(999), minValue: minValue(10) },
    pressure: {
        high: { required, integer, maxValue: maxValue(999), minValue: minValue(10) },
        lower: { required, integer, maxValue: maxValue(999), minValue: (10) }
    }
};

const { store, updateDateTime, createRecord, updateRecord, deleteRecord } = useDiary(),
    onUpdateDialog = (val: boolean) => { 
        v$.value.$reset();
        if(!val) store.skipDialog()
     },
    useLoader = ref(false),
    isOpenDate = ref(false),
    { dialog } = storeToRefs(store),
    title = computed(() => dialog.value.title),
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
    withRecord = async (handler: (r: DiaryRecord) => Promise<any>, validate: boolean = false) => {
        const record: DiaryRecord | undefined = dialog.value.record,
            valid = validate ? await v$.value.$validate() : true;
        if(record && valid) {
            useLoader.value = true;
            return handler(record).then(() => {
                store.skipDialog();
                isOpenDialog.value = false;
            }).catch(e => console.log(e))
            .finally(() => { useLoader.value = false });
        }
    },
    addRecord = () => withRecord((record) => createRecord(date.value, record), true),
    setRecord = () => withRecord((record) => updateRecord(date.value, record), true),
    removeRecord = () => withRecord((record) => deleteRecord(record)),
    v$ = useVuelidate(validationRules, dialog.value.record);
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
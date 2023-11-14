import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";
import type { Ref } from "vue";
import type { DiaryRecord } from "~/composable/diary";

interface Dialog {
    open?: boolean,
    title: string,
    date: Date | null,
    record?: DiaryRecord,
    type: 'create' | 'update'
}

interface StateData {
    list: null | Ref,
    dialog: Dialog
}

const getDefaultDialog = (): Dialog => ({
    open: false,
    title: '',
    date: null,
    type: 'create',
    record: {
        pulse: null,
        pressure: {
            lower: null,
            high: null
        }
    }
});

export default defineStore('diary', {
    state: (): StateData => ({ 
        list: null,
        dialog: getDefaultDialog()
    }),
    actions: {
        useDialog(data: Dialog) {
            this.setDialog(data);
            this.openDialog();
        },
        setDialog({ title, date, record, type }: Dialog) {
            this.dialog.title = title;
            this.dialog.date = date;
            this.dialog.type = type;
            if(record) this.dialog.record = record;
        },
        openDialog(state = true) {
            this.dialog.open = state;
        },
        skipDialog() { this.dialog = getDefaultDialog(); },
        loadRecords() {
            return new Promise(async (resolve, reject) => {
                const { data, error } = await useFetch('api/diary/records');
                if(data.value) {
                    this.list = data.value;
                    return resolve(data.value);
                }

                if(error.value) return reject(error.value);
            });
        }
    }
});
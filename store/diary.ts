import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";
import type { Ref } from "vue";
import type { DiaryRecord } from "~/assets/types/diary";

interface Dialog {
    open?: boolean,
    title: string,
    date: Date | null,
    record: null | DiaryRecord
}

interface StateData {
    list: null | Ref,
    dialog: Dialog
}

export default defineStore('diary', {
    state: (): StateData => ({ 
        list: null,
        dialog: {
            open: false,
            title: '',
            date: null,
            record: null
        }
     }),
    actions: {
        useDialog(data) {
            this.setDialog(data);
            this.openDialog();
        },
        setDialog({ title, date = null, record = null}) {
            this.dialog.title = title;
            this.dialog.date = date ? new Date(date) : new Date();
            this.dialog.record = record;
        },
        openDialog(state = true) {
            this.dialog.open = state;
        },
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
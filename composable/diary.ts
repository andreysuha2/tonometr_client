import type { EnumType } from "typescript";
import useDiaryStore from "~/store/diary";

export interface DiaryRecord {
    id?: number,
    pulse: number | null,
    timestamp?: string | Date,
    pressure: {
        high: number | null,
        lower: number | null
    }
}

export interface DiaryDayBlock {
    date: string,
    list: Array<DiaryRecord>
}

export interface DiaryRecordDialog {
    date?: string | null,
    record?: DiaryRecord,
    type?: 'create' | 'update'
}

export const useDiary = () => {
    const store = useDiaryStore(),
        useRecordDialog = ({ date = null, record = undefined, type = 'create' }: DiaryRecordDialog = {}) => {
            const now = new Date(),
                usedDate = date ? new Date(date) : now;
            if(date && type === 'create') {
                usedDate.setHours(now.getHours());
                usedDate.setMinutes(now.getMinutes());
            }
            store.useDialog({
                title: type === 'create' ? 'Додати запис' : 'Змінити запис',
                date: usedDate,
                record,
                type
            });
        },

        updateDateTime = (date: Date, time: string) => {
            const [ h, m ] = time.split(":");
            date.setHours(Number(h));
            date.setMinutes(Number(m));
            return date;
        },

        createRecord = (date: Date, record: DiaryRecord) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data, error } = await useFetch('/api/diary/record', {
                        method: "POST",
                        body: { timestamp: date.toISOString(), ...record }
                    });

                    console.log(data);

                    if(data.value) {
                        store.list.push(data.value);
                        return resolve(data.value);
                    }

                    if(error.value) reject(error.value);
                } catch (e) {
                    reject(e);
                }
            });
        },

        updateRecord = (date: Date, record: DiaryRecord) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data, error } = await useFetch(`/api/diary/record/${record.id}`, {
                        method: 'PUT',
                        body: { timestamp: date.toISOString(), ...record }
                    });

                    if(data.value) {
                        const recordIndex = store.list.findIndex(({ id }: DiaryRecord) => data.value.id === id);
                        store.list[recordIndex] = data.value;
                        return resolve(data.value);
                    }

                    if(error.value) reject(error.value);
                } catch (e) {
                    reject(e);
                }
            })
        },

        deleteRecord = (record: DiaryRecord) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data, error } = await useFetch(`/api/diary/record/${record.id}`, { method: 'DELETE' });

                    if(data.value) {
                        const recordIndex = store.list.findIndex(({ id }: DiaryRecord) => data.value.id === id);
                        store.list.splice(recordIndex, 1);
                        return resolve(data.value);
                    }

                    if(error.value) reject(error.value);
                } catch (e) {
                    reject(e);
                }
            })
        }


    return { store, useRecordDialog, updateDateTime, createRecord, updateRecord, deleteRecord };
}
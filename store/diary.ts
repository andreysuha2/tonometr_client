import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";
import type { Ref } from "vue";


interface StateData {
    list: null | Ref
}

export default defineStore('diary', {
    state: (): StateData => ({ list: null }),
    actions: {
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
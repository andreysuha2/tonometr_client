import { createRouter, defineEventHandler, useBase } from "h3";
import diaryHttp from "~/assets/js/http/Diary";

const router = createRouter();

router.get('/records', defineEventHandler(async () => {
    try {
        const response = await diaryHttp.getRecordsList();
        return response;
    } catch (e) {
        return { e };
    }
}));

export default useBase('/api/diary/', router.handler);
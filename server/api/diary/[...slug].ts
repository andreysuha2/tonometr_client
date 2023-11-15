import { createRouter, defineEventHandler, useBase } from "h3";
import { defaultResponseHandler } from "~/server/utils/responseHandler";
import diaryHttp from "~/assets/js/http/Diary";

const router = createRouter();

router.get('/records', defineEventHandler(defaultResponseHandler(async (event) => {
    const query = getQuery(event);
    return await diaryHttp.getRecordsList(query);
})));

router.post('/record', defineEventHandler(defaultResponseHandler(async (event) => {
    const body = await readBody(event);
    return await diaryHttp.record.create(body);
})));

router.get('/record/:id', defineEventHandler(defaultResponseHandler(async (event) => {
    const id = event.context.params?.id;
    return diaryHttp.record.get(id);
})));

router.put('/record/:id', defineEventHandler(defaultResponseHandler(async (event) => {
    const id = event.context.params?.id,
        body = await readBody(event);
    return await diaryHttp.record.update(id, body);
})));

router.delete('/record/:id', defineEventHandler(defaultResponseHandler(async (event) => {
    const id = event.context.params?.id;
    return await diaryHttp.record.delete(id);
})));

export default useBase('/api/diary/', router.handler);
import Http from "~/assets/js/http";

class DiaryHTTP extends Http {
    constructor() {
        super({ baseURL: 'http://127.0.0.1:8000/diary' });
    }

    public getRecordsList(data = {}) {
        return this.get('records', { data });
    }

    public get record() {
        return this.group('records', (query) => ({
            read: (id: string | number) => query.get(`${id}`),
            create: (data: { [key: string]: any }) => query.post('/', { data }),
            update: (id: string | number, data: { [key: string]: any }) => query.put(`${id}`, { data }),
            delete: (id: string | number) => query.delete(`${id}`)
        }));
    }
}

export default new DiaryHTTP();
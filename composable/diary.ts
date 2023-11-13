import useDiaryStore from "~/store/diary";

export const useDiary = () => {
    const store = useDiaryStore(),
        startRecordCreation = (date: string | null = null) => {
            const now = new Date(),
                usedDate = date ? new Date(date) : now;
            if(date) {
                usedDate.setHours(now.getHours());
                usedDate.setMinutes(now.getMinutes());
            }
            store.useDialog({
                title: "Додати запис",
                date: usedDate
            });
        };

    return { store, startRecordCreation }
}
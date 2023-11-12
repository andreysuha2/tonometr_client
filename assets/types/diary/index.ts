export interface DiaryRecord {
    id: number,
    pulse: number,
    timestamp: string | Date,
    pressure: {
        high: number,
        lower: number
    }
}

export interface DiaryDayBlock {
    date: string,
    list: Array<DiaryRecord>
}
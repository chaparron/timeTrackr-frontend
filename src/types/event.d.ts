interface HourEntry {
    start: string;
    end?: string;
}

interface DateEntry {
    day: string;
    hours: HourEntry[];
}

export interface EventResponse {
    id: number;
    title: string;
    userId: number;
    type: string;
    colleagues?: string[];
    dates?: DateEntry[];
    description?: string;
    totalHours: number;
}
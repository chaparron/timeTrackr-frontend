interface Duration {
    hours: number;
    minutes: number;
}

interface HourEntry {
    start: string;
    end: string;
    duration: Duration;
}

interface DateEntry {
    day: string;
    hours: HourEntry[];
    duration: Duration;
}

export interface EventResponse {
    id: number;
    title: string;
    userId: number;
    type: string;
    colleagues?: string[] | null;
    dates: DateEntry[];
    description?: string;
    totalHours: Duration;
}
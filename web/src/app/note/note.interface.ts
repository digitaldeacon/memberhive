export interface Note {
    type?: string; // required
    text?: string;
    author?: string;
    authored_date: number;
    authored_time: number;
}

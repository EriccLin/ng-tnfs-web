export interface ApiError {
    status: number;
    message: string;
    debugMessage?: string;
    path: string;
    method: string;
}
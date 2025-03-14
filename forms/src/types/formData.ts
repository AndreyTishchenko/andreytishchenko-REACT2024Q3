export interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    terms: boolean;
    picture: string | null; // stored as base64
    country: string;
    isNew?: boolean;
}
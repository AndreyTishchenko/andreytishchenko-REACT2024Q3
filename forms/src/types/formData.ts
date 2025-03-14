export interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    terms: boolean;
    picture: string | null;
    country: string;
    isNew?: boolean;
}
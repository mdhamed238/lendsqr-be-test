// create a new interface for user
export interface User {
    id?: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    balance: number; 
    phone: string;
    wallet_id: string;
    created_at?: string;
    updated_at?: string;
    user_id?: number;
}
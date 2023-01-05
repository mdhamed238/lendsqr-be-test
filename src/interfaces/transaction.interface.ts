export interface Transaction{
    id?: number;
    sender_id: number;
    receiver_id: number;
    amount: number;
    transaction_type: TransactionType;
    transaction_status: TransactionStatus;
    transaction_id: number;
    created_at?: string;
    updated_at?: string;
    balance_before: number;
    balance_after: number;
    description?: string;
    user_id?: number;

} 

enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}

enum TransactionStatus {
    SUCCESS = "success",
    FAILED = "failed"
}

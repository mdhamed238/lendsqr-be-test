import { Request, Response, NextFunction } from 'express';
import responseHelper from '../utils/api.reponse';
import query from '../db/queries';

// fund autheticated user wallet account with validation checks
export async function fundWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { amount } = req.body;

    // validate user input
    if (!(amount)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    // get user id from auth middleware
    const user_id = (req as any).token.id;

    if (!(amount)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    try {
        const user = await query.userById(user_id);

        let transaction_id = Math.floor(Math.random() * 1000000000);
        let lendsqr_transacton_fee = (amount * 0.01);
        let transaction_amount = amount - lendsqr_transacton_fee;

        // send commission to lendsqr company wallet
        // TODO: send commission to lendsqr company wallet

        if (user && user.length) {
            await query.updateUser(user_id, { balance: user[0].balance + transaction_amount });

            //create transaction
            let transaction = await query.transactions({
                transaction_id,
                transaction_type: "credit",
                transaction_status: "success",
                amount: transaction_amount,
                transaction_fee: lendsqr_transacton_fee,
                balance_before: user[0].balance,
                balance_after: user[0].balance + transaction_amount,
                user_id,
                sender_id: user[0].wallet_id,
                receiver_id: user[0].wallet_id,
                description: `Wallet funded with ${amount} from ${user[0].first_name} ${user[0].last_name}`
            });



            return responseHelper.success(res, `Wallet funded successfully`,200);
        }
    } catch (error) {
        next(error);
    }
}


// transfer funds from autheticated user wallet account to another user with validation checks
export async function transferFunds(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { amount, wallet_id } = req.body;

    // validate user input
    if (!(amount && wallet_id)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    // get user id from auth middleware
    const user_id = (req as any).token.id;

    try {
        const user = await query.userById(user_id);
        const receiver = await query.userByWalletId(wallet_id);
        if (user && user.length && receiver && receiver.length) {
            if (user[0].balance < amount) {
                return responseHelper.badRequest(res, `Insufficient funds in your wallet`);
            }
            let transaction_id = Math.floor(Math.random() * 1000000000);

            let lendsqr_transacton_fee = (amount * 0.01);
            let transaction_amount = amount - lendsqr_transacton_fee;

            await query.transactions({
                transaction_id,
                transaction_type: "debit",
                transaction_status: "success",
                amount: transaction_amount,
                transaction_fee: lendsqr_transacton_fee,
                balance_before: user[0].balance,
                balance_after: user[0].balance - transaction_amount,
                user_id,
                sender_id: user[0].wallet_id,
                receiver_id: receiver[0].wallet_id,
                description: `Transfer to ${receiver[0].first_name} ${receiver[0].last_name}`
            });

            await query.updateUser(user_id, { balance: user[0].balance - transaction_amount });
            await query.updateUser(receiver[0].id, { balance: receiver[0].balance + transaction_amount });

            return responseHelper.success(res, `Funds transferred successfully to ${receiver[0].first_name} ${receiver[0].last_name}`);
        }
    } catch (error) {
        next(error);
    }
}


// A user can withdraw funds from their account. The user can only withdraw funds that are available in their account.
export async function withdrawFunds(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { amount } = req.body;

    // validate user input
    if (!(amount)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    // get user id from auth middleware
    const user_id = (req as any).token.id;

    try {
        const user = await query.userById(user_id);
        if (user && user.length) {
            if (user[0].balance < amount) {
                return responseHelper.badRequest(res, 'Insufficient funds');
            }
            let transaction_id = Math.floor(Math.random() * 1000000000);

            let lendsqr_transacton_fee = (amount * 0.01);
            let transaction_amount = amount - lendsqr_transacton_fee;
            let transaction = await query.transactions({
                transaction_id,
                transaction_type: "debit",
                transaction_status: "success",
                amount: transaction_amount,
                transaction_fee: lendsqr_transacton_fee,
                balance_before: user[0].balance,
                balance_after: user[0].balance - transaction_amount,
                user_id,
                sender_id: user[0].wallet_id,
                receiver_id: user[0].wallet_id,
                description: `Withdrawal of ${amount} from ${user[0].first_name} ${user[0].last_name}`
            });

            await query.updateUser(user_id, { balance: user[0].balance - transaction_amount });
            return responseHelper.success(res, `Funds withdrawn successfully from your wallet`);
        }
    } catch (error) {
        next(error);
    }
}

// A user can view their account balance.
export async function viewBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    // get user id from auth middleware
    const user_id = (req as any).token.id;

    try {
        const user = await query.userById(user_id);
        if (user && user.length) {
            return responseHelper.success(res, `Your balance is ${user[0].balance}`);
        }
    } catch (error) {
        next(error);
    }
}

// A user can view their transaction history.
export async function viewTransactionHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    // get user id from auth middleware
    const user_id = (req as any).token.id;
    try {
        const user = await query.userById(user_id);
        if (user && user.length) {
            const transactions = await query.allTransactions(user_id);
            return responseHelper.success(res, transactions);
        } else {
            return responseHelper.badRequest(res, 'User not found');
        }
    } catch (error) {
        next(error);
    }
}

// The user can view the details of a specific transaction.
export async function viewTransactionDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { transaction_id } = req.params;

    // validate user input
    if (!(transaction_id)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    // get user id from auth middleware
    const user_id = (req as any).token.id;

    try {
        const user = await query.userById(user_id);
        if (user && user.length) {
            const transaction = await query.transactionById(JSON.parse(transaction_id));
            if (transaction && transaction.length) {
                return responseHelper.success(res, transaction);
            } else {
                return responseHelper.badRequest(res, 'Transaction not found');
            }
        } else {
            return responseHelper.badRequest(res, 'User not found');
        }
    } catch (error) {
        next(error);
    }
}

// get total amount of all transactions
export async function totalAmount(req: Request, res: Response, next: NextFunction): Promise<void> {
    // get user id from auth middleware
    const user_id = (req as any).token.id;

    try {
        const user = await query.userById(user_id);
        if (user && user.length) {
            const transactions = await query.allTransactions(user_id);
            let total = 0;
            transactions.forEach((transaction: any) => {
                total += transaction.amount;
            });
            return responseHelper.success(res, `Total amount of all transactions is ${total}`);
        } else {
            return responseHelper.badRequest(res, 'User not found');
        }
    } catch (error) {
        next(error);
    }
}



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
        let transaction_type = "credit";
        let transaction_status = "success";
        let lendsqr_transacton_fee = (amount * 0.01);
        let transaction_amount = amount - lendsqr_transacton_fee;
        let transaction = {
            transaction_id,
            transaction_type,
            transaction_status,
            transaction_amount,
            lendsqr_transacton_fee,
            user_id
        }
        if (user && user.length) {
            await query.updateUser(user_id, { balance: user[0].balance + transaction_amount });
            // format the response to remove commas and replace with spaces
            let resp = JSON.stringify(transaction).replace(/,/g, ' ');
            return responseHelper.success(res, `Wallet funded successfully ${resp}`);
        }
    } catch (error) {
        next(error);
    }
}


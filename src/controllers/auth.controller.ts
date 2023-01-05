//import query from '../db/query';
import { Request, Response, NextFunction } from 'express';
import query from '../db/queries';
import Password from '../utils/password.hash';
import jwt_token from '../utils/jwt';
import { User } from '../interfaces/user.interface';
import responseHelper from '../utils/api.reponse';
import WalletId from '../utils/generate_walletid';


// register a new user with validation checks
export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password, first_name, last_name, phone } = req.body;

    if (!(email && password && first_name && last_name && phone)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    // check if user already exist
    const userExist = await query.userByEmail(email);
    if (userExist.length > 0) {
        return responseHelper.badRequest(res, 'User already exist');
    }


    const hash = new Password(10);
    const hashedPassword = await hash.hash(password);

    const wallet = new WalletId();
    const new_wallet_id = wallet.generate();

    const user: User = {
        first_name,
        last_name,
        is_admin: false,
        balance: 0,
        wallet_id: new_wallet_id,
        phone,
        email,
        password: hashedPassword,
    };
    try {
        await query.addUser(user);
        return responseHelper.success(res, "User created successfully");
    } catch (error) {
        next(error);
    }
}

// login a user with validation checks
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    if (!(email && password)) {
        return responseHelper.badRequest(res, 'All input is required');
    }

    try {
        const user = await query.userByEmail(email);
        if (user && user.length) {
            const hash = new Password(10);
            const isMatch = await hash.compare(password, user[0].password);
            if (isMatch) {
                const token = jwt_token;

                let payload = {
                    id: user[0].id,
                    email: user[0].email,
                    is_admin: user[0].is_admin,
                }
                const accessToken = await token.generate(payload);
                return responseHelper.success(res, accessToken);
            }
            return responseHelper.badRequest(res, 'Invalid credentials');
        }
        return responseHelper.badRequest(res, 'Invalid credentials');
    } catch (error) {
        next(error);
    }

}


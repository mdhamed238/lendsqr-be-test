import { Response, Request, NextFunction } from "express";

import query from "../db/queries";
import jwt_token from "../utils/jwt";
import responseHelper from "../utils/api.reponse";

export interface CustomRequest extends Request {
    token: string | undefined;
}

let secret_key = process.env.JWT_SECRET || "secret;key"

// use oop to create a class for auth middleware
class Auth {
    // create a method for auth middleware
    async authMiddleware(req: Request, res: Response, next: NextFunction) {
        try {

            //get token from headers 
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return responseHelper.unauthorized(res, "Unauthorized");
            }
            // verify token
            const decoded = jwt_token.verify(token);

            // get user from db
            const user = await query.userById(decoded.id);

            // check if user exist
            if (!user || !user.length) {
                return responseHelper.notFound(res, "User not found");
            }

            // add user to request
            console.log("====================================");
            (req as CustomRequest).token = decoded;
            console.log((req as CustomRequest).token);
            console.log("====================================");

            next();
        } catch (error) {
            return responseHelper.unauthorized(res, "Unauthorized");
        }
    }
}

export default new Auth();
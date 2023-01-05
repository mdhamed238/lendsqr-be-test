import * as jwt from 'jsonwebtoken';

class Token {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public generate(payload: any): string {
        const token = jwt.sign(payload, this.secret);
        return token;
    }

    public verify(token: string): any {
        const payload = jwt.verify(token, this.secret);
        return payload;
    }
}

let secret_key = process.env.JWT_SECRET || "secret;key"
let jwt_token = new Token(secret_key);
export default jwt_token;




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

    public getFromHeaders(headers: any): string | null {
        const authorization = headers.authorization;
        if (!authorization) {
            return null;
        }
        const [, token] = authorization.split(' ');
        return token;
    }
}

export default Token;

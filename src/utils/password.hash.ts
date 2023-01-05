import * as bcrypt from 'bcryptjs';

class Password {
    private saltRounds: number;

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    public async hash(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}

export default Password;

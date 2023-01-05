import knex from './knex'; // The connection

// export object with all queries using oop
class Query{
    private knex: any;

    constructor(knex: any) {
        this.knex = knex;
    }

    // get all users
    public async allUsers(): Promise<any[]> {
        return await this.knex('users');
    }

    // get user by id
    public async userById(id: number): Promise<any> {
        return await this.knex('users').where('id', id);
    }

    // get user by email
    public async userByEmail(email: string): Promise<any> {
        return await this.knex('users').where('email', email);
    }

    // add new user
    public async addUser(user: any):
    Promise<any> {
        return await this.knex('users').insert(user);
    }

    // update user
    public async updateUser(id: number, user: any):
    Promise<any> {
        return await this.knex('users').where('id', id).update(user);
    }

    // delete user
    public async deleteUser(id: number):
        Promise<any> {
        return await this.knex('users').where('id', id).del();
        
    }

    // userByWalletId
    public async userByWalletId(wallet_id: string): Promise<any> {
        return await this.knex('users').where('wallet_id', wallet_id);
    }

    //create transaction
    public async transactions(transaction: any):
        Promise<any> {
        return await this.knex('transactions').insert(transaction);
    }

    // get all transactions transactionsByUserId
    public async allTransactions(user_id: number): Promise<any[]> {
        return await this.knex('transactions');
    }

    // get transaction by id
    public async transactionById(transaction_id: number): Promise<any> {
        return await this.knex('transactions').where('id', transaction_id);
    }
}

let query = new Query(knex);
export default query;
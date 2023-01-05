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
}

let query = new Query(knex);
export default query;
import db, { withCreatedAt } from '../database/database';
import * as interfaces from '../interfaces/interfaces';

export async function findUserByEmail(email: string){
    const user = await db.orm.public.users.where({ email }).first();
    return user ? withCreatedAt(user) : null;
}

export async function insertUser(userData: interfaces.userData) {
    return withCreatedAt(await db.orm.public.users.create(userData));
}

export async function findUserById(id: number) {
    const user = await db.orm.public.users.where({ id }).first();
    return user ? withCreatedAt(user) : null;
}

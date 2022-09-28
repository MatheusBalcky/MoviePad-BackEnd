import prisma from  '../database/database'
import * as interfaces from '../interfaces/interfaces';

export async function findUserByEmail(email: string){
    return await prisma.users.findUnique({where: {email}});
}

export async function insertUser(userData: interfaces.userData) {
    return await prisma.users.create({data: userData});
}
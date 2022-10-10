import supertest from 'supertest';
import index from '../../src/index';
import prisma from '../../src/database/database';
import * as authFactories from '../factories/authFactories'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE users CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

const request = supertest(index);

describe('ROUTES OF AUTHENTICATIONS', () => {
  test('Test /signup with validate data', async () => {
    const signUpData = authFactories.generateSignUpData();
    
    const promise = await request.post('/signup').send(signUpData);

    expect(promise.status).toBe(201);
  });
});
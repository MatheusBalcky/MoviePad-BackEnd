import supertest from 'supertest';
import index from '../../src/index';
import db, { pool } from '../../src/database/database';
import * as authFactories from '../factories/authFactories'
import { randomBytes } from 'node:crypto';

beforeEach(async () => {
  process.env.JWT_SECRET ??= randomBytes(32).toString('hex');
  await pool.query('TRUNCATE users, "moviesTvshows" CASCADE');
});

afterAll(async () => {
  await db.close();
  if (!pool.ended) await pool.end();
});

const request = supertest(index);

describe('ROUTES OF AUTHENTICATIONS', () => {
  test('Test /signup with validate data', async () => {
    const signUpData = authFactories.generateSignUpData();
    
    const promise = await request.post('/signup').send(signUpData);

    expect(promise.status).toBe(201);
  });

  test('Preserves authentication errors and UTC timestamps with ORM 8', async () => {
    const data = authFactories.generateSignUpData();
    expect((await request.get('/lists')).status).toBe(401);
    expect((await request.post('/signup').send(data)).status).toBe(201);
    expect((await request.post('/signup').send(data)).status).toBe(409);
    expect((await request.post('/signin').send({ email: data.email, password: 'wrong-password' })).status).toBe(401);
    const login = await request.post('/signin').send({ email: data.email, password: data.password });
    expect(login.status).toBe(200);
    expect(login.body.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T.*\.\d{3}Z$/);
    const verified = await request.post('/verifyToken').set('Authorization', `Bearer ${login.body.token}`);
    expect(verified.status).toBe(200);
    expect(verified.body.email).toBe(data.email.toLowerCase());
    expect(verified.body.createdAt).toBe(login.body.createdAt);
  });

  test('Preserves list/content CRUD, counts and unique-constraint responses with ORM 8', async () => {
    const user = authFactories.generateSignUpData();
    await request.post('/signup').send(user).expect(201);
    const login = await request.post('/signin').send({ email: user.email, password: user.password }).expect(200);
    const authorization = `Bearer ${login.body.token}`;
    await request.post('/lists/create').set('Authorization', authorization)
      .send({ title: 'Migration validation', iconList: '🍉' }).expect(201);
    const initial = await request.get('/lists').set('Authorization', authorization).expect(200);
    expect(initial.body).toHaveLength(1);
    expect(initial.body[0].amount).toBe(0);
    expect(initial.body[0].createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T.*\.\d{3}Z$/);
    const listId = initial.body[0].id;
    const empty = await request.get(`/lists/${listId}`).set('Authorization', authorization).expect(200);
    expect(empty.body.contents).toEqual([]);
    const content = {
      contentId: 123456, title: 'Migration movie', pictureUrl: 'https://example.com/movie.jpg',
      description: 'ORM 8 regression fixture', releaseYear: '2024-01-01',
      trailerUrl: 'https://example.com/trailer', rating: 8.1
    };
    await request.post(`/lists/${listId}/addcontent`).set('Authorization', authorization).send(content).expect(201);
    const lists = await request.get('/lists').set('Authorization', authorization).expect(200);
    expect(lists.body[0].amount).toBe(1);
    const detail = await request.get(`/lists/${listId}`).set('Authorization', authorization).expect(200);
    expect(detail.body.contents).toHaveLength(1);
    expect(detail.body.contents[0].contentIdApi).toBe(content.contentId);
    const contentId = detail.body.contents[0].contentIdAtContents;
    const found = await request.get(`/contentFromAList/${listId}/content/${contentId}`)
      .set('Authorization', authorization).expect(200);
    expect(found.body.title).toBe(content.title);
    await request.post(`/lists/${listId}/addcontent`).set('Authorization', authorization).send(content).expect(409);
    const removed = await request.delete(`/contentFromAList/${listId}/delete/${contentId}`)
      .set('Authorization', authorization).expect(200);
    expect(removed.body).toEqual({ count: 1 });
    await request.post(`/lists/${listId}/addcontent`).set('Authorization', authorization).send(content).expect(201);
    const deleted = await request.delete(`/lists/${listId}/remove`).set('Authorization', authorization).expect(200);
    expect(deleted.body[0].id).toBe(listId);
    expect(deleted.body[1]).toEqual({ count: 1 });
    expect((await request.get('/lists').set('Authorization', authorization).expect(200)).body).toEqual([]);
  });
});

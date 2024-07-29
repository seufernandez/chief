import { expect, beforeAll, describe, afterAll, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe("Users Routes", () => {
  beforeAll(async ()=> {
    await app.ready()
  })
  
  afterAll(async ()=> {
    await app.ready()
  })

  it('should list users', async () => {
    const response = await request(app.server).get('/users').expect(200);

    const expectedUsers = [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@chief.com",
        "role": "CEO"
      },
      {
        "id": 2,
        "first_name": "Ethan",
        "last_name": "Turner",
        "email": "ethan.turner@chief.com",
        "role": "CFO"
      },
      {
        "id": 3,
        "first_name": "Olivia",
        "last_name": "Martinez",
        "email": "olivia.m@chief.com",
        "role": "CTO"
      },
      {
        "id": 4,
        "first_name": "Mary",
        "last_name": "Jane",
        "email": "mary.jane@chief.com",
        "role": "Tech Lead"
      }
    ];

    expect(response.body.users).toEqual(expectedUsers);
  });

  it('should create a new user', async () => {
    const response = await request(app.server).post('/users').send({
      first_name: "Bruce",
      last_name: "Wayne",
      email: "bw@chief.com",
      role: "Vigilant"
    }).expect(201);

    expect(typeof response.body.id).toBe('number');
  });

  it('should update user data', async () => {
    await request(app.server).put('/users/1').send({
      first_name: "Johnny",
      last_name: "Doe",
      email: "john.doe@chief.com",
      role: "CEO"
    }).expect(204);

  });

  it('should delete a user', async () => {
    await request(app.server).delete('/users/1').expect(202);

    const response = await request(app.server).get('/users').expect(200);

    const expectedUsers = [
      {
        "id": 2,
        "first_name": "Ethan",
        "last_name": "Turner",
        "email": "ethan.turner@chief.com",
        "role": "CFO"
      },
      {
        "id": 3,
        "first_name": "Olivia",
        "last_name": "Martinez",
        "email": "olivia.m@chief.com",
        "role": "CTO"
      },
      {
        "id": 4,
        "first_name": "Mary",
        "last_name": "Jane",
        "email": "mary.jane@chief.com",
        "role": "Tech Lead"
      },
      {
        "id": 5,
        "first_name": "Bruce",
        "last_name": "Wayne",
        "email": "bw@chief.com",
        "role": "Vigilant"
      }
    ];
    expect(response.body.users).toEqual(expectedUsers);
  });
});

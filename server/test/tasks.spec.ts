import { expect, beforeAll, describe, afterAll, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe("Tasks Routes", () => {
  beforeAll(async ()=> {
    await app.ready()
  })
  
  afterAll(async ()=> {
    await app.ready()
  })

  it('should list user tasks', async () => {
    const response = await request(app.server).get('/users/1/tasks').expect(200);

    const expectedTasks = [
      {
        "id": 1,
        "user_id": 1,
        "description": "Prepare quarterly financial report",
        "is_done": 0
      },
      {
        "id": 4,
        "user_id": 1,
        "description": "Organize team building activity",
        "is_done": 1
      }
    ];

    expect(response.body.tasks).toEqual(expectedTasks);
  });

  it('should create a new task', async () => {
    const response = await request(app.server).post('/tasks').send({
      user_id: 1,
      description: "Brand new task",
    }).expect(201);

    expect(typeof response.body.id).toBe('number');
  });

  it('should update task', async () => {
    await request(app.server).put('/tasks/1').send({
      "user_id": 1,
      "description": "Review company policies",
      "is_done": 1
    }).expect(204);
  });

  it('should delete a task', async () => {
    await request(app.server).delete('/tasks/1').expect(202);

    const response = await request(app.server).get('/users/1/tasks').expect(200);

    const expectedTasks = [
      {
        "id": 4,
        "user_id": 1,
        "description": "Organize team building activity",
        "is_done": 1
      },
      {
       "description": "Brand new task",
       "id": 5,
       "is_done": 0,
       "user_id": 1,
      }
    ];

    expect(response.body.tasks).toEqual(expectedTasks);
  });
});

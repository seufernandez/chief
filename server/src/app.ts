import usersRouter from "./routers/usersRouter";
import tasksRouter from "./routers/tasksRouter";
import fastify from "fastify";
import cors from '@fastify/cors'

export const app = fastify();
app.register(cors)


app.register(usersRouter, { prefix: '/users' });
app.register(tasksRouter, { prefix: '/tasks' });


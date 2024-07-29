import { FastifyInstance } from 'fastify';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";
import { getUserTasks } from "../controllers/tasksController";

async function usersRouter(app: FastifyInstance) {
  app.get("/", getUsers);

  app.get("/:id", getUser);
  app.post("/",  createUser);
  app.put("/:id", updateUser);
  app.delete("/:id", deleteUser);

  app.get("/:userId/tasks", getUserTasks);
}

export default usersRouter;

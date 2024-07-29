import { FastifyInstance } from 'fastify';
import { validateData } from "../middleware/validationMiddleware";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/tasksController";


async function tasksRouter(app: FastifyInstance) {
  app.get("/:id", getTask);
  app.post("", createTask);
  app.put("/:id", updateTask);
  app.delete("/:id", deleteTask);
}

export default tasksRouter;

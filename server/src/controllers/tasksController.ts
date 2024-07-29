import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";
import { createTaskFieldsSchema, updateTaskFieldsSchema } from "../schemas/tasksSchema";

export const getUserTasks = (req: FastifyRequest, res: FastifyReply) => {
  const { userId } :any = req.params;

  try {
    const tasks = db
      .prepare("SELECT * FROM tasks WHERE user_id = ?")
      .all(userId);

    res.send({
      tasks: tasks,
    });
  } catch (error) {
    res.status(404).send({ message: "No tasks found for the given user_id" });
  }
};

export const getTask = (req: FastifyRequest, res: FastifyReply) => {
  const { id }: any= req.params;

  try {
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

    res.send({
      task,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to get task" });
  }
};

export const createTask = (req: FastifyRequest, res: FastifyReply) => {
  const { user_id, description } = createTaskFieldsSchema.parse(req.body);

  try {
    const task = db
      .prepare(
        "INSERT INTO tasks (user_id, description, is_done) VALUES (@user_id, @description, 0)",
      )
      .run({
        user_id,
        description,
      });

    res.status(201).send({
      id: task.lastInsertRowid,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to create task" });
  }
};

export const updateTask = (req: FastifyRequest<{ Params: {id:string} }>, res: FastifyReply) => {
  const { id } = req.params;
  const { user_id, description, is_done } = updateTaskFieldsSchema.parse(req.body);

  try {
    const result = db
      .prepare(
        `
      UPDATE tasks
      SET user_id = @user_id,
           description = @description,
           is_done = @is_done
      WHERE id = @id`,
      )
      .run({
        id,
        user_id,
        description,
        is_done,
      });

    res.status(204).send({ success: true, result });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = (req: FastifyRequest<{ Params: {id:string} }>, res: FastifyReply) => {
  const { id } = req.params;

  try {
    const results = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

    res.status(202).send({
      results,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to delete" });
  }
};

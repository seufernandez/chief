import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";
import { createUserFieldsSchema, updateUserFieldsSchema } from "../schemas/usersSchemas";

export const getUsers = (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();

    res.send({
      users: users,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to get users" });
  }
};

export const getUser = (req: FastifyRequest<{ Params: {id:string} }>, res: FastifyReply) => {
  const { id }= req.params;

  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    res.send({
      user,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to get user" });
  }
};

export const createUser = (req: FastifyRequest, res: FastifyReply) => {
  const { first_name, last_name, email, role } = createUserFieldsSchema.parse(req.body);

  try {
    const user = db
      .prepare(
        "INSERT INTO users (first_name, last_name, email, role) VALUES (@first_name, @last_name, @email, @role)",
      )
      .run({
        first_name,
        last_name,
        email,
        role,
      });

    res.status(201).send({
      id: user.lastInsertRowid,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to create user" });
  }
};

export const updateUser = (req: FastifyRequest<{ Params: {id:string} }>, res: FastifyReply) => {
  const { id } = req.params;
  const { first_name, last_name, email, role } = updateUserFieldsSchema.parse(req.body);

  try {
    const result = db
      .prepare(
        `
        UPDATE users
        SET first_name = @first_name,
             last_name = @last_name,
             email = @email,
             role = @role
        WHERE id = @id`,
      )
      .run({
        id,
        first_name,
        last_name,
        email,
        role,
      });

    return res.status(204).send({
      id: result,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to update user" });
  }
};

export const deleteUser = (req: FastifyRequest<{ Params: {id:string} }>, res: FastifyReply) => {
  const { id } = req.params;

  try {
    const results = db.prepare("DELETE FROM users WHERE id = ?").run(id);

    res.status(202).send({
      results,
    });
  } catch (error) {
    return res.status(500).send({ message: "Failed to delete" });
  }
};

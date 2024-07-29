import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any>) {
  return async (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    try {
      schema.parse(request.body);
      done();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        reply.status(StatusCodes.BAD_REQUEST).send({ error: "Invalid data", details: errorMessages });
      } else {
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error" });
      }
    }
  };
}

import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const openAPIGlueOptions = {
    prefix
  };

  const swaggerOptions = {
    exposeRoute: true
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

  // fastify.get(prefix, general);
  // fastify.post(`${prefix}/todo`, createTodo);
  // fastify.get(`${prefix}/todo`, getManyTodo);
  // fastify.get(`${prefix}/todo/:todoId`, getTodo);
  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);
  // fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}

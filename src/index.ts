// CommonJs
const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", function (request: any, reply: any) {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen({ port: 3002 }, function (err: any, address: any) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

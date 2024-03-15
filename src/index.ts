import Fast from "fastify";
import FastifyCors from "@fastify/cors";
import JWT from "@fastify/jwt";
import CONFIG from "./config";
import Services from "./services";
import Handler from "./handler";
import Plugins from "./plugins";
import Adapters from "./adapters";

export const Fastify = Fast({ logger: CONFIG.APP.LOGGER });

Adapters.Mongo.Connect({
  dbName: "ultralane",
});

Fastify.register(JWT, {
  secret: CONFIG.APP.SECRET,
});

Fastify.register(FastifyCors, CONFIG.CORS.OPTIONS);

Fastify.setErrorHandler(Handler.Boom.ErrorHandler);
Fastify.setValidatorCompiler(Plugins.Zod.ValidatorCompiler);
Fastify.setSerializerCompiler(Plugins.Zod.SerializerCompiler);

Fastify.after(() => {
  Services.Register(Fastify);
});

const start = async () => {
  await Fastify.listen({ port: CONFIG.APP.PORT, host: CONFIG.GET.HOST_API() });
  await Fastify.ready();
};

start().catch((err) => {
  Fastify.log.error(err);
  process.exit(1);
});

export default Fastify;

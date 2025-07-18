import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import { Context } from "./context";

async function startServer() {
  // Read schema file
  const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

  // Create Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      // Add your context here
    }),
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer().catch(console.error);

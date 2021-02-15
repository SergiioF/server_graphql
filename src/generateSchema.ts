import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

import { UserResolver } from "./graphql/resolvers/UserResolvers";
import { AppointmentResolver } from "./graphql/resolvers/AppointmentResolver";

export async function generateSchema(): Promise<GraphQLSchema> {
  try {
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        AppointmentResolver
      ],
      validate: false,
      
    });

    return schema;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
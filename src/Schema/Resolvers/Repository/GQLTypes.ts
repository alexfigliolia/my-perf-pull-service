import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { PlatformType } from "Schema/Resolvers/Platform/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { MPRepository } from "./types";

export const RepositoryType = new GraphQLObjectType<MPRepository, Context>({
  name: "Repository",
  fields: {
    name: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    api_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    html_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    clone_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    created_at: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    updated_at: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    platform: {
      type: SchemaBuilder.nonNull(PlatformType),
    },
    platform_id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    language: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
});

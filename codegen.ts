import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  verbose: true,
  generates: {
    "./src/GQL/JobService/Types/": {
      documents: ["src/GQL/JobService/Queries/*.gql.ts"],
      schema: "./src/GQL/JobService/Types/graphql-schema.graphql",
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

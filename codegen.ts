import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/typeDefs/**/*.ts",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars: {
          Date: "Date",
          DateTime: "Date",
          JSON: "Record<string, any>",
        }
      }
    },
  },
};

export default config;

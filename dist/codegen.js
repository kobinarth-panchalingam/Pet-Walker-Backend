const config = {
    overwrite: true,
    schema: "./src/typeDefs/graphql/**/*.ts",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};
export default config;

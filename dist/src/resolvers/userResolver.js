export const userResolvers = {
    User: {
        pets: (parent, _, ctx) => ctx.prisma.user.findUnique({ where: { id: parent.id }, select: { Pets: true } }).Pets(),
    },
    Query: {
        getUsers: (_, __, ctx) => ctx.prisma.user.findMany(),
    },
};

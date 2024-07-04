export const petResolvers = {
  Pet: {
    owner: ( parent, _, ctx ) => ctx.prisma.pet.findUnique( { where: { id: parent.id } } ).owner()
  },
  Query: {
    getPets: ( _, __, ctx ) => ctx.prisma.pet.findMany()
  },
  Mutation: {
    addPet: ( _, args, ctx ) => ctx.prisma.pet.create( { data: args.input } )
  }
};

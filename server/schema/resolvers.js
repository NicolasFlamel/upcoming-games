const resolvers = {
  Query: {
    me: async (parent, params, context) => {
      return null;
    },
    api: async (parent, params, context) => {
      return { id: 35004, name: 'Demon Horde Master' };
    },
  },
  Mutation: {
    temp: async (parent, params, context) => {
      return null;
    },
  },
};

module.exports = resolvers;

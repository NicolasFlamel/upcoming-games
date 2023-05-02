const resolvers = {
    Query: {
        me: async (parent, params, context) => {
            return null
        }
    },
    Mutation: {
        temp: async (parent, params, context) => {
            return null
        } 
    },
}

module.exports = resolvers
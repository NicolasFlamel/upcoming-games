const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }

  type Game {
    id: Int
    name: String
  }

  type Query {
    me: User
    api: Game
  }
  type Mutation {
    temp: User
  }
`;

module.exports = typeDefs;

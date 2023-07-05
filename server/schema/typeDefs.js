const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }

  type Game {
    gameData: [GameData]
    coverData: [CoverData]
  }

  type GameData {
    id: Int
    name: String
    cover: Int
    platforms: [Int]
    release_dates: [Int]
    summary: String
  }

  type CoverData {
    id: Int
    game: Int
    url: String
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

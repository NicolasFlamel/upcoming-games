const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }

  type UpcomingData {
    id: ID
    date: Int
    region: Int
    game: GameData
  }

  type GameData {
    id: Int
    name: String
    cover: CoverData
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
    upcoming(date: Int): [UpcomingData]
    game(gameID: ID): GameData
  }
  type Mutation {
    temp: User
  }
`;

module.exports = typeDefs;

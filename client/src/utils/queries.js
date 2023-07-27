import { gql } from '@apollo/client';

export const QUERY_UPCOMING = gql`
  query getUpcoming($date: Int) {
    upcoming(date: $date) {
      id
      date
      region
      game {
        id
        name
        platforms
        release_dates
        summary
        cover {
          id
          game
          url
        }
      }
    }
  }
`;

// export const QUERY_GAMES = gql`
//   query getGames($upcomingData: [ID]) {
//     games(upcomingData: $upcomingData) {
//       id
//       name
//       cover
//       platforms
//       release_dates
//       summary
//     }
//   }
// `;

// export const QUERY_COVERS = gql`
//   query getCovers($gameData: [ID]) {
//     covers(gameData: $gameData) {
//       id
//       game
//       url
//     }
//   }
// `;

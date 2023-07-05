import { gql } from '@apollo/client';

export const QUERY_API = gql`
  query getAPI {
    api {
      gameData {
        id
        name
        cover
        platforms
        release_dates
        summary
      }
      coverData {
        id
        game
        url
      }
    }
  }
`;

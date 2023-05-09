import { gql } from '@apollo/client';

export const QUERY_API = gql`
  query getAPI {
    api {
      id
      name
    }
  }
`;

import { gql } from "graphql-request";

export const setOrganizationRepositories = gql`
  mutation setOrganizationRepositories($repositories: [InputRepository!]!) {
    setOrganizationRepositories(repositories: $repositories)
  }
`;
